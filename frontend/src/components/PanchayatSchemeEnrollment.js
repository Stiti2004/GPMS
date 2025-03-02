import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SchemeEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [newEnrollment, setNewEnrollment] = useState({ citizen_name: '', scheme_name: '', enrollment_date: '' });
    const [editingEnrollment, setEditingEnrollment] = useState(null);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await fetch('/api/scheme-enrollments');
            const data = await response.json();
            setEnrollments(data);
        } catch (error) {
            console.error('Error fetching scheme enrollments:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enrollment?')) {
            try {
                await fetch(`/api/scheme-enrollments/${id}`, { method: 'DELETE' });
                fetchEnrollments();
            } catch (error) {
                console.error('Error deleting enrollment:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/scheme-enrollments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEnrollment)
            });
            setNewEnrollment({ citizen_name: '', scheme_name: '', enrollment_date: '' });
            fetchEnrollments();
        } catch (error) {
            console.error('Error adding enrollment:', error);
        }
    };

    const handleEdit = (enrollment) => {
        setEditingEnrollment(enrollment);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/scheme-enrollments/${editingEnrollment.enrollment_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingEnrollment)
            });
            setEditingEnrollment(null);
            fetchEnrollments();
        } catch (error) {
            console.error('Error updating enrollment:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
                <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Scheme Enrollments</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#00509d', color: 'white' }}>
                            <th style={tableHeader}>Enrollment ID</th>
                            <th style={tableHeader}>Citizen Name</th>
                            <th style={tableHeader}>Scheme Name</th>
                            <th style={tableHeader}>Enrollment Date</th>
                            <th style={tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment) => (
                            <tr key={enrollment.enrollment_id} style={{ background: '#f9f9f9' }}>
                                <td style={tableCell}>{enrollment.enrollment_id}</td>
                                <td style={tableCell}>{enrollment.citizen_name}</td>
                                <td style={tableCell}>{enrollment.scheme_name}</td>
                                <td style={tableCell}>{enrollment.enrollment_date}</td>
                                <td style={tableCell}>
                                    <button onClick={() => handleEdit(enrollment)} style={editButton}>✏ Edit</button>
                                    <button onClick={() => handleDelete(enrollment.enrollment_id)} style={deleteButton}>🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingEnrollment ? (
                    <div>
                        <h3>Edit Enrollment</h3>
                        <input type="text" placeholder="Citizen Name" value={editingEnrollment.citizen_name} onChange={(e) => setEditingEnrollment({ ...editingEnrollment, citizen_name: e.target.value })} />
                        <input type="text" placeholder="Scheme Name" value={editingEnrollment.scheme_name} onChange={(e) => setEditingEnrollment({ ...editingEnrollment, scheme_name: e.target.value })} />
                        <input type="date" value={editingEnrollment.enrollment_date} onChange={(e) => setEditingEnrollment({ ...editingEnrollment, enrollment_date: e.target.value })} />
                        <button onClick={handleUpdate} style={updateButton}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>Add Enrollment</h3>
                        <input type="text" placeholder="Citizen Name" value={newEnrollment.citizen_name} onChange={(e) => setNewEnrollment({ ...newEnrollment, citizen_name: e.target.value })} />
                        <input type="text" placeholder="Scheme Name" value={newEnrollment.scheme_name} onChange={(e) => setNewEnrollment({ ...newEnrollment, scheme_name: e.target.value })} />
                        <input type="date" value={newEnrollment.enrollment_date} onChange={(e) => setNewEnrollment({ ...newEnrollment, enrollment_date: e.target.value })} />
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


	
