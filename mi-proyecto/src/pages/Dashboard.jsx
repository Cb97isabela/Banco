import MetricCard from "../components/dashboard/MetricCard";
import RiskDistributionChart from "../components/dashboard/RiskDistributionChart";
import ChannelUsageChart from "../components/dashboard/ChannelUsageChart";
import RecentTransactionsTable from "../components/dashboard/RecentTransactionsTable";

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

      <div className="dashboard-grid">
        <RiskDistributionChart />
        <ChannelUsageChart />
      </div>

      <RecentTransactionsTable />
    </section>
  );
}

export default Dashboard;