// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Home from "./components/Home";
// // import Register from "./components/Register";
// // import Login from "./components/Login";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import RegisterPage from "./components/RegisterPage";
// import Login from "./components/Login";
// import CitizenRegister from "./components/CitizenRegister";
// import PanchayatRegister from "./components/PanchayatRegister";
// import AdminRegister from "./components/AdminRegister";
// import GovernmentMonitorRegister from "./components/GovernmentMonitorRegister";
// import CitizenLogin from "./components/CitizenLogin";
// import PanchayatLogin from "./components/PanchayatLogin";
// import AdminLogin from "./components/AdminLogin";
// import GovernmentMonitorLogin from "./components/GovernmentMonitorLogin";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<RegisterPage />} />
        
//         {/* Role-based Registration Routes */}
//         <Route path="/register/administrator" element={<AdminRegister />} />
//         <Route path="/register/government_monitor" element={<GovernmentMonitorRegister />} />
//         <Route path="/register/citizen" element={<CitizenRegister />} />
        
//         {/* Panchayat Employee Flow */}
//         <Route path="/register/employee" element={<PanchayatRegister />} />
//         <Route path="/login/administrator" element={<AdminLogin />} />
//         <Route path="/login/government_monitor" element={<GovernmentMonitorLogin />} />
//         <Route path="/login/citizen" element={<CitizenLogin />} />
        
//         {/* Panchayat Employee Flow */}
//         <Route path="/login/employee" element={<PanchayatLogin />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";
import Login from "./components/Login";

// Citizen Components
import CitizenRegister from "./components/CitizenRegister";
import CitizenLogin from "./components/CitizenLogin";
import CitizenProfile from "./components/CitizenProfile";
import CitizenSchemePage from "./components/CitizenSchemePage";
import CitizenTaxes from "./components/CitizenTaxes";
import CitizenVaccination from "./components/CitizenVaccination";
import CitizenLandRecords from "./components/CitizenLandRecords";

// Panchayat Employee Components
import PanchayatRegister from "./components/PanchayatRegister";
import PanchayatLogin from "./components/PanchayatLogin";
import PanchayatProfile from "./components/PanchayatProfile";
import PanchayatSchemePage from "./components/PanchayatSchemePage";
import PanchayatSchemeEnrollment from "./components/PanchayatSchemeEnrollment";
import PanchayatTaxes from "./components/PanchayatTaxes";
import PanchayatVaccinations from "./components/PanchayatVaccinations";
import PanchayatIncome from "./components/PanchayatIncome";
import PanchayatCensusData from "./components/PanchayatCensusData";
import PanchayatAsset from "./components/PanchayatAsset";
import PanchayatExpenditure from "./components/PanchayatExpenditure";
import PanchayatAgriData from "./components/PanchayatAgriData";
import PanchayatEnviData from "./components/PanchayatEnviData";

// Administrator Components
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";

// Government Monitor Components
import GovernmentMonitorRegister from "./components/GovernmentMonitorRegister";
import GovernmentMonitorLogin from "./components/GovernmentMonitorLogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Citizen Routes */}
        <Route path="/register/citizen" element={<CitizenRegister />} />
        <Route path="/login/citizen" element={<CitizenLogin />} />
        <Route path="/profile/citizen" element={<CitizenProfile />} />
        <Route path="/citizen/schemes/:schemeType" element={<CitizenSchemePage />} />
        <Route path="/citizen/taxes" element={<CitizenTaxes />} />
        <Route path="/citizen/vaccinations" element={<CitizenVaccination />} />
        <Route path="/citizen/landrecords" element={<CitizenLandRecords />} />

        {/* Panchayat Employee Routes */}
        <Route path="/register/employee" element={<PanchayatRegister />} />
        <Route path="/login/employee" element={<PanchayatLogin />} />
        <Route path="/profile/employee" element={<PanchayatProfile />} />
        <Route path="/panchayat/schemes/:schemeType" element={<PanchayatSchemePage />} />
        <Route path="/panchayat/scheme-enrollments" element={<PanchayatSchemeEnrollment />} />
        <Route path="/panchayat/taxes" element={<PanchayatTaxes />} />
        <Route path="/panchayat/vaccinations" element={<PanchayatVaccinations />} />
        <Route path="/panchayat/income" element={<PanchayatIncome />} />
        <Route path="/panchayat/census" element={<PanchayatCensusData />} />
        <Route path="/panchayat/assets" element={<PanchayatAsset />} />
        <Route path="/panchayat/expenditures" element={<PanchayatExpenditure />} />
        
        <Route path="/panchayat/envidata" element={<PanchayatEnviData />} />        

        {/* Administrator Routes */}
        <Route path="/register/administrator" element={<AdminRegister />} />
        <Route path="/login/administrator" element={<AdminLogin />} />

        {/* Government Monitor Routes */}
        <Route path="/register/government_monitor" element={<GovernmentMonitorRegister />} />
        <Route path="/login/government_monitor" element={<GovernmentMonitorLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

