function RecentTransactionsTable() {
  const transactions = [];

  return (
    <div className="dashboard-panel full-width">
      <h3>Últimas Transacciones Evaluadas</h3>
      <p>
        Registro reciente de operaciones analizadas por el modelo de IA.
      </p>

      {transactions.length === 0 ? (
        <div className="empty-table">
          <strong>No existen transacciones registradas</strong>
          <span>
            Cuando el backend en Python envíe datos, aquí aparecerá el historial.
          </span>
        </div>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Socio</th>
              <th>Canal</th>
              <th>Monto</th>
              <th>Riesgo</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id_transaccion}>
                <td>{item.id_transaccion}</td>
                <td>{item.id_socio}</td>
                <td>{item.canal}</td>
                <td>${item.monto}</td>
                <td>{item.riesgo}</td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentTransactionsTable;