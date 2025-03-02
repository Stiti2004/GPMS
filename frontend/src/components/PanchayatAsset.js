import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AssetsManagement() {
    const [assets, setAssets] = useState([]);
    const [newAsset, setNewAsset] = useState({ asset_name: '', asset_location: '', asset_type: '', installation_date: '' });
    const [editingAsset, setEditingAsset] = useState(null);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await fetch('/api/assets');
            const data = await response.json();
            setAssets(data);
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await fetch(`/api/assets/${id}`, { method: 'DELETE' });
                fetchAssets();
            } catch (error) {
                console.error('Error deleting asset:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('/api/assets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAsset)
            });
            setNewAsset({ asset_name: '', asset_location: '', asset_type: '', installation_date: '' });
            fetchAssets();
        } catch (error) {
            console.error('Error adding asset:', error);
        }
    };

    const handleEdit = (asset) => {
        setEditingAsset(asset);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`/api/assets/${editingAsset.asset_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingAsset)
            });
            setEditingAsset(null);
            fetchAssets();
        } catch (error) {
            console.error('Error updating asset:', error);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
            <h2 style={{ color: '#1e3c72' }}>Manage Assets</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#00509d', color: 'white' }}>
                        <th>Asset Name</th>
                        <th>Asset Location</th>
                        <th>Asset Type</th>
                        <th>Installation Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.asset_id}>
                            <td>{asset.asset_name}</td>
                            <td>{asset.asset_location}</td>
                            <td>{asset.asset_type}</td>
                            <td>{asset.installation_date}</td>
                            <td>
                                <button onClick={() => handleEdit(asset)} style={editButton}>✏ Edit</button>
                                <button onClick={() => handleDelete(asset.asset_id)} style={deleteButton}>🗑 Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingAsset ? (
                <div>
                    <h3>Edit Asset</h3>
                    <input type="text" placeholder="Asset Name" value={editingAsset.asset_name} onChange={(e) => setEditingAsset({ ...editingAsset, asset_name: e.target.value })} />
                    <input type="text" placeholder="Asset Location" value={editingAsset.asset_location} onChange={(e) => setEditingAsset({ ...editingAsset, asset_location: e.target.value })} />
                    <input type="text" placeholder="Asset Type" value={editingAsset.asset_type} onChange={(e) => setEditingAsset({ ...editingAsset, asset_type: e.target.value })} />
                    <input type="date" value={editingAsset.installation_date} onChange={(e) => setEditingAsset({ ...editingAsset, installation_date: e.target.value })} />
                    <button onClick={handleUpdate} style={updateButton}>Update</button>
                </div>
            ) : (
                <div>
                    <h3>Add Asset</h3>
                    <input type="text" placeholder="Asset Name" value={newAsset.asset_name} onChange={(e) => setNewAsset({ ...newAsset, asset_name: e.target.value })} />
                    <input type="text" placeholder="Asset Location" value={newAsset.asset_location} onChange={(e) => setNewAsset({ ...newAsset, asset_location: e.target.value })} />
                    <input type="text" placeholder="Asset Type" value={newAsset.asset_type} onChange={(e) => setNewAsset({ ...newAsset, asset_type: e.target.value })} />
                    <input type="date" value={newAsset.installation_date} onChange={(e) => setNewAsset({ ...newAsset, installation_date: e.target.value })} />
                    <button onClick={handleAdd} style={addButton}>Add</button>
                </div>
            )}
            <Link to="/login/employee" style={buttonStyle}>⬅ Back to Dashboard</Link>
        </div>
    );
}

const editButton = { background: '#f4a261', color: 'white', padding: '8px', cursor: 'pointer', borderRadius: '5px', marginRight: '5px' };
const deleteButton = { background: '#e63946', color: 'white', padding: '8px', cursor: 'pointer', borderRadius: '5px' };
const updateButton = { background: '#2a9d8f', color: 'white', padding: '8px', cursor: 'pointer', borderRadius: '5px', marginTop: '10px' };
const addButton = { background: '#00509d', color: 'white', padding: '8px', cursor: 'pointer', borderRadius: '5px', marginTop: '10px' };
const buttonStyle = { marginTop: '15px', display: 'inline-block', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', textDecoration: 'none', fontWeight: 'bold' };

	
