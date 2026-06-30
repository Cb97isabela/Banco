function RiskResultCard({ result }) {
  if (!result) {
    return (
      <section className="risk-card empty-risk">
        <h2>Resultado IA</h2>
        <p>
          Aquí se mostrará la clasificación, el puntaje de riesgo y la explicación
          del modelo cuando se analice una transacción.
        </p>
      </section>
    );
  }

  const ia = result.datos.resultado_ia;

  return (
    <section className={`risk-card ${ia.riesgo_calculado}`}>
      <h2>Resultado IA</h2>

      <div className="risk-status">
        <span>Clasificación</span>
        <h3>{ia.clase_final}</h3>
      </div>

      <div className="risk-score">
        <span>Puntaje de riesgo</span>
        <h1>{ia.puntaje_riesgo}/100</h1>

        <div className="risk-bar">
          <div
            className="risk-bar-fill"
            style={{ width: `${ia.puntaje_riesgo}%` }}
          ></div>
        </div>
      </div>

      <div className="risk-info">
        <span>Nivel calculado</span>
        <strong>{ia.riesgo_calculado.toUpperCase()}</strong>
      </div>

      <div className="risk-explanation">
        <span>Explicación</span>
        <p>{ia.explicacion}</p>
      </div>

      <div className="risk-footer">
        <p>ID: {result.datos.id_transaccion}</p>
        <p>Evaluado: {result.datos.evaluado_en}</p>
      </div>
    </section>
  );
}

export default RiskResultCard;