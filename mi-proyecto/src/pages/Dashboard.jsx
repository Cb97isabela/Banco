import MetricCard from "../components/dashboard/MetricCard";

function Dashboard() {
  const dashboardData = {
    transacciones: 0,
    aprobadas: 0,
    pendientes: 0,
    bloqueadas: 0,
  };

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <h2>Dashboard General</h2>
        <p>
          Resumen de transacciones analizadas, estados de riesgo y actividad del sistema.
        </p>
      </div>

      <div className="dashboard-cards">
        <MetricCard titulo="Transacciones analizadas" valor={dashboardData.transacciones} />
        <MetricCard titulo="Aprobadas" valor={dashboardData.aprobadas} color="success" />
        <MetricCard titulo="Pendientes" valor={dashboardData.pendientes} color="warning" />
        <MetricCard titulo="Bloqueadas" valor={dashboardData.bloqueadas} color="danger" />
      </div>
    </section>
  );
}

export default Dashboard;