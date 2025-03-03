const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};


// Hash password before storing
const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Login controller
// 📌 **Login Controller**
exports.login = async (req, res) => {
  try {
    const { role, username, password } = req.body;

    console.log("🟢 Login Attempt:", { username, role }); // ✅ Log request

    let user;
    let tableName;
    let idField;

    // 🔍 **Determine which table to query based on role**
    switch (role) {
      case 'citizen':
        tableName = 'citizens';
        idField = 'citizen_id';
        break;
      case 'employee':
        tableName = 'panchayat_committee_members';
        idField = 'member_id';
        break;
      case 'administrator':
        tableName = 'system_administrators';
        idField = 'username';
        break;
      case 'government_monitor':
        tableName = 'government_monitors';
        idField = 'username';
        break;
      default:
        console.error("❌ Invalid role:", role);
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    console.log(`🔍 Searching in Table: ${tableName} for Username: ${username}`);

    // 🔍 **Query the appropriate table**
    const result = await db.query(`SELECT * FROM ${tableName} WHERE username = $1`, [username]);

    if (result.rows.length === 0) {
      console.warn("⚠️ User not found:", username);
      return res.status(401).json({ message: 'Invalid username or role' });
    }

    user = result.rows[0];

    console.log("🟢 User found:", user);

    // 🔐 **Verify password**
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn("⚠️ Incorrect password for:", username);
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log("✅ Password verified for:", username);

    // 🎫 **Create JWT Token**
    const token = jwt.sign(
      { id: user[idField], username: user.username, role: role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log("✅ Token generated for:", username);

    res.status(200).json({
      token,
      role,
      username: user.username,
      redirectUrl: `/login/${role}`
    });

  } catch (error) {
    console.error("❌ Server error during login:", error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


// Get register page controller
exports.getRegisterPage = (req, res) => {
  res.json({
    roles: ['citizen', 'panchayatMember', 'admin', 'monitor'],
    message: 'Please select a role to register'
  });
};

// Register citizen controller
// Register citizen controller
exports.registerCitizen = async (req, res) => {
  console.log(req);
  try {
    const { 
      name, gender, dob, household_id, educational_qualification, 
      username, password 
    } = req.body;

    console.log(name, gender, dob, household_id, educational_qualification, 
      username, password );

    // Validate required fields
    if (!username || !password || !name || !gender || !dob || !household_id || !educational_qualification) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate date of birth
    const today = new Date().toISOString().split('T')[0];
    if (dob > today) {
      return res.status(400).json({ message: 'Date of birth cannot be in the future.' });
    }

    // Validate income
    /* if (isNaN(income) || income < 0) {
      return res.status(400).json({ message: 'Income must be a valid positive number.' });
    } */

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Check if username already exists
    const userCheck = await db.query(
      'SELECT * FROM citizens WHERE username = %s',
      (username)
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert new citizen
    const result = await db.query(
      `INSERT INTO citizens 
       (name, gender, dob, household_id, educational_qualification, username, password, occupation, income, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING citizen_id, username`,
      [name, gender, dob, household_id, educational_qualification, username, hashedPassword, 'citizen']
    );

    res.status(201).json({
      message: 'Citizen registered successfully',
      redirectUrl: '/login'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Register panchayat member as citizen controller
exports.registerPanchayatMemberAsCitizen = async (req, res) => {
  try {
    // First register as citizen
    await exports.registerCitizen(req, res);
    // Redirect to panchayat member registration
    res.json({
      message: 'Citizen registered successfully. Please complete panchayat member registration.',
      redirectUrl: '/register/panchayatMember/member',
      citizenId: req.body.citizen_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Register panchayat member controller
exports.registerPanchayatMember = async (req, res) => {
  try {
    const { 
      citizen_id, first_name, last_name, role, contact_number,
      term_start_date, term_end_date, username, password 
    } = req.body;
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Check if username already exists
    const userCheck = await db.query(
      'SELECT * FROM panchayat_committee_members WHERE username = $1',
      [username]
    );
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Insert new panchayat member
    const result = await db.query(
      `INSERT INTO panchayat_committee_members 
       (citizen_id, first_name, last_name, role, contact_number, term_start_date, term_end_date, username, password) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING member_id, username`,
      [citizen_id, first_name, last_name, role, contact_number, term_start_date, term_end_date, username, hashedPassword]
    );
    
    res.status(201).json({
      message: 'Panchayat member registered successfully',
      redirectUrl: '/login'
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Register admin controller
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Check if username already exists
    const userCheck = await db.query(
      'SELECT * FROM system_administrators WHERE username = $1',
      [username]
    );
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Insert new admin
    const result = await db.query(
      `INSERT INTO system_administrators (username, password) 
       VALUES ($1, $2) 
       RETURNING username`,
      [username, hashedPassword]
    );
    
    res.status(201).json({
      message: 'Administrator registered successfully',
      redirectUrl: '/login'
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Register monitor controller
exports.registerMonitor = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Check if username already exists
    const userCheck = await db.query(
      'SELECT * FROM government_monitors WHERE username = $1',
      [username]
    );
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Insert new monitor
    const result = await db.query(
      `INSERT INTO government_monitors (username, password) 
       VALUES ($1, $2) 
       RETURNING username`,
      [username, hashedPassword]
    );
    
    res.status(201).json({
      message: 'Government monitor registered successfully',
      redirectUrl: '/login'
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};