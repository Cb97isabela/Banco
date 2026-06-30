function Frauds() {
  return (
    <section className="dashboard-page">
      <div className="page-header">
        <h2>Posibles Fraudes</h2>
        <p>
          Aquí se visualizarán todas las transacciones clasificadas como
          Pendiente de Validación o Bloqueada por el modelo de IA.
        </p>
      </div>

      <div className="dashboard-panel">
        <div className="empty-table">
          <strong>No existen alertas de fraude.</strong>

          <span>
            Cuando el backend en Python detecte operaciones sospechosas,
            aparecerán automáticamente aquí.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Frauds;