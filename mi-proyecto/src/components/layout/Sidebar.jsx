import { NavLink } from "react-router-dom";

import {
  FaShieldAlt,
  FaHome,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaDesktop,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <FaShieldAlt className="logo-icon" />
        <div>
          <h2>CoopSecure</h2>
          <span>AI Fraud Detection</span>
        </div>
      </div>

      <nav>
        <NavLink to="/dashboard">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/transactions">
          <FaExchangeAlt />
          Transacciones
        </NavLink>

        <NavLink to="/frauds">
          <FaExclamationTriangle />
          Posibles Fraudes
        </NavLink>

        <NavLink to="/devices">
          <FaDesktop />
          Dispositivos
        </NavLink>

        <NavLink to="/reports">
          <FaChartBar />
          Reportes
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;