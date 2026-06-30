import { useEffect, useState } from "react";

function TransactionForm() {
  const [transaction, setTransaction] = useState({
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

    variables_comportamiento: {
      transacciones_ultima_hora: "",
      tiempo_entre_operaciones: "",
      monto_promedio_socio: "",
      desviacion_monto: "",
      ubicacion_habitual: true,
      dispositivo_habitual: true,
    },
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
      fecha_hora: ahora.toISOString(),
      hora: ahora.toLocaleTimeString("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      dia_semana: dias[ahora.getDay()],
    }));
  }, []);

  return (
    <section className="transaction-form">

      <h2>Nueva Transacción</h2>

      <p className="form-subtitle">
        Complete los datos para que el modelo de IA evalúe el riesgo de la operación.
      </p>

      {/* Información del socio */}

      <div className="form-section">

        <h3>Información del Socio</h3>

        <div className="form-grid">

          <div className="form-group">
            <label>ID del Socio</label>
            <input placeholder="Ej: socio_77341" />
          </div>

        </div>

      </div>

      {/* Datos de la transacción */}

      <div className="form-section">

        <h3>Datos de la Transacción</h3>

        <div className="form-grid">

          <div className="form-group">
            <label>Canal</label>

            <select>
              <option>Banca Móvil</option>
              <option>Banca Web</option>
              <option>Cajero</option>
              <option>Agencia</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tipo</label>

            <select>
              <option>Transferencia</option>
              <option>Pago</option>
              <option>Retiro</option>
              <option>Depósito</option>
            </select>
          </div>

          <div className="form-group">
            <label>Monto</label>

            <input
              type="number"
              placeholder="$0.00"
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>

            <input
              placeholder="Riobamba"
            />
          </div>

          <div className="form-group">
            <label>Dispositivo</label>

            <select>
              <option>Android</option>
              <option>iPhone</option>
              <option>Windows</option>
              <option>MacOS</option>
            </select>
          </div>

        </div>

      </div>

      {/* Variables */}

      <div className="form-section">

        <h3>Variables de Comportamiento</h3>

        <div className="form-grid">

          <div className="form-group">
            <label>Transacciones última hora</label>
            <input type="number" />
          </div>

          <div className="form-group">
            <label>Tiempo entre operaciones (min)</label>
            <input type="number" />
          </div>

          <div className="form-group">
            <label>Monto promedio</label>
            <input type="number" />
          </div>

          <div className="form-group">
            <label>Desviación del monto</label>
            <input type="number" />
          </div>

        </div>

        <div className="switch-grid">

          <label className="switch-card">
            Beneficiario nuevo
            <input type="checkbox" />
          </label>

          <label className="switch-card">
            IP riesgosa
            <input type="checkbox" />
          </label>

          <label className="switch-card">
            Ubicación habitual
            <input type="checkbox" defaultChecked />
          </label>

          <label className="switch-card">
            Dispositivo habitual
            <input type="checkbox" defaultChecked />
          </label>

        </div>

      </div>

      <button className="analyze-btn">
        Analizar Transacción
      </button>

    </section>
  );
}

export default TransactionForm;