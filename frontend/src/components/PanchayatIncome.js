import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PanchayatIncome() {
    const [incomeRecords, setIncomeRecords] = useState([]);
    const [newIncome, setNewIncome] = useState({ source: '', amount: '' });
    const [editingIncome, setEditingIncome] = useState(null);

    useEffect(() => {
        fetchIncomeData();
    }, []);

    const fetchIncomeData = async () => {
        try {
            const response = await fetch('/api/panchayat-income');
            const data = await response.json();
            setIncomeRecords(data);
        } catch (error) {
            console.error('Error fetching income data:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await fetch(`/api/panchayat-income/${id}`, { method: 'DELETE' });
                fetchIncomeData();
            } catch (error) {
                console.error('Error deleting income record:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/panchayat-income', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIncome)
            });
            setNewIncome({ source: '', amount: '' });
            fetchIncomeData();
        } catch (error) {
            console.error('Error adding income record:', error);
        }
    };

    const handleEdit = (income) => {
        setEditingIncome(income);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/panchayat-income/${editingIncome.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingIncome)
            });
            setEditingIncome(null);
            fetchIncomeData();
        } catch (error) {
            console.error('Error updating income record:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
                <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Panchayat Income Records</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#00509d', color: 'white' }}>
                            <th style={tableHeader}>Source</th>
                            <th style={tableHeader}>Amount (₹)</th>
                            <th style={tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeRecords.map((income) => (
                            <tr key={income.id} style={{ background: '#f9f9f9' }}>
                                <td style={tableCell}>{income.source}</td>
                                <td style={tableCell}>₹{income.amount}</td>
                                <td style={tableCell}>
                                    <button onClick={() => handleEdit(income)} style={editButton}>✏ Edit</button>
                                    <button onClick={() => handleDelete(income.id)} style={deleteButton}>🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingIncome ? (
                    <div>
                        <h3>Edit Income Record</h3>
                        <input type="text" placeholder="Source" value={editingIncome.source} onChange={(e) => setEditingIncome({ ...editingIncome, source: e.target.value })} />
                        <input type="number" placeholder="Amount" value={editingIncome.amount} onChange={(e) => setEditingIncome({ ...editingIncome, amount: e.target.value })} />
                        <button onClick={handleUpdate} style={updateButton}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>Add Income Record</h3>
                        <input type="text" placeholder="Source" value={newIncome.source} onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })} />
                        <input type="number" placeholder="Amount" value={newIncome.amount} onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })} />
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
	
