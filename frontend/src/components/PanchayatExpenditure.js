import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ExpendituresManagement() {
    const [expenditures, setExpenditures] = useState([]);
    const [newExpenditure, setNewExpenditure] = useState({ category: '', amount: '', date: '' });
    const [editingExpenditure, setEditingExpenditure] = useState(null);

    useEffect(() => {
        fetchExpenditures();
    }, []);

    const fetchExpenditures = async () => {
        try {
            const response = await fetch('/api/expenditures');
            const data = await response.json();
            setExpenditures(data);
        } catch (error) {
            console.error('Error fetching expenditures:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expenditure?')) {
            try {
                await fetch(`/api/expenditures/${id}`, { method: 'DELETE' });
                fetchExpenditures();
            } catch (error) {
                console.error('Error deleting expenditure:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/expenditures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExpenditure)
            });
            setNewExpenditure({ category: '', amount: '', date: '' });
            fetchExpenditures();
        } catch (error) {
            console.error('Error adding expenditure:', error);
        }
    };

    const handleEdit = (expenditure) => {
        setEditingExpenditure(expenditure);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/expenditures/${editingExpenditure.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingExpenditure)
            });
            setEditingExpenditure(null);
            fetchExpenditures();
        } catch (error) {
            console.error('Error updating expenditure:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
                <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Expenditures Management</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#00509d', color: 'white' }}>
                            <th style={tableHeader}>Category</th>
                            <th style={tableHeader}>Amount</th>
                            <th style={tableHeader}>Date</th>
                            <th style={tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenditures.map((expenditure) => (
                            <tr key={expenditure.id} style={{ background: '#f9f9f9' }}>
                                <td style={tableCell}>{expenditure.category}</td>
                                <td style={tableCell}>₹{expenditure.amount}</td>
                                <td style={tableCell}>{expenditure.date}</td>
                                <td style={tableCell}>
                                    <button onClick={() => handleEdit(expenditure)} style={editButton}>✏ Edit</button>
                                    <button onClick={() => handleDelete(expenditure.id)} style={deleteButton}>🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingExpenditure ? (
                    <div>
                        <h3>Edit Expenditure</h3>
                        <input type="text" placeholder="Category" value={editingExpenditure.category} onChange={(e) => setEditingExpenditure({ ...editingExpenditure, category: e.target.value })} />
                        <input type="number" placeholder="Amount" value={editingExpenditure.amount} onChange={(e) => setEditingExpenditure({ ...editingExpenditure, amount: e.target.value })} />
                        <input type="date" value={editingExpenditure.date} onChange={(e) => setEditingExpenditure({ ...editingExpenditure, date: e.target.value })} />
                        <button onClick={handleUpdate} style={updateButton}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>Add Expenditure</h3>
                        <input type="text" placeholder="Category" value={newExpenditure.category} onChange={(e) => setNewExpenditure({ ...newExpenditure, category: e.target.value })} />
                        <input type="number" placeholder="Amount" value={newExpenditure.amount} onChange={(e) => setNewExpenditure({ ...newExpenditure, amount: e.target.value })} />
                        <input type="date" value={newExpenditure.date} onChange={(e) => setNewExpenditure({ ...newExpenditure, date: e.target.value })} />
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

	
