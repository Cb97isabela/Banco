function Reports() {
  return (
    <section className="dashboard-page">
      <div className="page-header">
        <h2>Reportes</h2>

        <p>
          Reportes estadísticos y exportación de resultados del sistema de
          detección de fraude.
        </p>
      </div>

      <div className="dashboard-panel">
        <div className="empty-table">
          <strong>No existen reportes generados.</strong>

          <span>
            El backend permitirá generar reportes PDF, Excel y estadísticas del
            comportamiento transaccional.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Reports;