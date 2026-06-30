function MetricCard({ titulo, valor, color }) {
  return (
    <div className={`metric-card ${color}`}>
      <span className="metric-title">{titulo}</span>

      <h2 className="metric-value">{valor}</h2>
    </div>
  );
}

export default MetricCard;