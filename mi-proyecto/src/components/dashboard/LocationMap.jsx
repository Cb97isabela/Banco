function LocationMap({ transactions = [] }) {
  const posiciones = {
    quito: { nombre: "Quito", top: "29%", left: "46%" },
    riobamba: { nombre: "Riobamba", top: "48%", left: "44%" },
    guayaquil: { nombre: "Guayaquil", top: "55%", left: "31%" },
    cuenca: { nombre: "Cuenca", top: "64%", left: "41%" },
    ambato: { nombre: "Ambato", top: "43%", left: "45%" },
    loja: { nombre: "Loja", top: "78%", left: "38%" },

    manta: { nombre: "Manta", top: "39%", left: "21%" },
    portoviejo: { nombre: "Portoviejo", top: "40%", left: "24%" },
    esmeraldas: { nombre: "Esmeraldas", top: "14%", left: "33%" },
    ibarra: { nombre: "Ibarra", top: "22%", left: "50%" },
    tulcan: { nombre: "Tulcán", top: "16%", left: "55%" },
    latacunga: { nombre: "Latacunga", top: "39%", left: "45%" },

    machala: { nombre: "Machala", top: "69%", left: "30%" },
    babahoyo: { nombre: "Babahoyo", top: "50%", left: "35%" },
    milagro: { nombre: "Milagro", top: "54%", left: "34%" },
    duran: { nombre: "Durán", top: "55%", left: "31%" },
    quevedo: { nombre: "Quevedo", top: "40%", left: "35%" },
    santo_domingo: { nombre: "Santo Domingo", top: "30%", left: "39%" },

    tena: { nombre: "Tena", top: "40%", left: "54%" },
    puyo: { nombre: "Puyo", top: "46%", left: "52%" },
    macas: { nombre: "Macas", top: "57%", left: "50%" },
    zamora: { nombre: "Zamora", top: "79%", left: "41%" },
    nueva_loja: { nombre: "Nueva Loja", top: "28%", left: "64%" },
    coca: { nombre: "El Coca", top: "33%", left: "63%" },
    lago_agrio: { nombre: "Lago Agrio", top: "28%", left: "64%" },

    salinas: { nombre: "Salinas", top: "55%", left: "18%" },
    la_libertad: { nombre: "La Libertad", top: "56%", left: "19%" },
    santa_elena: { nombre: "Santa Elena", top: "56%", left: "20%" },

    azogues: { nombre: "Azogues", top: "62%", left: "42%" },
    guaranda: { nombre: "Guaranda", top: "47%", left: "41%" },
    alausi: { nombre: "Alausí", top: "55%", left: "42%" },
    chone: { nombre: "Chone", top: "36%", left: "28%" },
    jipijapa: { nombre: "Jipijapa", top: "44%", left: "23%" },
    daule: { nombre: "Daule", top: "51%", left: "30%" },
    pasaje: { nombre: "Pasaje", top: "70%", left: "31%" },
    huaquillas: { nombre: "Huaquillas", top: "72%", left: "27%" },
    yantzaza: { nombre: "Yantzaza", top: "76%", left: "43%" },
    otavalo: { nombre: "Otavalo", top: "24%", left: "49%" },
    cayambe: { nombre: "Cayambe", top: "26%", left: "50%" },
    banos: { nombre: "Baños", top: "45%", left: "47%" },
  };

  const normalizar = (texto) =>
    texto
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const conteo = transactions.reduce((acc, item) => {
    const ciudadKey = normalizar(item.ubicacion || "sin_ubicacion");

    acc[ciudadKey] = {
      nombre: item.ubicacion || "Sin ubicación",
      cantidad: (acc[ciudadKey]?.cantidad || 0) + 1,
    };

    return acc;
  }, {});

  const ciudadesRegistradas = Object.entries(conteo);

  return (
    <div className="dashboard-panel location-panel">
      <h3>Mapa de Actividad</h3>
      <p>Ciudades desde donde se registraron transacciones.</p>

      <div className="location-layout">
        <div className="ecuador-map">
          <div className="radar-ring ring-1"></div>
          <div className="radar-ring ring-2"></div>
          <div className="radar-ring ring-3"></div>
          <div className="radar-sweep"></div>

          <div className="ecuador-real-map"></div>

          {ciudadesRegistradas.map(([key, data]) => {
            const posicion = posiciones[key];

            if (!posicion) return null;

            return (
              <div
                key={key}
                className="city-marker"
                style={{
                  top: posicion.top,
                  left: posicion.left,
                }}
                title={`${data.nombre}: ${data.cantidad}`}
              >
                <span className="pulse"></span>
                <strong>{data.cantidad}</strong>
                <small>{data.nombre}</small>
              </div>
            );
          })}

          <div className="map-legend">
            <span></span>

            <div>
              <strong>Actividad de transacciones</strong>
              <p>Mayor número = mayor actividad</p>
            </div>
          </div>
        </div>

        <div className="city-list">
          <h4>Ciudades registradas</h4>

          {ciudadesRegistradas.length === 0 ? (
            <p>No existen ubicaciones registradas.</p>
          ) : (
            ciudadesRegistradas.map(([key, data]) => {
              const estaEnMapa = posiciones[key];

              return (
                <div key={key} className="city-item">
                  <span>
                    {data.nombre}
                    {!estaEnMapa && <small> · ciudad sin coordenadas</small>}
                  </span>

                  <strong>{data.cantidad}</strong>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationMap;