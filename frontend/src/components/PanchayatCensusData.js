// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// export default function CensusDataManagement() {
//     const [censusData, setCensusData] = useState([]);
//     const [newRecord, setNewRecord] = useState({ total_population: '', male_population: '', female_population: '', employment_rate: '', literacy_rate: '' });
//     const [editingRecord, setEditingRecord] = useState(null);

//     useEffect(() => {
//         fetchCensusData();
//     }, []);

//     const fetchCensusData = async () => {
//         try {
//             const response = await fetch('/api/census-data');
//             const data = await response.json();
//             setCensusData(data);
//         } catch (error) {
//             console.error('Error fetching census data:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this record?')) {
//             try {
//                 await fetch(`/api/census-data/${id}`, { method: 'DELETE' });
//                 fetchCensusData();
//             } catch (error) {
//                 console.error('Error deleting record:', error);
//             }
//         }
//     };

//     const handleAdd = async () => {
//         try {
//             await fetch('/api/census-data', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(newRecord)
//             });
//             setNewRecord({ total_population: '', male_population: '', female_population: '', employment_rate: '', literacy_rate: '' });
//             fetchCensusData();
//         } catch (error) {
//             console.error('Error adding record:', error);
//         }
//     };

//     const handleEdit = (record) => {
//         setEditingRecord(record);
//     };

