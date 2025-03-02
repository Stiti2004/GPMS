import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function VaccinationManagement() {
    const [vaccinations, setVaccinations] = useState([]);
    const [newVaccination, setNewVaccination] = useState({ citizen_name: '', vaccination_type: '', date_admitted: '' });
    const [editingVaccination, setEditingVaccination] = useState(null);

    useEffect(() => {
        fetchVaccinations();
    }, []);

    const fetchVaccinations = async () => {
        try {
            const response = await fetch('/api/vaccinations');
            const data = await response.json();
            setVaccinations(data);
        } catch (error) {
            console.error('Error fetching vaccinations:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await fetch(`/api/vaccinations/${id}`, { method: 'DELETE' });
                fetchVaccinations();
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/vaccinations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVaccination)
            });
            setNewVaccination({ citizen_name: '', vaccination_type: '', date_admitted: '' });
            fetchVaccinations();
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    const handleEdit = (vaccination) => {
        setEditingVaccination(vaccination);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/vaccinations/${editingVaccination.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingVaccination)
            });
            setEditingVaccination(null);
            fetchVaccinations();
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
                <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Vaccination Records</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#00509d', color: 'white' }}>
                            <th style={tableHeader}>Citizen Name</th>
                            <th style={tableHeader}>Vaccination Type</th>
                            <th style={tableHeader}>Date Admitted</th>
                            <th style={tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vaccinations.map((record) => (
                            <tr key={record.id} style={{ background: '#f9f9f9' }}>
                                <td style={tableCell}>{record.citizen_name}</td>
                                <td style={tableCell}>{record.vaccination_type}</td>
                                <td style={tableCell}>{record.date_admitted}</td>
                                <td style={tableCell}>
                                    <button onClick={() => handleEdit(record)} style={editButton}>✏ Edit</button>
                                    <button onClick={() => handleDelete(record.id)} style={deleteButton}>🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingVaccination ? (
                    <div>
                        <h3>Edit Vaccination Record</h3>
                        <input type="text" placeholder="Citizen Name" value={editingVaccination.citizen_name} onChange={(e) => setEditingVaccination({ ...editingVaccination, citizen_name: e.target.value })} />
                        <input type="text" placeholder="Vaccination Type" value={editingVaccination.vaccination_type} onChange={(e) => setEditingVaccination({ ...editingVaccination, vaccination_type: e.target.value })} />
                        <input type="date" value={editingVaccination.date_admitted} onChange={(e) => setEditingVaccination({ ...editingVaccination, date_admitted: e.target.value })} />
                        <button onClick={handleUpdate} style={updateButton}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>Add Vaccination Record</h3>
                        <input type="text" placeholder="Citizen Name" value={newVaccination.citizen_name} onChange={(e) => setNewVaccination({ ...newVaccination, citizen_name: e.target.value })} />
                        <input type="text" placeholder="Vaccination Type" value={newVaccination.vaccination_type} onChange={(e) => setNewVaccination({ ...newVaccination, vaccination_type: e.target.value })} />
                        <input type="date" value={newVaccination.date_admitted} onChange={(e) => setNewVaccination({ ...newVaccination, date_admitted: e.target.value })} />
                        <button onClick={handleAdd} style={addButton}>Add</button>
                    </div>
                )}
                <Link to="/login/employee" style={buttonStyle}>⬅ Back to Dashboard</Link>
            </motion.div>
        </div>
    );
}

const tableHeader = { padding: '10px', textAlign: 'left' };
const tableCell = { padding: '10px', borderBottom: '1px solid #ddd' };
const editButton = { background: '#f4a261', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '5px', marginRight: '5px' };
const deleteButton = { background: '#e63946', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '5px' };
const updateButton = { background: '#2a9d8f', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '5px', marginTop: '10px' };
const addButton = { background: '#00509d', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '5px', marginTop: '10px' };
const buttonStyle = { marginTop: '15px', display: 'inline-block', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', textDecoration: 'none', fontWeight: 'bold' };

	
