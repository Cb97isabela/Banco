import { useContext, useEffect, useState } from "react";
import { evaluarTransaccion } from "../../services/api";
import { TransactionContext } from "../../context/TransactionContext";

function TransactionForm({ onResult }) {
  const [loading, setLoading] = useState(false);
  const { addTransaction } = useContext(TransactionContext);

  const generarIdTransaccion = () => {
    const fecha = new Date();
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    const random = Math.floor(10000 + Math.random() * 90000);

    return `TX-${y}${m}${d}-${random}`;
  };

  const [transaction, setTransaction] = useState({
    id_transaccion: "",
    id_socio: "",
    canal: "",
    tipo_transaccion: "",
    monto: "",
    fecha_hora: "",
    hora: "",
    dia_semana: "",
    ubicacion: "",
    dispositivo: "",
    ip_riesgosa: false,
    beneficiario_nuevo: false,
    transacciones_ultima_hora: "",
    tiempo_entre_operaciones: "",
    monto_promedio_socio: "",
    desviacion_monto: "",
    ubicacion_habitual: true,
    dispositivo_habitual: true,
  });

  useEffect(() => {
    const ahora = new Date();

    const dias = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    setTransaction((prev) => ({
      ...prev,
      id_transaccion: generarIdTransaccion(),
      fecha_hora: ahora.toISOString(),
      hora: ahora.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      dia_semana: dias[ahora.getDay()],
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTransaction((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id_transaccion: transaction.id_transaccion,
      id_socio: transaction.id_socio,
      canal: transaction.canal,
      tipo_transaccion: transaction.tipo_transaccion,
      monto: Number(transaction.monto),
      fecha_hora: transaction.fecha_hora,
      hora: transaction.hora,
      dia_semana: transaction.dia_semana,
      ubicacion: transaction.ubicacion,
      dispositivo: transaction.dispositivo,
      ip_riesgosa: Boolean(transaction.ip_riesgosa),
      beneficiario_nuevo: Boolean(transaction.beneficiario_nuevo),
      transacciones_ultima_hora: Number(transaction.transacciones_ultima_hora),
      tiempo_entre_operaciones: Number(transaction.tiempo_entre_operaciones),
      monto_promedio_socio: Number(transaction.monto_promedio_socio),
      desviacion_monto: Number(transaction.desviacion_monto),
      ubicacion_habitual: Boolean(transaction.ubicacion_habitual),
      dispositivo_habitual: Boolean(transaction.dispositivo_habitual),
    };

    try {
      setLoading(true);

      const respuesta = await evaluarTransaccion(payload);

      if (onResult) {
        onResult(respuesta);
      }

      addTransaction(payload, respuesta);
    } catch (error) {
      console.error("Error conectando con backend:", error);

      alert(
        "No se pudo conectar con el backend. Revisa que esté activo y que la ruta /api/predict funcione."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2>Datos para evaluación</h2>
        <p>
          Complete la información requerida para enviar la transacción al backend
          en Python.
        </p>
      </div>

      <div className="form-section">
        <h3>Información del Socio</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>ID Transacción</label>
            <input value={transaction.id_transaccion} readOnly />
          </div>

          <div className="form-group">
            <label>ID del Socio</label>
            <input
              name="id_socio"
              value={transaction.id_socio}
              onChange={handleChange}
              placeholder="Ej: SOC-1001"
              required
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Datos de la Transacción</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Canal</label>
            <select
              name="canal"
              value={transaction.canal}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un canal</option>
              <option value="banca_movil">Banca móvil</option>
              <option value="banca_web">Banca web</option>
              <option value="cajero">Cajero</option>
              <option value="agencia">Agencia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select
              name="tipo_transaccion"
              value={transaction.tipo_transaccion}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="transferencia">Transferencia</option>
              <option value="pago">Pago</option>
              <option value="retiro">Retiro</option>
              <option value="deposito">Depósito</option>
            </select>
          </div>

          <div className="form-group">
            <label>Monto</label>
            <input
              type="number"
              name="monto"
              value={transaction.monto}
              onChange={handleChange}
              placeholder="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input
              name="ubicacion"
              value={transaction.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Riobamba"
              required
            />
          </div>

          <div className="form-group">
            <label>Dispositivo</label>
            <input
              name="dispositivo"
              value={transaction.dispositivo}
              onChange={handleChange}
              placeholder="Ej: Android"
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora</label>
            <input value={transaction.fecha_hora} readOnly />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <input value={transaction.hora} readOnly />
          </div>

          <div className="form-group">
            <label>Día de semana</label>
            <input value={transaction.dia_semana} readOnly />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Variables de Comportamiento</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Transacciones última hora</label>
            <input
              type="number"
              name="transacciones_ultima_hora"
              value={transaction.transacciones_ultima_hora}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Tiempo entre operaciones (min)</label>
            <input
              type="number"
              name="tiempo_entre_operaciones"
              value={transaction.tiempo_entre_operaciones}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Monto promedio del socio</label>
            <input
              type="number"
              name="monto_promedio_socio"
              value={transaction.monto_promedio_socio}
              onChange={handleChange}
              placeholder="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Desviación del monto</label>
            <input
              type="number"
              name="desviacion_monto"
              value={transaction.desviacion_monto}
              onChange={handleChange}
              placeholder="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="switch-grid">
          <label className="switch-card">
            Beneficiario nuevo
            <input
              type="checkbox"
              name="beneficiario_nuevo"
              checked={transaction.beneficiario_nuevo}
              onChange={handleChange}
            />
          </label>

          <label className="switch-card">
            IP riesgosa
            <input
              type="checkbox"
              name="ip_riesgosa"
              checked={transaction.ip_riesgosa}
              onChange={handleChange}
            />
          </label>

          <label className="switch-card">
            Ubicación habitual
            <input
              type="checkbox"
              name="ubicacion_habitual"
              checked={transaction.ubicacion_habitual}
              onChange={handleChange}
            />
          </label>

          <label className="switch-card">
            Dispositivo habitual
            <input
              type="checkbox"
              name="dispositivo_habitual"
              checked={transaction.dispositivo_habitual}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <button className="analyze-btn" type="submit" disabled={loading}>
        {loading ? "Analizando..." : "Analizar Transacción"}
      </button>
    </form>
  );
}

export default TransactionForm;