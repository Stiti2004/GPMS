import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function VaccinationPage() {
    const [vaccinations, setVaccinations] = useState([]);

    useEffect(() => {
        fetch("/api/vaccinations")
            .then(response => response.json())
            .then(data => setVaccinations(data))
            .catch(error => console.error("Error fetching vaccinations:", error));
    }, []);

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>💉 Vaccination Records</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Vaccine Type</th>
                        <th>Date Administered</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccinations.map((vaccine, index) => (
                        <tr key={index}>
                            <td>{vaccine.vaccine_type}</td>
                            <td>{vaccine.date_administered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <NavigationButtons />
        </div>
    );
}

const NavigationButtons = () => (
    <div style={buttonContainer}>
        <Link to="/login/citizen" style={buttonStyle}>⬅ Back to Dashboard</Link>
        <Link to="/" style={logoutButtonStyle}>🚪 Logout</Link>
    </div>
);

// Styles
const containerStyle = { textAlign: "center", fontFamily: "Poppins, sans-serif", padding: "20px" };
const headingStyle = { color: "#1e3c72", fontWeight: "bold", marginBottom: "15px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginBottom: "20px" };
const buttonContainer = { display: "flex", justifyContent: "space-between", marginTop: "20px" };
const buttonStyle = { padding: "10px", borderRadius: "8px", background: "#00509d", color: "white", textDecoration: "none", fontWeight: "bold" };
const logoutButtonStyle = { ...buttonStyle, background: "#e63946" };

