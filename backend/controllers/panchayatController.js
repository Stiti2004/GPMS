const db = require('../db');
const bcrypt = require('bcrypt');

// Hash password before storing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Get panchayat member homepage controller
exports.getHomePage = async (req, res) => {
  try {
    const memberId = req.user.id;
    const memberData = await db.query(
      'SELECT first_name, last_name, role FROM panchayat_committee_members WHERE member_id = $1',
      [memberId]
    );
    
    if (memberData.rows.length === 0) {
      return res.status(404).json({ message: 'Panchayat member not found' });
    }
    
    const member = memberData.rows[0];
    
    res.status(200).json({
      message: `Welcome ${member.first_name} ${member.last_name}, ${member.role} to the Gram Panchayat Management System`,
      services: [
        { name: 'My Profile', url: '/panchayat/profile' },
        { name: 'Manage Citizens', url: '/panchayat/citizens' },
        { name: 'Manage Households', url: '/panchayat/households' },
        { name: 'Manage Land Records', url: '/panchayat/land-records' },
        { name: 'Manage Certificates', url: '/panchayat/certificates' },
        { name: 'Manage Taxes', url: '/panchayat/taxes' },
        { name: 'Manage Welfare Schemes', url: '/panchayat/schemes' }
      ]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get panchayat member profile controller
exports.getProfile = async (req, res) => {
  try {
    const memberId = req.user.id;
    const memberData = await db.query(
      `SELECT pcm.*, c.name as citizen_name 
      FROM panchayat_committee_members pcm
      LEFT JOIN citizens c ON pcm.citizen_id = c.citizen_id
      WHERE pcm.member_id = $1`,
      [memberId]
    );
    
    if (memberData.rows.length === 0) {
      return res.status(404).json({ message: 'Panchayat member not found' });
    }
    
    // Remove password for security
    const member = memberData.rows[0];
    delete member.password;
    
    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all citizens controller
exports.getAllCitizens = async (req, res) => {
  try {
    const citizens = await db.query(
      `SELECT c.citizen_id, c.name, c.gender, c.dob, c.educational_qualification, 
      h.address, h.income 
      FROM citizens c
      LEFT JOIN households h ON c.household_id = h.household_id
      ORDER BY c.name`
    );
    
    res.status(200).json(citizens.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get citizen by ID controller
exports.getCitizenById = async (req, res) => {
  try {
    const { id } = req.params;
    const citizenData = await db.query(
      `SELECT c.*, h.address, h.income 
      FROM citizens c
      LEFT JOIN households h ON c.household_id = h.household_id
      WHERE c.citizen_id = $1`,
      [id]
    );
    
    if (citizenData.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    // Remove password for security
    const citizen = citizenData.rows[0];
    delete citizen.password;
    
    res.status(200).json(citizen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add citizen controller
exports.addCitizen = async (req, res) => {
  try {
    const { 
      name, gender, dob, household_id, educational_qualification, 
      username, password, role = 'citizen'
    } = req.body;
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Check if username already exists
    const userCheck = await db.query(
      'SELECT * FROM citizens WHERE username = $1',
      [username]
    );
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Insert new citizen
    const result = await db.query(
      `INSERT INTO citizens 
       (name, gender, dob, household_id, educational_qualification, username, password, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING citizen_id, name`,
      [name, gender, dob, household_id, educational_qualification, username, hashedPassword, role]
    );
    
    res.status(201).json({
      message: 'Citizen added successfully',
      citizen: result.rows[0]
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update citizen controller
exports.updateCitizen = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, gender, dob, household_id, educational_qualification
    } = req.body;
    
    // Check if citizen exists
    const citizenCheck = await db.query(
      'SELECT * FROM citizens WHERE citizen_id = $1',
      [id]
    );
    
    if (citizenCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    // Update citizen
    await db.query(
      `UPDATE citizens 
       SET name = $1, gender = $2, dob = $3, household_id = $4, educational_qualification = $5
       WHERE citizen_id = $6`,
      [name, gender, dob, household_id, educational_qualification, id]
    );
    
    res.status(200).json({ message: 'Citizen updated successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all households controller
exports.getAllHouseholds = async (req, res) => {
  try {
    const households = await db.query('SELECT * FROM households ORDER BY household_id');
    res.status(200).json(households.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add household controller
exports.addHousehold = async (req, res) => {
  try {
    const { household_id, address, income } = req.body;
    
    // Check if household ID already exists
    const householdCheck = await db.query(
      'SELECT * FROM households WHERE household_id = $1',
      [household_id]
    );
    
    if (householdCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Household ID already exists' });
    }
    
    // Insert new household
    await db.query(
      'INSERT INTO households (household_id, address, income) VALUES ($1, $2, $3)',
      [household_id, address, income]
    );
    
    res.status(201).json({ message: 'Household added successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update household controller
exports.updateHousehold = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, income } = req.body;
    
    // Check if household exists
    const householdCheck = await db.query(
      'SELECT * FROM households WHERE household_id = $1',
      [id]
    );
    
    if (householdCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Household not found' });
    }
    
    // Update household
    await db.query(
      'UPDATE households SET address = $1, income = $2 WHERE household_id = $3',
      [address, income, id]
    );
    
    res.status(200).json({ message: 'Household updated successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all land records controller
exports.getAllLandRecords = async (req, res) => {
  try {
    const landRecords = await db.query(
      `SELECT lr.*, c.name as owner_name 
      FROM land_records lr
      JOIN citizens c ON lr.citizen_id = c.citizen_id
      ORDER BY lr.land_id`
    );
    
    res.status(200).json(landRecords.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add land record controller
exports.addLandRecord = async (req, res) => {
  try {
    const { land_id, citizen_id, area_acres, crop_type } = req.body;
    
    // Check if land ID already exists
    const landCheck = await db.query(
      'SELECT * FROM land_records WHERE land_id = $1',
      [land_id]
    );
    
    if (landCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Land ID already exists' });
    }
    
    // Check if citizen exists
    const citizenCheck = await db.query(
      'SELECT * FROM citizens WHERE citizen_id = $1',
      [citizen_id]
    );
    
    if (citizenCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    // Insert new land record
    await db.query(
      'INSERT INTO land_records (land_id, citizen_id, area_acres, crop_type) VALUES ($1, $2, $3, $4)',
      [land_id, citizen_id, area_acres, crop_type]
    );
    
    res.status(201).json({ message: 'Land record added successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update land record controller
exports.updateLandRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { citizen_id, area_acres, crop_type } = req.body;
    
    // Check if land record exists
    const landCheck = await db.query(
      'SELECT * FROM land_records WHERE land_id = $1',
      [id]
    );
    
    if (landCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Land record not found' });
    }
    
    // Check if citizen exists
    const citizenCheck = await db.query(
      'SELECT * FROM citizens WHERE citizen_id = $1',
      [citizen_id]
    );
    
    if (citizenCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    // Update land record
    await db.query(
      'UPDATE land_records SET citizen_id = $1, area_acres = $2, crop_type = $3 WHERE land_id = $4',
      [citizen_id, area_acres, crop_type, id]
    );
    
    res.status(200).json({ message: 'Land record updated successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all certificates controller
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await db.query(
      `SELECT c.*, cit.name as citizen_name 
      FROM certificates c
      JOIN citizens cit ON c.citizen_id = cit.citizen_id
      ORDER BY c.issue_date DESC`
    );
    
    res.status(200).json(certificates.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve certificate controller
exports.approveCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if certificate exists
    const certCheck = await db.query(
      'SELECT * FROM certificates WHERE certificate_id = $1',
      [id]
    );
    
    if (certCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Update certificate status (assuming there's a status field)
    await db.query(
      'UPDATE certificates SET status = $1 WHERE certificate_id = $2',
      ['approved', id]
    );
    
    res.status(200).json({ message: 'Certificate approved successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject certificate controller
exports.rejectCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    // Check if certificate exists
    const certCheck = await db.query(
      'SELECT * FROM certificates WHERE certificate_id = $1',
      [id]
    );
    
    if (certCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Update certificate status (assuming there's a status and rejection_reason field)
    await db.query(
      'UPDATE certificates SET status = $1, rejection_reason = $2 WHERE certificate_id = $3',
      ['rejected', reason, id]
    );
    
    res.status(200).json({ message: 'Certificate rejected successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all taxes controller
exports.getAllTaxes = async (req, res) => {
  try {
    const taxes = await db.query(
      `SELECT ct.*, c.name as citizen_name 
      FROM citizen_taxes ct
      JOIN citizens c ON ct.citizen_id = c.citizen_id
      ORDER BY ct.collection_date DESC`
    );
    
    res.status(200).json(taxes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add tax controller
exports.addTax = async (req, res) => {
  try {
    const { citizen_id, tax_type, tax_amount, collection_date } = req.body;
    
    // Check if citizen exists
    const citizenCheck = await db.query(
      'SELECT * FROM citizens WHERE citizen_id = $1',
      [citizen_id]
    );
    
    if (citizenCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    // Insert new tax
    await db.query(
      'INSERT INTO citizen_taxes (citizen_id, tax_type, tax_amount, collection_date) VALUES ($1, $2, $3, $4)',
      [citizen_id, tax_type, tax_amount, collection_date]
    );
    
    res.status(201).json({ message: 'Tax added successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update tax controller
exports.updateTax = async (req, res) => {
  try {
    const { id } = req.params;
    const { tax_type, tax_amount, collection_date } = req.body;
    
    // Check if tax exists
    const taxCheck = await db.query(
      'SELECT * FROM citizen_taxes WHERE tax_id = $1',
      [id]
    );
    
    if (taxCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Tax not found' });
    }
    
    // Update tax
    await db.query(
      'UPDATE citizen_taxes SET tax_type = $1, tax_amount = $2, collection_date = $3 WHERE tax_id = $4',
      [tax_type, tax_amount, collection_date, id]
    );
    
    res.status(200).json({ message: 'Tax updated successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all schemes controller
exports.getAllSchemes = async (req, res) => {
  try {
    const schemes = await db.query(
      `SELECT ws.*, 
        CASE 
          WHEN es.scheme_id IS NOT NULL THEN 'education'
          WHEN as.scheme_id IS NOT NULL THEN 'agriculture'
          WHEN hs.scheme_id IS NOT NULL THEN 'healthcare'
          ELSE 'general'
        END as scheme_type
      FROM welfare_schemes ws
      LEFT JOIN educational_schemes es ON ws.scheme_id = es.scheme_id
      LEFT JOIN agri_schemes as ON ws.scheme_id = as.scheme_id
      LEFT JOIN healthcare_schemes hs ON ws.scheme_id = hs.scheme_id
      ORDER BY ws.scheme_id`
    );
    
    res.status(200).json(schemes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get scheme enrollments controller
exports.getSchemeEnrollments = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if scheme exists
    const schemeCheck = await db.query(
      'SELECT * FROM welfare_schemes WHERE scheme_id = $1',
      [id]
    );
    
    if (schemeCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    // Get enrollments for the scheme
    const enrollments = await db.query(
      `SELECT se.*, c.name as citizen_name 
      FROM scheme_enrollments se
      JOIN citizens c ON se.citizen_id = c.citizen_id
      WHERE se.scheme_id = $1
      ORDER BY se.enrollment_date DESC`,
      [id]
    );
    
    res.status(200).json(enrollments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve enrollment controller
exports.approveEnrollment = async (req, res) => {
  try {
    const { id, enrollmentId } = req.params;
    
    // Check if enrollment exists
    const enrollmentCheck = await db.query(
      'SELECT * FROM scheme_enrollments WHERE enrollment_id = $1 AND scheme_id = $2',
      [enrollmentId, id]
    );
    
    if (enrollmentCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    // Update enrollment status (assuming there's a status field)
    await db.query(
      'UPDATE scheme_enrollments SET status = $1 WHERE enrollment_id = $2',
      ['approved', enrollmentId]
    );
    
    res.status(200).json({ message: 'Enrollment approved successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject enrollment controller
exports.rejectEnrollment = async (req, res) => {
  try {
    const { id, enrollmentId } = req.params;
    const { reason } = req.body;
    
    // Check if enrollment exists
    const enrollmentCheck = await db.query(
      'SELECT * FROM scheme_enrollments WHERE enrollment_id = $1 AND scheme_id = $2',
      [enrollmentId, id]
    );
    
    if (enrollmentCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    // Update enrollment status (assuming there's a status and rejection_reason field)
    await db.query(
      'UPDATE scheme_enrollments SET status = $1, rejection_reason = $2 WHERE enrollment_id = $3',
      ['rejected', reason, enrollmentId]
    );
    
    res.status(200).json({ message: 'Enrollment rejected successfully' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};