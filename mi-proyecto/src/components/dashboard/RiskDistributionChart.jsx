function RiskDistributionChart({ aprobadas = 0, pendientes = 0, bloqueadas = 0 }) {
  const total = aprobadas + pendientes + bloqueadas;

  const porcentaje = (valor) => {
    if (total === 0) return 0;
    return Math.round((valor / total) * 100);
  };

  return (
    <div className="dashboard-panel">
      <h3>Distribución de Riesgo</h3>
      <p>Clasificación de transacciones evaluadas por el modelo IA.</p>

      <div className="risk-bars">
        <div className="risk-row">
          <span>Aprobadas</span>
          <div className="bar">
            <div className="bar-fill success" style={{ width: `${porcentaje(aprobadas)}%` }} />
          </div>
          <strong>{aprobadas}</strong>
        </div>

        <div className="risk-row">
          <span>Pendientes</span>
          <div className="bar">
            <div className="bar-fill warning" style={{ width: `${porcentaje(pendientes)}%` }} />
          </div>
          <strong>{pendientes}</strong>
        </div>

        <div className="risk-row">
          <span>Bloqueadas</span>
          <div className="bar">
            <div className="bar-fill danger" style={{ width: `${porcentaje(bloqueadas)}%` }} />
          </div>
          <strong>{bloqueadas}</strong>
        </div>
      </div>

      {total === 0 && (
        <span className="empty-message">
          Sin datos todavía. Se actualizará cuando existan transacciones.
        </span>
      )}
    </div>
  );
}

export default RiskDistributionChart;