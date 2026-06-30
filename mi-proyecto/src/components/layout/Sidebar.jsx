import { NavLink } from "react-router-dom";

import {
  FaShieldAlt,
  FaHome,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaDesktop,
  FaChartBar,
  FaCircle,
  FaServer,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="logo">
        <FaShieldAlt className="logo-icon" />

        <div>
          <h2>CoopSecure</h2>
          <span>AI Fraud Detection</span>
        </div>
      </div>

      {/* Menú */}

      <nav>

        <NavLink to="/dashboard">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transactions">
          <FaExchangeAlt />
          <span>Transacciones</span>
        </NavLink>

        <NavLink to="/frauds">
          <FaExclamationTriangle />
          <span>Posibles Fraudes</span>
        </NavLink>

        <NavLink to="/devices">
          <FaDesktop />
          <span>Dispositivos</span>
        </NavLink>

        <NavLink to="/reports">
          <FaChartBar />
          <span>Reportes</span>
        </NavLink>

      </nav>

      

      
    </aside>
  );
}

export default Sidebar;