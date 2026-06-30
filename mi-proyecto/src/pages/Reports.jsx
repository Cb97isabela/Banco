import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

function Reports() {
  const { transactions } = useContext(TransactionContext);

  const total = transactions.length;

  const obtenerIA = (item) => item?.resultado?.datos?.resultado_ia || {};

  const aprobadas = transactions.filter((item) =>
    obtenerIA(item).clase_final?.toLowerCase().includes("aprob")
  ).length;

  const pendientes = transactions.filter((item) =>
    obtenerIA(item).clase_final?.toLowerCase().includes("pend")
  ).length;

  const bloqueadas = transactions.filter((item) =>
    obtenerIA(item).clase_final?.toLowerCase().includes("bloq")
  ).length;

  const promedioRiesgo =
    total === 0
      ? 0
      : Math.round(
          transactions.reduce(
            (acc, item) => acc + Number(obtenerIA(item).puntaje_riesgo || 0),
            0
          ) / total
        );

  return (
    <section className="dashboard-page">
      {total === 0 ? (
        <div className="dashboard-panel">
          <div className="empty-state">
            <h2>No existen reportes generados</h2>
            <p>
              Cuando se analicen transacciones, aquí aparecerán estadísticas,
              resumen de riesgos e historial de evaluaciones.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-cards">
            <div className="metric-card">
              <span className="metric-title">Total evaluadas</span>
              <strong className="metric-value">{total}</strong>
            </div>

            <div className="metric-card success">
              <span className="metric-title">Aprobadas</span>
              <strong className="metric-value">{aprobadas}</strong>
            </div>

            <div className="metric-card warning">
              <span className="metric-title">Pendientes</span>
              <strong className="metric-value">{pendientes}</strong>
            </div>

            <div className="metric-card danger">
              <span className="metric-title">Riesgo promedio</span>
              <strong className="metric-value">{promedioRiesgo}/100</strong>
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>Resumen del Reporte</h3>
            <p>
              Información generada con base en las transacciones evaluadas por
              el modelo de Inteligencia Artificial.
            </p>

            <div className="table-wrapper">
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Indicador</th>
                    <th>Valor</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Transacciones analizadas</td>
                    <td>{total}</td>
                  </tr>
                  <tr>
                    <td>Aprobadas</td>
                    <td>{aprobadas}</td>
                  </tr>
                  <tr>
                    <td>Pendientes</td>
                    <td>{pendientes}</td>
                  </tr>
                  <tr>
                    <td>Bloqueadas</td>
                    <td>{bloqueadas}</td>
                  </tr>
                  <tr>
                    <td>Puntaje promedio de riesgo</td>
                    <td>{promedioRiesgo}/100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Reports;