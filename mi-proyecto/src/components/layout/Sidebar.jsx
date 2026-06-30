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

        <a href="#" className="active">
          <FaHome />
          Dashboard
        </a>

        <a href="#">
          <FaExchangeAlt />
          Transacciones
        </a>

        <a href="#">
          <FaExclamationTriangle />
          Posibles Fraudes
        </a>

        <a href="#">
          <FaDesktop />
          Dispositivos
        </a>

        <a href="#">
          <FaChartBar />
          Reportes
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;