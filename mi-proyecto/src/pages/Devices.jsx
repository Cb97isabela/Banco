function Devices() {
  return (
    <section className="dashboard-page">
      <div className="page-header">
        <h2>Dispositivos y Accesos</h2>

        <p>
          Información de los dispositivos utilizados por los socios para acceder
          a los canales digitales.
        </p>
      </div>

      <div className="dashboard-panel">
        <div className="empty-table">
          <strong>No existen dispositivos registrados.</strong>

          <span>
            Cuando el backend envíe información, aquí se visualizarán los
            dispositivos, direcciones IP, ubicación y últimos accesos.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Devices;