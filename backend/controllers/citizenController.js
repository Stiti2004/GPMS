const db = require('../db');

// Get citizen homepage controller
exports.getHomePage = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const citizenData = await db.query(
      'SELECT name FROM citizens WHERE citizen_id = $1',
      [citizenId]
    );
    
    if (citizenData.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    const citizen = citizenData.rows[0];
    
    res.status(200).json({
      message: `Welcome ${citizen.name} to the Gram Panchayat Management System`,
      services: [
        { name: 'My Profile', url: '/citizens/profile' },
        { name: 'Land Records', url: '/citizens/land-records' },
        { name: 'Welfare Schemes', url: '/citizens/schemes' },
        { name: 'Certificates', url: '/citizens/certificates' },
        { name: 'Tax Information', url: '/citizens/taxes' },
        { name: 'Vaccination Records', url: '/citizens/vaccinations' }
      ]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get citizen profile controller
exports.getProfile = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const citizenData = await db.query(
      `SELECT c.citizen_id, c.name, c.gender, c.dob, c.educational_qualification, 
      h.address, h.income 
      FROM citizens c
      LEFT JOIN households h ON c.household_id = h.household_id
      WHERE c.citizen_id = $1`,
      [citizenId]
    );
    
    if (citizenData.rows.length === 0) {
      return res.status(404).json({ message: 'Citizen not found' });
    }
    
    res.status(200).json(citizenData.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get land records controller
exports.getLandRecords = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const landRecords = await db.query(
      'SELECT * FROM land_records WHERE citizen_id = $1',
      [citizenId]
    );
    
    res.status(200).json(landRecords.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get schemes controller
exports.getSchemes = async (req, res) => {
  try {
    const citizenId = req.user.id;
    
    // Get all schemes
    const schemes = await db.query(
      `SELECT ws.*, 
        CASE 
          WHEN es.scheme_id IS NOT NULL THEN 'education'
          WHEN as.scheme_id IS NOT NULL THEN 'agriculture'
          WHEN hs.scheme_id IS NOT NULL THEN 'healthcare'
          ELSE 'general'
        END as scheme_type,
        es.scholarship_amount, es.free_meals, es.literacy_role_target,
        as.subsidy_amount, as.training, as.prog_equipment_provided,
        hs.target_disease, hs.free_medicine_list
      FROM welfare_schemes ws
      LEFT JOIN educational_schemes es ON ws.scheme_id = es.scheme_id
      LEFT JOIN agri_schemes as ON ws.scheme_id = as.scheme_id
      LEFT JOIN healthcare_schemes hs ON ws.scheme_id = hs.scheme_id`
    );
    
    // Get the schemes the citizen is enrolled in
    const enrollments = await db.query(
      'SELECT scheme_id FROM scheme_enrollments WHERE citizen_id = $1',
      [citizenId]
    );
    
    const enrolledSchemeIds = enrollments.rows.map(row => row.scheme_id);
    
    // Add enrolled status to each scheme
    const schemesWithEnrollmentStatus = schemes.rows.map(scheme => ({
      ...scheme,
      isEnrolled: enrolledSchemeIds.includes(scheme.scheme_id)
    }));
    
    res.status(200).json(schemesWithEnrollmentStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply for scheme controller
exports.applyForScheme = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const { schemeId } = req.params;
    
    // Check if already enrolled
    const checkEnrollment = await db.query(
      'SELECT * FROM scheme_enrollments WHERE citizen_id = $1 AND scheme_id = $2',
      [citizenId, schemeId]
    );
    
    if (checkEnrollment.rows.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this scheme' });
    }
    
    // Check if scheme exists
    const schemeCheck = await db.query(
      'SELECT * FROM welfare_schemes WHERE scheme_id = $1',
      [schemeId]
    );
    
    if (schemeCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    
    // Enroll citizen
    await db.query(
      'INSERT INTO scheme_enrollments (citizen_id, scheme_id, enrollment_date) VALUES ($1, $2, CURRENT_DATE)',
      [citizenId, schemeId]
    );
    
    res.status(201).json({ message: 'Successfully applied for the scheme' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get certificates controller
exports.getCertificates = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const certificates = await db.query(
      'SELECT * FROM certificates WHERE citizen_id = $1',
      [citizenId]
    );
    
    res.status(200).json(certificates.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply for certificate controller
exports.applyForCertificate = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const { type } = req.body;
    
    await db.query(
      'INSERT INTO certificates (citizen_id, type, issue_date) VALUES ($1, $2, CURRENT_DATE)',
      [citizenId, type]
    );
    
    res.status(201).json({ message: 'Certificate application submitted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get taxes controller
exports.getTaxes = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const taxes = await db.query(
      'SELECT * FROM citizen_taxes WHERE citizen_id = $1',
      [citizenId]
    );
    
    res.status(200).json(taxes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get vaccinations controller
exports.getVaccinations = async (req, res) => {
  try {
    const citizenId = req.user.id;
    const vaccinations = await db.query(
      'SELECT * FROM vaccinations WHERE citizen_id = $1',
      [citizenId]
    );
    
    res.status(200).json(vaccinations.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};