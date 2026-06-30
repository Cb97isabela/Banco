function Reports() {
  return (
    <section className="dashboard-page">

      <div className="dashboard-panel">

        <div className="empty-state">

          <h2>No existen reportes generados</h2>

          <p>
            Cuando el backend en Python genere información, aquí se mostrarán
            los reportes del sistema, incluyendo estadísticas de fraude,
            exportación en PDF, Excel e historial de evaluaciones realizadas.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Reports;