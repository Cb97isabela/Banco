function ChannelUsageChart({ transactions = [] }) {
  const canales = {
    "Banca móvil": 0,
    "Banca web": 0,
    Cajero: 0,
    Agencia: 0,
  };

  transactions.forEach((t) => {
    const canal = (t.canal || "").toLowerCase();

    if (canal.includes("movil") || canal.includes("móvil")) {
      canales["Banca móvil"]++;
    } else if (canal.includes("web")) {
      canales["Banca web"]++;
    } else if (canal.includes("cajero")) {
      canales["Cajero"]++;
    } else if (canal.includes("agencia")) {
      canales["Agencia"]++;
    }
  });

  const max = Math.max(...Object.values(canales), 1);

  return (
    <div className="dashboard-panel">
      <h3>Transacciones por Canal</h3>
      <p>Canales digitales utilizados por los socios.</p>

      <div className="channel-chart">
        {Object.entries(canales).map(([nombre, cantidad]) => (
          <div key={nombre} className="channel-item">
            <div className="channel-bar">
              <div
                className="channel-bar-fill"
                style={{
                  height: `${(cantidad / max) * 180}px`,
                }}
              ></div>
            </div>

            <strong>{cantidad}</strong>
            <span>{nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelUsageChart;