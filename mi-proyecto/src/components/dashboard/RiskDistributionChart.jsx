import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function RiskDistributionChart() {
  const data = [
    { name: "Aprobadas", value: 0, color: "#22c55e" },
    { name: "Pendientes", value: 0, color: "#f59e0b" },
    { name: "Bloqueadas", value: 0, color: "#ef4444" },
  ];

  return (
    <div className="dashboard-panel">
      <h3>Distribución de Riesgo</h3>
      <p>Clasificación de transacciones evaluadas por el modelo IA.</p>

      <div className="empty-chart">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={85}
              dataKey="value"
              label
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <span className="empty-message">
          Sin datos todavía. Se actualizará cuando existan transacciones.
        </span>
      </div>
    </div>
  );
}

export default RiskDistributionChart;