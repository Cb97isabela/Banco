function Frauds() {
  return (
    <section className="dashboard-page">

      <div className="dashboard-panel">

        <div className="empty-state">

          <h2>No existen alertas de fraude</h2>

          <p>
            Cuando el backend en Python detecte operaciones sospechosas,
            aquí aparecerán automáticamente todas las transacciones
            clasificadas como <strong>Pendiente de Validación</strong> o
            <strong> Bloqueada</strong>.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Frauds;