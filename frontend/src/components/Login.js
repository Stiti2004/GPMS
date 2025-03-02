
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!username || !password || !role) {
            setError('Please fill in all fields.');
            return;
        }
    
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Redirect based on user role
                switch (role) {
                    case 'administrator':
                        navigate('/login/admin');
                        break;
                    case 'government_monitor':
                        navigate('/login/government_monitor');
                        break;
                    case 'citizen':
                        navigate('/login/citizen');
                        break;
                    case 'employee':
                        navigate('/login/employee');
                        break;
                    default:
                        navigate('/login'); // Default case
                }
            } else {
                setError(data.error || 'Incorrect username, password, or role.');
            }
        } catch (error) {
            setError('Error connecting to server. Please try again later.');
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Home</button>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '400px' }}>
                <h2 style={{ color: '#203a43', fontWeight: 'bold', marginBottom: '15px' }}>Login</h2>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
                <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
                    <option value="" disabled>Select Role</option>
                    <option value="administrator">Administrator</option>
                    <option value="government_monitor">Government Monitor</option>
                    <option value="citizen">Citizen</option>
                    <option value="employee">Employee</option>
                </select>
                <button onClick={handleLogin} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#e63946', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>Login 🔐</button>
                <p style={{ fontSize: '14px', color: '#333' }}>Don't have an account? <span style={{ color: '#e63946', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/register')}>Register</span></p>
            </motion.div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd'
};

