import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

function Devices() {
  const { transactions } = useContext(TransactionContext);

  const dispositivos = transactions.reduce((acc, item) => {
    const key = `${item.dispositivo}-${item.ubicacion}`;

    if (!acc[key]) {
      acc[key] = {
        dispositivo: item.dispositivo,
        ubicacion: item.ubicacion,
        canal: item.canal,
        cantidad: 0,
        ultimoAcceso: item.fechaRegistro,
        riesgo: item.resultado?.datos?.resultado_ia?.riesgo_calculado || "bajo",
      };
    }

    acc[key].cantidad += 1;
    acc[key].ultimoAcceso = item.fechaRegistro;

    return acc;
  }, {});

  const lista = Object.values(dispositivos);

  return (
    <section className="dashboard-page">
      <div className="dashboard-panel">
        {lista.length === 0 ? (
          <div className="empty-state">
            <h2>No existen dispositivos registrados</h2>
            <p>
              Cuando se analicen transacciones, aquí aparecerán los dispositivos,
              ubicaciones, canales y últimos accesos registrados.
            </p>
          </div>
        ) : (
          <>
            <h3>Dispositivos registrados</h3>
            <p>Dispositivos detectados en las transacciones evaluadas.</p>

            <div className="table-wrapper">
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Dispositivo</th>
                    <th>Ubicación</th>
                    <th>Canal</th>
                    <th>Transacciones</th>
                    <th>Último acceso</th>
                    <th>Riesgo</th>
                  </tr>
                </thead>

                <tbody>
                  {lista.map((item) => (
                    <tr key={`${item.dispositivo}-${item.ubicacion}`}>
                      <td>{item.dispositivo}</td>
                      <td>{item.ubicacion}</td>
                      <td>{item.canal}</td>
                      <td>{item.cantidad}</td>
                      <td>{new Date(item.ultimoAcceso).toLocaleString("es-EC")}</td>
                      <td>
                        <span className={`status-badge ${item.riesgo}`}>
                          {item.riesgo.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Devices;