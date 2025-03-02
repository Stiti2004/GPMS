
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <motion.img
                src="/images/gram_panchayat.jpg"
                alt="Gram Panchayat"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ width: '50%', maxWidth: '500px', borderRadius: '20px', marginBottom: '20px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)' }}
            />
            <h1 style={{ color: '#00509d', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to Gram Panchayat</h1>
            <p style={{ color: '#333', fontSize: '1.1rem', marginBottom: '20px', maxWidth: '600px' }}>
                Empowering Rural Development and Strengthening Local Governance
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <button 
                    onClick={() => navigate("/login")} 
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    style={{ margin: '10px', padding: '15px 30px', borderRadius: '12px', background: '#e63946', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', transition: '0.3s' }}
                >
                    Login 🔐
                </button>
                <button 
                    onClick={() => navigate("/register")} 
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    style={{ margin: '10px', padding: '15px 30px', borderRadius: '12px', background: '#ffcc29', color: '#333', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', transition: '0.3s' }}
                >
                    Register 📝
                </button>
            </motion.div>
            <div style={{ marginTop: '20px', width: '80%', overflow: 'hidden', borderRadius: '8px', background: '#fff', padding: '15px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}>
                <marquee behavior="scroll" direction="left" style={{ fontSize: '16px', color: '#00509d', fontWeight: 'bold' }}>
                    📰 Latest Updates: Gram Panchayat meeting scheduled for next Monday | New health camp organized in the village | Subsidies available for farmers 🌾 | Road construction project approved 🚜
                </marquee>
            </div>
        </div>
    );
}
