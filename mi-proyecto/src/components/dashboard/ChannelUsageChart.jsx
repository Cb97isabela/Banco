import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChannelUsageChart() {
  const data = [
    { canal: "Banca móvil", total: 0 },
    { canal: "Banca web", total: 0 },
    { canal: "Cajero", total: 0 },
    { canal: "Agencia", total: 0 },
  ];

  return (
    <div className="dashboard-panel">
      <h3>Transacciones por Canal</h3>
      <p>Canales digitales utilizados por los socios.</p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="canal" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <span className="empty-message">
        Sin datos todavía. Se actualizará desde el backend en Python.
      </span>
    </div>
  );
}

export default ChannelUsageChart;