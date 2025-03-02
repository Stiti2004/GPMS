

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// export default function RegisterPage() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         fullName: '',
//         gender: '',
//         dob: '',
//         householdId: '',
//         education: '',
//         occupation: ''
//     });
//     const [error, setError] = useState('');

//     const validOccupations = ['Farmer', 'Teacher', 'Shopkeeper', 'Engineer', 'Doctor', 'Student', 'Other'];
   
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleRegister = async () => {
//         if (!formData.username || !formData.password || !formData.fullName || !formData.gender || !formData.dob || !formData.householdId || !formData.education || !formData.occupation) {
//             setError('Please fill in all required fields.');
//             return;
//         }

//         const today = new Date().toISOString().split("T")[0];
//         if (formData.dob > today) {
//             setError('Date of birth cannot be in the future.');
//             return;
//         }

//         if (!validOccupations.includes(formData.occupation)) {
//             setError('Invalid occupation selected.');
//             return;
//         }

//         try {
//             const response = await fetch('/api/check-username', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username: formData.username })
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 setError(data.error || 'Username already exists.');
//                 return;
//             }

//             setError('');
//             alert('Registration successful! Redirecting to login.');
//             navigate('/login');
//         } catch (error) {
//             setError('Error connecting to server. Please try again later.');
//         }
//     };

//     return (
//         <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
//             <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Home</button>
//             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '400px' }}>
//                 <h2 style={{ color: '#00509d', fontWeight: 'bold', marginBottom: '15px' }}>Register as Citizen</h2>
//                 {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
//                 <input name="username" type="text" placeholder="Username" onChange={handleChange} style={inputStyle} />
//                 <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} />
//                 <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
//                 <select name="gender" onChange={handleChange} style={inputStyle}>
//                     <option value="" disabled selected>Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                 </select>
//                 <label style={{ fontWeight: 'bold', color: '#203a43', display: 'block', textAlign: 'left', marginBottom: '5px' }}>Date of Birth</label>
//                 <input name="dob" type="date" onChange={handleChange} style={inputStyle} />
//                 <input name="householdId" type="text" placeholder="Household ID" onChange={handleChange} style={inputStyle} />
//                 <input name="education" type="text" placeholder="Educational Qualification" onChange={handleChange} style={inputStyle} />
//                 <select name="occupation" onChange={handleChange} style={inputStyle}>
//                     <option value="" disabled selected>Occupation</option>
//                     {validOccupations.map((occ) => (
//                         <option key={occ} value={occ}>{occ}</option>
//                     ))}
//                 </select>
//                 <button onClick={handleRegister} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#00509d', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>Register 📝</button>
//                 <p style={{ fontSize: '14px', color: '#333' }}>Already have an account? <span style={{ color: '#00509d', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Login</span></p>
//             </motion.div>
//         </div>
//     );
// }

// const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     marginBottom: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ddd'
// };


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CitizenRegister() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        gender: '',
        dob: '',
        householdId: '',
        education: '',
        occupation: ''
    });
    const [error, setError] = useState('');

    const validOccupations = ['Farmer', 'Teacher', 'Shopkeeper', 'Engineer', 'Doctor', 'Student', 'Other'];
   
    const [incomeError, setIncomeError] = useState("");

const handleChange = (e) => {
  let { name, value } = e.target;

  if (name === "income") {
    if (value === "" || Number(value) > 1) {
      setIncomeError(""); // Clear error if valid
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setIncomeError("Please enter a valid income.");
    }
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

      

    const handleRegister = async () => {
        if (!formData.username || !formData.password || !formData.fullName || !formData.gender || !formData.dob || !formData.address || !formData.income || !formData.education || !formData.occupation) {
            setError('Please fill in all required fields.');
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (formData.dob > today) {
            setError('Date of birth cannot be in the future.');
            return;
        }

        if (!validOccupations.includes(formData.occupation)) {
            setError('Invalid occupation selected.');
            return;
        }

        try {
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: formData.username })
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Username already exists.');
                return;
            }

            setError('');
            alert('Registration successful!');
           
            if (location.state?.redirectTo) {
                navigate(location.state.redirectTo);
            } else {
                navigate('/login');
            }
        } catch (error) {
            setError('Error connecting to server. Please try again later.');
        }
    };

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Home</button>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '400px' }}>
                <h2 style={{ color: '#00509d', fontWeight: 'bold', marginBottom: '15px' }}>Register as Citizen</h2>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                <input name="username" type="text" placeholder="Username" onChange={handleChange} style={inputStyle} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} />
                <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
                <select name="gender" onChange={handleChange} style={inputStyle}>
                    <option value="" disabled selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label style={{ fontWeight: 'bold', color: '#203a43', display: 'block', textAlign: 'left', marginBottom: '5px' }}>Date of Birth</label>
                <input name="dob" type="date" onChange={handleChange} style={inputStyle} />
                <input name="address" type="text" placeholder="Address" onChange={handleChange} style={inputStyle} />
                <input name="education" type="text" placeholder="Educational Qualification" onChange={handleChange} style={inputStyle} />
                <select name="occupation" onChange={handleChange} style={inputStyle}>
                    <option value="" disabled selected>Occupation</option>
                    {validOccupations.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                    ))}
                </select>
                <input 
  name="income" 
  type="number" 
  placeholder="Income" 
  onChange={handleChange} 
  style={inputStyle} 
/>
{incomeError && <p style={{ color: "red" }}>{incomeError}</p>}



               
                <button onClick={handleRegister} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#00509d', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>Register 📝</button>
                <p style={{ fontSize: '14px', color: '#333' }}>Already have an account? <span style={{ color: '#00509d', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Login</span></p>
            </motion.div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd'
};

