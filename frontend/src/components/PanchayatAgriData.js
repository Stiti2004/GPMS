import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PanchayatAgriData() {
    const [cropData, setCropData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCropData();
    }, []);

    const fetchCropData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/crops'); // API endpoint to fetch crop data
            const data = await response.json();
            setCropData(data);
        } catch (error) {
            console.error('Error fetching crop data:', error);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
            <h2 style={{ color: '#1e3c72', textAlign: 'center' }}>Panchayat Agriculture Data</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#333' }}>Crop Yield Report</h3>
                <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </div>

            {loading ? (
                <p>Loading crop data...</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Crop Name</th>
                            <th>Annual Yield (tons)</th>
                            <th>Total Area Under Cultivation (hectares)</th>
                            <th>Farmer Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cropData.map((crop, index) => (
                            <tr key={index}>
                                <td>{crop.crop_name}</td>
                                <td>{crop.annual_yield}</td>
                                <td>{crop.total_area_under_cultivation}</td>
                                <td>{crop.farmer_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to="/login/panchayat" style={backButtonStyle}>⬅ Back to Dashboard</Link>
        </div>
    );
}

// Styles
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    textAlign: 'left',
    border: '1px solid #ddd',
};

const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
};

const backButtonStyle = {
    display: 'block',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#ffcc29',
    color: '#333',
    textAlign: 'center',
    borderRadius: '5px',
    textDecoration: 'none',
};


