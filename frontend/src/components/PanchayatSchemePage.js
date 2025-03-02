// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function SchemesManagement() {
//     const [schemes, setSchemes] = useState([]);
//     const [selectedScheme, setSelectedScheme] = useState('agriculture');
//     const [loading, setLoading] = useState(true);
//     const [formData, setFormData] = useState({ scheme_name: '', beneficiaries: '', budget: '', extra: '' });
   
//     useEffect(() => {
//         fetchSchemes();
//     }, [selectedScheme]);

//     const fetchSchemes = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`/api/schemes/${selectedScheme}`);
//             const data = await response.json();
//             setSchemes(data);
//         } catch (error) {
//             console.error('Error fetching schemes:', error);
//         }
//         setLoading(false);
//     };

//     const handleDelete = async (id) => {
//         await fetch(`/api/schemes/${selectedScheme}/delete/${id}`, { method: 'DELETE' });
//         fetchSchemes();
//     };

//     const handleAdd = async () => {
//         await fetch(`/api/schemes/${selectedScheme}/add`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         });
//         fetchSchemes();
//     };

//     const handleUpdate = async (id) => {
//         await fetch(`/api/schemes/${selectedScheme}/update/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         });
//         fetchSchemes();
//     };

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
//             <h2 style={{ color: '#1e3c72', textAlign: 'center' }}>Manage Schemes</h2>
//             <select value={selectedScheme} onChange={(e) => setSelectedScheme(e.target.value)} style={dropdownStyle}>
//                 <option value="agriculture">Agriculture</option>
//                 <option value="education">Education</option>
//                 <option value="healthcare">Healthcare</option>
//             </select>
//             <div style={{ marginBottom: '20px' }}>
//                 <input type="text" placeholder="Scheme Name" onChange={(e) => setFormData({ ...formData, scheme_name: e.target.value })} style={inputStyle} />
//                 <input type="number" placeholder="Beneficiaries" onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })} style={inputStyle} />
//                 <input type="number" placeholder="Budget" onChange={(e) => setFormData({ ...formData, budget: e.target.value })} style={inputStyle} />
//                 <input type="text" placeholder={selectedScheme === 'agriculture' ? "Subsidies" : selectedScheme === 'education' ? "Scholarship Amount" : "Target Disease"} onChange={(e) => setFormData({ ...formData, extra: e.target.value })} style={inputStyle} />
//                 <button onClick={handleAdd} style={addButtonStyle}>Add Scheme</button>
//             </div>
//             {loading ? <p>Loading...</p> : (
//                 <table style={tableStyle}>
//                     <thead>
//                         <tr>
//                             <th>Scheme Name</th>
//                             <th>Beneficiaries</th>
//                             <th>Budget</th>
//                             <th>{selectedScheme === 'agriculture' ? "Subsidies" : selectedScheme === 'education' ? "Scholarship Amount" : "Target Disease"}</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {schemes.map((scheme) => (
//                             <tr key={scheme.id}>
//                                 <td>{scheme.scheme_name}</td>
//                                 <td>{scheme.beneficiaries}</td>
//                                 <td>₹{scheme.budget}</td>
//                                 <td>{scheme.extra}</td>
//                                 <td>
//                                     <button onClick={() => handleUpdate(scheme.id)} style={updateButtonStyle}>Update</button>
//                                     <button onClick={() => handleDelete(scheme.id)} style={deleteButtonStyle}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//             <Link to="//login/employee" style={backButtonStyle}>⬅ Back to Dashboard</Link>
//         </div>
//     );
// }

// const dropdownStyle = {
//     display: 'block',
//     margin: '20px auto',
//     padding: '10px',
//     borderRadius: '5px',
//     fontSize: '16px'
// };

// const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '20px'
// };

// const inputStyle = {
//     margin: '5px',
//     padding: '10px',
//     borderRadius: '5px',
//     fontSize: '14px'
// };

// const addButtonStyle = {
//     backgroundColor: '#28a745',
//     color: 'white',
//     padding: '10px',
//     borderRadius: '5px',
//     cursor: 'pointer'
// };

// const updateButtonStyle = {
//     backgroundColor: '#007bff',
//     color: 'white',
//     padding: '5px 10px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginRight: '5px'
// };

// const deleteButtonStyle = {
//     backgroundColor: '#e63946',
//     color: 'white',
//     padding: '5px 10px',
//     borderRadius: '5px',
//     cursor: 'pointer'
// };

