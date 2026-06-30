import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">

      <div>
        <h1>Panel de Monitoreo</h1>
        <p>Sistema Inteligente de Detección de Fraudes</p>
      </div>

      <div className="navbar-right">

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