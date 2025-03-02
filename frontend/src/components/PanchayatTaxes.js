import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TaxesManagement() {
    const [taxes, setTaxes] = useState([]);
    const [newTax, setNewTax] = useState({ citizen_name: '', tax_type: '', tax_amount: '', collection_date: '' });
    const [editingTax, setEditingTax] = useState(null);

    useEffect(() => {
        fetchTaxes();
    }, []);

    const fetchTaxes = async () => {
        try {
            const response = await fetch('/api/taxes');
            const data = await response.json();
            setTaxes(data);
        } catch (error) {
            console.error('Error fetching taxes:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tax record?')) {
            try {
                await fetch(`/api/taxes/${id}`, { method: 'DELETE' });
                fetchTaxes();
            } catch (error) {
                console.error('Error deleting tax record:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/taxes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTax)
            });
            setNewTax({ citizen_name: '', tax_type: '', tax_amount: '', collection_date: '' });
            fetchTaxes();
        } catch (error) {
            console.error('Error adding tax record:', error);
        }
    };

    const handleEdit = (tax) => {
        setEditingTax(tax);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/taxes/${editingTax.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingTax)
            });
            setEditingTax(null);
            fetchTaxes();
        } catch (error) {
            console.error('Error updating tax record:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '800px' }}>
                <h2 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.8rem' }}>Taxes Management</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#00509d', color: 'white' }}>
                            <th style={tableHeader}>Tax ID</th>
                            <th style={tableHeader}>Citizen Name</th>
                            <th style={tableHeader}>Tax Type</th>
                            <th style={tableHeader}>Tax Amount</th>
                            <th style={tableHeader}>Collection Date</th>
                            <th style={tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxes.map((tax) => (
                            <tr key={tax.id} style={{ background: '#f9f9f9' }}>
                                <td style={tableCell}>{tax.id}</td>
                                <td style={tableCell}>{tax.citizen_name}</td>
                                <td style={tableCell}>{tax.tax_type}</td>
                                <td style={tableCell}>₹{tax.tax_amount}</td>
                                <td style={tableCell}>{tax.collection_date}</td>
                                <td style={tableCell}>
                                    <button onClick={() => handleEdit(tax)} style={editButton}>✏ Edit</button>
                                    <button onClick={() => handleDelete(tax.id)} style={deleteButton}>🗑 Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingTax ? (
                    <div>
                        <h3>Edit Tax Record</h3>
                        <input type="text" placeholder="Citizen Name" value={editingTax.citizen_name} onChange={(e) => setEditingTax({ ...editingTax, citizen_name: e.target.value })} />
                        <input type="text" placeholder="Tax Type" value={editingTax.tax_type} onChange={(e) => setEditingTax({ ...editingTax, tax_type: e.target.value })} />
                        <input type="number" placeholder="Tax Amount" value={editingTax.tax_amount} onChange={(e) => setEditingTax({ ...editingTax, tax_amount: e.target.value })} />
                        <input type="date" value={editingTax.collection_date} onChange={(e) => setEditingTax({ ...editingTax, collection_date: e.target.value })} />
                        <button onClick={handleUpdate} style={updateButton}>Update</button>
                    </div>
                ) : (
                    <div>
                        <h3>Add Tax Record</h3>
                        <input type="text" placeholder="Citizen Name" value={newTax.citizen_name} onChange={(e) => setNewTax({ ...newTax, citizen_name: e.target.value })} />
                        <input type="text" placeholder="Tax Type" value={newTax.tax_type} onChange={(e) => setNewTax({ ...newTax, tax_type: e.target.value })} />
                        <input type="number" placeholder="Tax Amount" value={newTax.tax_amount} onChange={(e) => setNewTax({ ...newTax, tax_amount: e.target.value })} />
                        <input type="date" value={newTax.collection_date} onChange={(e) => setNewTax({ ...newTax, collection_date: e.target.value })} />
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

	