//     const handleUpdate = async () => {
//         try {
//             await fetch(`/api/census-data/${editingRecord.id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(editingRecord)
//             });
//             setEditingRecord(null);
//             fetchCensusData();
//         } catch (error) {
//             console.error('Error updating record:', error);
//         }
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
//             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
//                 <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Census Data Management</h2>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr style={{ background: '#00509d', color: 'white' }}>
//                             <th style={tableHeader}>Total Population</th>
//                             <th style={tableHeader}>Male Population</th>
//                             <th style={tableHeader}>Female Population</th>
//                             <th style={tableHeader}>Employment Rate</th>
//                             <th style={tableHeader}>Literacy Rate</th>
//                             <th style={tableHeader}>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {censusData.map((record) => (
//                             <tr key={record.id} style={{ background: '#f9f9f9' }}>
//                                 <td style={tableCell}>{record.total_population}</td>
//                                 <td style={tableCell}>{record.male_population}</td>
//                                 <td style={tableCell}>{record.female_population}</td>
//                                 <td style={tableCell}>{record.employment_rate}%</td>
//                                 <td style={tableCell}>{record.literacy_rate}%</td>
//                                 <td style={tableCell}>
//                                     <button onClick={() => handleEdit(record)} style={editButton}>✏ Edit</button>
//                                     <button onClick={() => handleDelete(record.id)} style={deleteButton}>🗑 Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {editingRecord ? (
//                     <div>
//                         <h3>Edit Record</h3>
//                         <input type="text" placeholder="Total Population" value={editingRecord.total_population} onChange={(e) => setEditingRecord({ ...editingRecord, total_population: e.target.value })} />
//                         <input type="text" placeholder="Male Population" value={editingRecord.male_population} onChange={(e) => setEditingRecord({ ...editingRecord, male_population: e.target.value })} />
//                         <input type="text" placeholder="Female Population" value={editingRecord.female_population} onChange={(e) => setEditingRecord({ ...editingRecord, female_population: e.target.value })} />
//                         <input type="text" placeholder="Employment Rate" value={editingRecord.employment_rate} onChange={(e) => setEditingRecord({ ...editingRecord, employment_rate: e.target.value })} />
//                         <input type="text" placeholder="Literacy Rate" value={editingRecord.literacy_rate} onChange={(e) => setEditingRecord({ ...editingRecord, literacy_rate: e.target.value })} />
//                         <button onClick={handleUpdate} style={updateButton}>Update</button>
//                     </div>
//                 ) : (
//                     <div>
//                         <h3>Add Record</h3>
//                         <input type="text" placeholder="Total Population" value={newRecord.total_population} onChange={(e) => setNewRecord({ ...newRecord, total_population: e.target.value })} />
//                         <input type="text" placeholder="Male Population" value={newRecord.male_population} onChange={(e) => setNewRecord({ ...newRecord, male_population: e.target.value })} />
//                         <input type="text" placeholder="Female Population" value={newRecord.female_population} onChange={(e) => setNewRecord({ ...newRecord, female_population: e.target.value })} />
//                         <input type="text" placeholder="Employment Rate" value={newRecord.employment_rate} onChange={(e) => setNewRecord({ ...newRecord, employment_rate: e.target.value })} />
//                         <input type="text" placeholder="Literacy Rate" value={newRecord.literacy_rate} onChange={(e) => setNewRecord({ ...newRecord, literacy_rate: e.target.value })} />
//                         <button onClick={handleAdd} style={addButton}>Add</button>
//                     </div>
//                 )}
//                 <Link to="/login/employee" style={buttonStyle}>⬅ Back to Dashboard</Link>
//             </motion.div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CensusDataManagement() {
    const [censusData, setCensusData] = useState([]);
    const [newRecord, setNewRecord] = useState({ total_population: '', male_population: '', female_population: '', employment_rate: '', literacy_rate: '' });
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        fetchCensusData();
    }, []);

    const fetchCensusData = async () => {
        try {
            const response = await fetch('/api/census-data');
            const data = await response.json();
            setCensusData(data);
        } catch (error) {
            console.error('Error fetching census data:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await fetch(`/api/census-data/${id}`, { method: 'DELETE' });
                fetchCensusData();
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/census-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord)
            });
            setNewRecord({ total_population: '', male_population: '', female_population: '', employment_rate: '', literacy_rate: '' });
            fetchCensusData();
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/census-data/${editingRecord.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingRecord)
            });
            setEditingRecord(null);
            fetchCensusData();
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    // ✅ Define missing styles
    const tableHeader = {
        padding: '10px',
        borderBottom: '2px solid white',
        textAlign: 'left'
    };

    const tableCell = {
        padding: '10px',
        borderBottom: '1px solid #ddd'
    };

    const buttonStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        margin: '10px',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#007BFF',
        borderRadius: '5px',
        textAlign: 'center'
    };

    const editButton = {
        backgroundColor: '#FFC107',
        border: 'none',
        padding: '5px 10px',
        margin: '5px',
        cursor: 'pointer',
        borderRadius: '5px'
    };

    const deleteButton = {
        backgroundColor: '#DC3545',
        border: 'none',
        padding: '5px 10px',
        margin: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
        color: 'white'
    };

    const updateButton = {
        backgroundColor: '#28A745',
        border: 'none',
        padding: '8px 15px',
        margin: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
        color: 'white'
    };

    const addButton = {
        backgroundColor: '#17A2B8',
        border: 'none',
        padding: '8px 15px',
        margin: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
        color: 'white'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
                <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Census Data Management</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#00509d', color: 'white' }}>
                            <th style={tableHeader}>Total Population</th>
                            <th style={tableHeader}>Male Population</th>
                            <th style={tableHeader}>Female Population</th>
                            <th style={tableHeader}>Employment Rate</th>
                            <th style={tableHeader}>Literacy Rate</th>
                            <th style={tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {censusData.map((record) => (
                            <tr key={record.id} style={{ background: '#f9f9f9' }}>
                                <td style={tableCell}>{record.total_population}</td>
                                <td style={tableCell}>{record.male_population}</td>
                                <td style={tableCell}>{record.female_population}</td>
                                <td style={tableCell}>{record.employment_rate}%</td>
                                <td style={tableCell}>{record.literacy_rate}%</td>
                                <td style={tableCell}>
                                    <button onClick={() => handleEdit(record)} style={editButton}>✏ Edit</button>
                                    <button onClick={() => handleDelete(record.id)} style={deleteButton}>🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingRecord ? (
                    <div>
                        <h3>Edit Record</h3>
                        <input type="text" placeholder="Total Population" value={editingRecord.total_population} onChange={(e) => setEditingRecord({ ...editingRecord, total_population: e.target.value })} />
                        <input type="text" placeholder="Male Population" value={editingRecord.male_population} onChange={(e) => setEditingRecord({ ...editingRecord, male_population: e.target.value })} />
                        <input type="text" placeholder="Female Population" value={editingRecord.female_population} onChange={(e) => setEditingRecord({ ...editingRecord, female_population: e.target.value })} />
                        <input type="text" placeholder="Employment Rate" value={editingRecord.employment_rate} onChange={(e) => setEditingRecord({ ...editingRecord, employment_rate: e.target.value })} />
                        <input type="text" placeholder="Literacy Rate" value={editingRecord.literacy_rate} onChange={(e) => setEditingRecord({ ...editingRecord, literacy_rate: e.target.value })} />
                        <button onClick={handleUpdate} style={updateButton}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>Add Record</h3>
                        <input type="text" placeholder="Total Population" value={newRecord.total_population} onChange={(e) => setNewRecord({ ...newRecord, total_population: e.target.value })} />
                        <input type="text" placeholder="Male Population" value={newRecord.male_population} onChange={(e) => setNewRecord({ ...newRecord, male_population: e.target.value })} />
                        <input type="text" placeholder="Female Population" value={newRecord.female_population} onChange={(e) => setNewRecord({ ...newRecord, female_population: e.target.value })} />
                        <button onClick={handleAdd} style={addButton}>Add</button>
                    </div>
                )}
                <Link to="/login/employee" style={buttonStyle}>⬅ Back to Dashboard</Link>
            </motion.div>
        </div>
    );
}

