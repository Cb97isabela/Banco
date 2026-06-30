function RecentTransactionsTable({ transactions = [] }) {
  const obtenerIA = (item) => {
    return item?.resultado?.datos?.resultado_ia || {};
  };

  const ultimas = transactions.slice(0, 5);

  return (
    <div className="dashboard-panel">
      <h3>Últimas Transacciones Evaluadas</h3>
      <p>Registro reciente de operaciones analizadas por el modelo de IA.</p>

      {ultimas.length === 0 ? (
        <div className="empty-table">
          <strong>No existen transacciones registradas</strong>
          <span>
            Cuando se analicen transacciones, aquí aparecerá el historial.
          </span>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="recent-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Socio</th>
                <th>Canal</th>
                <th>Monto</th>
                <th>Riesgo</th>
                <th>Puntaje</th>
              </tr>
            </thead>

            <tbody>
              {ultimas.map((item) => {
                const ia = obtenerIA(item);

                return (
                  <tr key={item.id_transaccion}>
                    <td>{item.id_transaccion}</td>
                    <td>{item.id_socio}</td>
                    <td>{item.canal}</td>
                    <td>${Number(item.monto).toFixed(2)}</td>
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
      )}
    </div>
  );
}

export default RecentTransactionsTable;