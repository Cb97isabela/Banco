import { useEffect, useState } from "react";

function TransactionForm({ onResult }) {
  const generarIdTransaccion = () => {
    const fecha = new Date();
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    const random = Math.floor(10000 + Math.random() * 90000);

    return `tx_${y}${m}${d}_${random}`;
  };

  const [transaction, setTransaction] = useState({
    id_transaccion: "",
    id_socio: "",
    canal: "banca_movil",
    tipo_transaccion: "transferencia",
    monto: "",
    fecha_hora: "",
    hora: "",
    dia_semana: "",
    ubicacion: "Riobamba",
    dispositivo: "Android",
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

  const handleBehaviorChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTransaction((prev) => ({
      ...prev,
      variables_comportamiento: {
        ...prev.variables_comportamiento,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const calcularResultadoSimulado = (payload) => {
    let puntaje = 0;
    const motivos = [];

    if (payload.monto > payload.variables_comportamiento.monto_promedio_socio * 2) {
      puntaje += 30;
      motivos.push(
        `el monto solicitado (${payload.monto.toFixed(
          2
        )}) presenta una desviación alta respecto al promedio histórico del socio (${payload.variables_comportamiento.monto_promedio_socio.toFixed(
          2
        )})`
      );
    }

    if (payload.beneficiario_nuevo) {
      puntaje += 20;
      motivos.push("el beneficiario es nuevo en el sistema");
    }

    if (payload.ip_riesgosa) {
      puntaje += 20;
      motivos.push("la dirección IP fue marcada como riesgosa");
    }

    if (!payload.variables_comportamiento.ubicacion_habitual) {
      puntaje += 15;
      motivos.push("la ubicación no coincide con el comportamiento habitual");
    }

    if (!payload.variables_comportamiento.dispositivo_habitual) {
      puntaje += 15;
      motivos.push("el dispositivo no es habitual para el socio");
    }

    if (payload.variables_comportamiento.transacciones_ultima_hora >= 5) {
      puntaje += 15;
      motivos.push("existen varias transacciones realizadas en la última hora");
    }

    puntaje = Math.min(puntaje, 100);

    let clase_final = "Aprobada";
    let riesgo_calculado = "bajo";

    if (puntaje >= 70) {
      clase_final = "Bloqueada";
      riesgo_calculado = "alto";
    } else if (puntaje >= 40) {
      clase_final = "Pendiente de Validación";
      riesgo_calculado = "medio";
    }

    const explicacion =
      motivos.length > 0
        ? `La transacción se marcó como ${clase_final} debido a que ${motivos.join(
            ", sumado a que "
          )}.`
        : "La transacción fue aprobada porque no se detectaron patrones anómalos relevantes en el comportamiento del socio.";

    return {
      exito: true,
      status_code: 200,
      datos: {
        id_transaccion: payload.id_transaccion,
        resultado_ia: {
          clase_final,
          puntaje_riesgo: puntaje,
          riesgo_calculado,
          explicacion,
        },
        evaluado_en: new Date().toISOString(),
      },
      error: null,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...transaction,
      monto: Number(transaction.monto),
      variables_comportamiento: {
        ...transaction.variables_comportamiento,
        transacciones_ultima_hora: Number(
          transaction.variables_comportamiento.transacciones_ultima_hora
        ),
        tiempo_entre_operaciones: Number(
          transaction.variables_comportamiento.tiempo_entre_operaciones
        ),
        monto_promedio_socio: Number(
          transaction.variables_comportamiento.monto_promedio_socio
        ),
        desviacion_monto: Number(
          transaction.variables_comportamiento.desviacion_monto
        ),
      },
    };

    console.log("JSON enviado al backend en Python:", payload);

    const respuestaSimuladaBackend = calcularResultadoSimulado(payload);

    console.log("JSON recibido desde el backend:", respuestaSimuladaBackend);

    if (onResult) {
      onResult(respuestaSimuladaBackend);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Nueva Transacción</h2>

      <p className="form-subtitle">
        Complete los datos para que el modelo de IA evalúe el riesgo de la operación.
      </p>

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
              placeholder="Ej: socio_77341"
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
            <select name="canal" value={transaction.canal} onChange={handleChange}>
              <option value="banca_movil">Banca Móvil</option>
              <option value="banca_web">Banca Web</option>
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
            >
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
              placeholder="450.00"
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
              placeholder="Riobamba"
              required
            />
          </div>

          <div className="form-group">
            <label>Dispositivo</label>
            <select
              name="dispositivo"
              value={transaction.dispositivo}
              onChange={handleChange}
            >
              <option value="Android">Android</option>
              <option value="iPhone">iPhone</option>
              <option value="Windows">Windows</option>
              <option value="MacOS">MacOS</option>
            </select>
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
              value={transaction.variables_comportamiento.transacciones_ultima_hora}
              onChange={handleBehaviorChange}
              placeholder="2"
              required
            />
          </div>

          <div className="form-group">
            <label>Tiempo entre operaciones (min)</label>
            <input
              type="number"
              name="tiempo_entre_operaciones"
              value={transaction.variables_comportamiento.tiempo_entre_operaciones}
              onChange={handleBehaviorChange}
              placeholder="15"
              required
            />
          </div>

          <div className="form-group">
            <label>Monto promedio del socio</label>
            <input
              type="number"
              name="monto_promedio_socio"
              value={transaction.variables_comportamiento.monto_promedio_socio}
              onChange={handleBehaviorChange}
              placeholder="120.50"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Desviación del monto</label>
            <input
              type="number"
              name="desviacion_monto"
              value={transaction.variables_comportamiento.desviacion_monto}
              onChange={handleBehaviorChange}
              placeholder="329.50"
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
              checked={transaction.variables_comportamiento.ubicacion_habitual}
              onChange={handleBehaviorChange}
            />
          </label>

          <label className="switch-card">
            Dispositivo habitual
            <input
              type="checkbox"
              name="dispositivo_habitual"
              checked={transaction.variables_comportamiento.dispositivo_habitual}
              onChange={handleBehaviorChange}
            />
          </label>
        </div>
      </div>

      <button className="analyze-btn" type="submit">
        Analizar Transacción
      </button>
    </form>
  );
}

export default TransactionForm;