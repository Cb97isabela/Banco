import { useContext } from "react";

import MetricCard from "../components/dashboard/MetricCard";
import RiskDistributionChart from "../components/dashboard/RiskDistributionChart";
import ChannelUsageChart from "../components/dashboard/ChannelUsageChart";
import RecentTransactionsTable from "../components/dashboard/RecentTransactionsTable";
import { TransactionContext } from "../context/TransactionContext";

function Dashboard() {
  const { transactions } = useContext(TransactionContext);

  const obtenerClase = (item) => {
    return (
      item?.resultado?.datos?.resultado_ia?.clase_final ||
      item?.resultado?.clase_final ||
      ""
    ).toLowerCase();
  };

  const aprobadas = transactions.filter((item) =>
    obtenerClase(item).includes("aprob")
  ).length;

  const pendientes = transactions.filter((item) =>
    obtenerClase(item).includes("pend")
  ).length;

  const bloqueadas = transactions.filter((item) =>
    obtenerClase(item).includes("bloq")
  ).length;

  return (
    <section className="dashboard-page">
      <div className="dashboard-cards">
        <MetricCard titulo="Transacciones analizadas" valor={transactions.length} />
        <MetricCard titulo="Aprobadas" valor={aprobadas} color="success" />
        <MetricCard titulo="Pendientes" valor={pendientes} color="warning" />
        <MetricCard titulo="Bloqueadas" valor={bloqueadas} color="danger" />
      </div>

      <div className="dashboard-grid">
        <RiskDistributionChart
          aprobadas={aprobadas}
          pendientes={pendientes}
          bloqueadas={bloqueadas}
        />

        <ChannelUsageChart transactions={transactions} />
      </div>

      <RecentTransactionsTable transactions={transactions} />
    </section>
  );
}

export default Dashboard;