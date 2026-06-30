import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

function Frauds() {
  const { transactions } = useContext(TransactionContext);

  const obtenerIA = (item) => item?.resultado?.datos?.resultado_ia || {};

  const fraudes = transactions.filter((item) => {
    const clase = obtenerIA(item).clase_final?.toLowerCase() || "";
    const riesgo = obtenerIA(item).riesgo_calculado?.toLowerCase() || "";

    return (
      clase.includes("pend") ||
      clase.includes("bloq") ||
      riesgo.includes("medio") ||
      riesgo.includes("alto")
    );
  });

  return (
    <section className="dashboard-page">
      <div className="dashboard-panel">
        {fraudes.length === 0 ? (
          <div className="empty-state">
            <h2>No existen alertas de fraude</h2>
            <p>
              Cuando existan transacciones pendientes o bloqueadas, aparecerán
              automáticamente en esta sección.
            </p>
          </div>
        ) : (
          <>
            <h3>Alertas detectadas</h3>
            <p>Transacciones que requieren revisión por posible riesgo.</p>

            <div className="table-wrapper">
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Socio</th>
                    <th>Monto</th>
                    <th>Ubicación</th>
                    <th>Dispositivo</th>
                    <th>Estado</th>
                    <th>Puntaje</th>
                  </tr>
                </thead>

                <tbody>
                  {fraudes.map((item) => {
                    const ia = obtenerIA(item);

                    return (
                      <tr key={item.id_transaccion}>
                        <td>{item.id_transaccion}</td>
                        <td>{item.id_socio}</td>
                        <td>${Number(item.monto).toFixed(2)}</td>
                        <td>{item.ubicacion}</td>
                        <td>{item.dispositivo}</td>
                        <td>
                          <span className={`status-badge ${ia.riesgo_calculado}`}>
                            {ia.clase_final}
                          </span>
                        </td>
                        <td>{ia.puntaje_riesgo}/100</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Frauds;