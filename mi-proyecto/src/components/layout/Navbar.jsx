import { useLocation } from "react-router-dom";
import { FaBell, FaUserCircle, FaCircle } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const pages = {
    "/dashboard": {
      title: "Dashboard General",
      subtitle: "Monitoreo en tiempo real del sistema de detección de fraude",
    },
    "/transactions": {
      title: "Nueva Transacción",
      subtitle: "Simulación y evaluación mediante Inteligencia Artificial",
    },
    "/frauds": {
      title: "Posibles Fraudes",
      subtitle: "Operaciones detectadas con comportamiento sospechoso",
    },
    "/devices": {
      title: "Dispositivos y Accesos",
      subtitle: "Control de dispositivos, IP y ubicaciones",
    },
    "/reports": {
      title: "Reportes",
      subtitle: "Estadísticas e indicadores del sistema",
    },
  };

  const current =
    pages[location.pathname] || {
      title: "Sistema",
      subtitle: "",
    };

  const fecha = new Date().toLocaleDateString("es-EC", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="navbar">
      <div>
        <h1>{current.title}</h1>

        <p>{current.subtitle}</p>

        <small>{fecha}</small>
      </div>

      <div className="navbar-right">
        <div className="system-status">
          <FaCircle />
          <span>Sistema Activo</span>
        </div>

        <button className="notification">
          <FaBell />
        </button>

        <div className="user">
          <FaUserCircle />
          <span>Administrador</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;