import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PanchayatEnviData() {
    const [enviData, setEnviData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnviData();
    }, []);

    const fetchEnviData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/environment'); // API endpoint to fetch environmental data
            const data = await response.json();
            setEnviData(data);
        } catch (error) {
            console.error('Error fetching environmental data:', error);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#1e3c72', textAlign: 'center' }}>Panchayat Environmental Data</h2>

            <div style={headerStyle}>
                <h3 style={{ color: '#333' }}>Environmental Report</h3>
                <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </div>

            {loading ? (
                <p>Loading environmental data...</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Number of Schemes</th>
                            <th>Air Quality Index (AQI)</th>
                            <th>Water Quality Index (WQI)</th>
                            <th>Waste Management Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{enviData.num_of_schemes}</td>
                            <td>{enviData.air_quality_index}</td>
                            <td>{enviData.water_quality_index}</td>
                            <td>{enviData.waste_management_index}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <Link to="/panchayat/dashboard" style={backButtonStyle}>⬅ Back to Dashboard</Link>
        </div>
    );
}

// Styles
const containerStyle = {
    padding: '20px',
    fontFamily: 'Poppins, sans-serif',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
};

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

;
