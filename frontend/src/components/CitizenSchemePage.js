// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function SchemePage() {
//     const { schemeType } = useParams();  // Get scheme type from URL
//     const [schemeData, setSchemeData] = useState(null);

//     useEffect(() => {
//         async function fetchSchemeData() {
//             try {
//                 const response = await fetch(`/api/schemes/${schemeType}`);
//                 const data = await response.json();
//                 setSchemeData(data);
//             } catch (error) {
//                 console.error('Error fetching scheme data:', error);
//             }
//         }
//         fetchSchemeData();
//     }, [schemeType]);

//     if (!schemeData) return <p>Loading {schemeType} scheme details...</p>;

//     return (
//         <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
//             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '500px' }}>
//                 <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>{schemeType.charAt(0).toUpperCase() + schemeType.slice(1)} Scheme</h2>
               
//                 {schemeType === 'agriculture' && (
//                     <>
//                         <p><strong>Beneficiaries:</strong> {schemeData.beneficiaries}</p>
//                         <p><strong>Subsidy Amount:</strong> ₹{schemeData.subsidy_amount}</p>
//                         <p><strong>Equipment Provided:</strong> {schemeData.equipment_provided}</p>
//                     </>
//                 )}

//                 {schemeType === 'education' && (
//                     <>
//                         <p><strong>Beneficiaries:</strong> {schemeData.beneficiaries}</p>
//                         <p><strong>Scholarship Amount:</strong> ₹{schemeData.scholarship_amount}</p>
//                         <p><strong>Free Meals:</strong> {schemeData.free_meals ? "Yes" : "No"}</p>
//                     </>
//                 )}

//                 {schemeType === 'healthcare' && (
//                     <>
//                         <p><strong>Target Disease:</strong> {schemeData.target_disease}</p>
//                         <p><strong>Free Medicine List:</strong> {schemeData.free_medicine_list}</p>
//                     </>
//                 )}

//                 <Link to="/login/citizen" style={buttonStyle}>⬅ Back to Dashboard</Link>
//             </motion.div>
//         </div>
//     );
// }

// const buttonStyle = {
//     marginTop: '15px',
//     display: 'inline-block',
//     padding: '10px 20px',
//     borderRadius: '8px',
//     background: '#ffcc29',
//     color: '#333',
//     textDecoration: 'none',
//     fontWeight: 'bold'
// };

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SchemePage() {
    const { schemeType } = useParams(); // Get scheme type from URL
    const [schemeData, setSchemeData] = useState(null);

    useEffect(() => {
        async function fetchSchemeData() {
            try {
                const response = await fetch(`/api/schemes/${schemeType}`);
                const data = await response.json();
                setSchemeData(data);
            } catch (error) {
                console.error('Error fetching scheme data:', error);
            }
        }
        fetchSchemeData();
    }, [schemeType]);

    if (!schemeData) return <p>Loading {schemeType} scheme details...</p>;

    return (
        <div style={containerStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={cardStyle}>
                <h2 style={headerStyle}>{schemeType.charAt(0).toUpperCase() + schemeType.slice(1)} Scheme</h2>
               
                <table style={tableStyle}>
                    <thead>
                        <tr style={headerRowStyle}>
                            {schemeType === 'agriculture' && (
                                <>
                                    <th>SchemeName</th>
                                    <th>Beneficiaries</th>
                                    <th>Subsidy Amount</th>
                                    <th>Equipment Provided</th>
                                </>
                            )}
                            {schemeType === 'education' && (
                                <>
                                    <th>SchemeName</th>
                                    <th>Beneficiaries</th>
                                    <th>Scholarship Amount</th>
                                    <th>Free Meals</th>
                                </>
                            )}
                            {schemeType === 'healthcare' && (
                                <>
                                    <th>SchemeName</th>
                                    <th>Target Disease</th>
                                    <th>Free Medicine List</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {schemeType === 'agriculture' && (
                                <>
                                    <td>{schemeData.scheme_name}</td>
                                    <td>{schemeData.beneficiaries}</td>
                                    <td>₹{schemeData.subsidy_amount}</td>
                                    <td>{schemeData.equipment_provided}</td>
                                </>
                            )}
                            {schemeType === 'education' && (
                                <>
                                    <td>{schemeData.scheme_name}</td>
                                    <td>{schemeData.beneficiaries}</td>
                                    <td>₹{schemeData.scholarship_amount}</td>
                                    <td>{schemeData.free_meals ? "Yes" : "No"}</td>
                                </>
                            )}
                            {schemeType === 'healthcare' && (
                                <>
                                    <td>{schemeData.scheme_name}</td>
                                    <td>{schemeData.target_disease}</td>
                                    <td>{schemeData.free_medicine_list}</td>
                                </>
                            )}
                        </tr>
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                    <Link to="/login/citizen" style={buttonStyle}>⬅ Back to Dashboard</Link>
                    <Link to="/" style={logoutButtonStyle}>🚪 Logout</Link>
                </div>
            </motion.div>
        </div>
    );
}

// 🔹🔹🔹 STYLES 🔹🔹🔹
const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
    padding: '20px'
};

const cardStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '600px'
};

const headerStyle = {
    color: '#1e3c72',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontSize: '1.8rem'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px'
};

const headerRowStyle = {
    background: '#1e3c72',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#ffcc29',
    color: '#333',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const logoutButtonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#e63946',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
};