// const backButtonStyle = {
//     display: 'block',
//     textAlign: 'center',
//     marginTop: '20px',
//     padding: '10px',
//     background: '#ffcc29',
//     color: '#333',
//     borderRadius: '5px',
//     textDecoration: 'none'
// };


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SchemesManagement() {
    const [schemes, setSchemes] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState('agriculture');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ scheme_name: '', beneficiaries: '', budget: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchemes();
    }, [selectedScheme]);

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/schemes/${selectedScheme}`);
            const data = await response.json();
            setSchemes(data);
        } catch (error) {
            console.error('Error fetching schemes:', error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        await fetch(`/api/schemes/${selectedScheme}/delete/${id}`, { method: 'DELETE' });
        fetchSchemes();
    };

    const handleAdd = async () => {
        await fetch(`/api/schemes/${selectedScheme}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        fetchSchemes();
    };

    const handleUpdate = async (id) => {
        await fetch(`/api/schemes/${selectedScheme}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        fetchSchemes();
    };

    const handleLogout = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
            <h2 style={{ color: '#1e3c72', textAlign: 'center' }}>Manage Schemes</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <select value={selectedScheme} onChange={(e) => setSelectedScheme(e.target.value)} style={dropdownStyle}>
                    <option value="agriculture">Agriculture</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                </select>
                <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <input type="text" placeholder="Scheme Name" onChange={(e) => setFormData({ ...formData, scheme_name: e.target.value })} style={inputStyle} />
                <input type="number" placeholder="Beneficiaries" onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })} style={inputStyle} />
                <input type="number" placeholder="Budget" onChange={(e) => setFormData({ ...formData, budget: e.target.value })} style={inputStyle} />

                {/* Additional Fields Based on Selected Scheme */}
                {selectedScheme === 'agriculture' && (
                    <>
                        <input type="number" placeholder="Subsidy Amount" onChange={(e) => setFormData({ ...formData, subsidy_amount: e.target.value })} style={inputStyle} />
                        <input type="text" placeholder="Training Program" onChange={(e) => setFormData({ ...formData, training_program: e.target.value })} style={inputStyle} />
                        <input type="text" placeholder="Equipment" onChange={(e) => setFormData({ ...formData, equipment: e.target.value })} style={inputStyle} />
                    </>
                )}
                {selectedScheme === 'education' && (
                    <>
                        <input type="number" placeholder="Scholarship Amount" onChange={(e) => setFormData({ ...formData, scholarship_amount: e.target.value })} style={inputStyle} />
                        <input type="text" placeholder="Free Meals" onChange={(e) => setFormData({ ...formData, free_meals: e.target.value })} style={inputStyle} />
                        <input type="number" placeholder="Literacy Rate Target" onChange={(e) => setFormData({ ...formData, literacy_rate_target: e.target.value })} style={inputStyle} />
                    </>
                )}
                {selectedScheme === 'healthcare' && (
                    <>
                        <input type="text" placeholder="Target Disease" onChange={(e) => setFormData({ ...formData, target_disease: e.target.value })} style={inputStyle} />
                        <input type="text" placeholder="Free Medicine List" onChange={(e) => setFormData({ ...formData, free_medicine_list: e.target.value })} style={inputStyle} />
                    </>
                )}

                <button onClick={handleAdd} style={addButtonStyle}>Add Scheme</button>
            </div>

            {loading ? <p>Loading...</p> : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Scheme Name</th>
                            <th>Beneficiaries</th>
                            <th>Budget</th>
                            {selectedScheme === 'agriculture' && <th>Subsidy Amount</th>}
                            {selectedScheme === 'agriculture' && <th>Training Program</th>}
                            {selectedScheme === 'agriculture' && <th>Equipment</th>}
                            {selectedScheme === 'education' && <th>Scholarship Amount</th>}
                            {selectedScheme === 'education' && <th>Free Meals</th>}
                            {selectedScheme === 'education' && <th>Literacy Rate Target</th>}
                            {selectedScheme === 'healthcare' && <th>Target Disease</th>}
                            {selectedScheme === 'healthcare' && <th>Free Medicine List</th>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schemes.map((scheme) => (
                            <tr key={scheme.id}>
                                <td>{scheme.scheme_name}</td>
                                <td>{scheme.beneficiaries}</td>
                                <td>₹{scheme.budget}</td>
                                {selectedScheme === 'agriculture' && <td>{scheme.subsidy_amount}</td>}
                                {selectedScheme === 'agriculture' && <td>{scheme.training_program}</td>}
                                {selectedScheme === 'agriculture' && <td>{scheme.equipment}</td>}
                                {selectedScheme === 'education' && <td>{scheme.scholarship_amount}</td>}
                                {selectedScheme === 'education' && <td>{scheme.free_meals}</td>}
                                {selectedScheme === 'education' && <td>{scheme.literacy_rate_target}</td>}
                                {selectedScheme === 'healthcare' && <td>{scheme.target_disease}</td>}
                                {selectedScheme === 'healthcare' && <td>{scheme.free_medicine_list}</td>}
                                <td>
                                    <button onClick={() => handleUpdate(scheme.id)} style={updateButtonStyle}>Update</button>
                                    <button onClick={() => handleDelete(scheme.id)} style={deleteButtonStyle}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to="/login/panchayat" style={backButtonStyle}>⬅ Back to Dashboard</Link>
        </div>
    );
}

// // Styles
// const dropdownStyle = { margin: '20px', padding: '10px', borderRadius: '5px' };
// const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
// const inputStyle = { margin: '5px', padding: '10px', borderRadius: '5px' };
// const addButtonStyle = { backgroundColor: '#28a745', color: 'white', padding: '10px', borderRadius: '5px' };
// const updateButtonStyle = { backgroundColor: '#007bff', color: 'white', padding: '5px', borderRadius: '5px' };
// const deleteButtonStyle = { backgroundColor: '#e63946', color: 'white', padding: '5px', borderRadius: '5px' };
// const backButtonStyle = { textAlign: 'center', marginTop: '20px', padding: '10px', background: '#ffcc29', color: '#333' };
//const logoutButtonStyle = { backgroundColor: '#dc3545', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' };

const dropdownStyle = {
    display: 'block',
    margin: '20px auto',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
};

const inputStyle = {
    margin: '5px',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '14px'
};

const addButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer'
};

const updateButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px'
};

const deleteButtonStyle = {
    backgroundColor: '#e63946',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
};

const backButtonStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
    background: '#ffcc29',
    color: '#333',
    borderRadius: '5px',
    textDecoration: 'none'
};

const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
};