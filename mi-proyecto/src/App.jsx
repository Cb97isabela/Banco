import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/transaction.css";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Frauds from "./pages/Frauds";
import Devices from "./pages/Devices";
import Reports from "./pages/Reports";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/transactions" element={<Transactions />} />

            <Route path="/frauds" element={<Frauds />} />

            <Route path="/devices" element={<Devices />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;