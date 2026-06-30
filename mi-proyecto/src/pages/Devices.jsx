function Devices() {
  return (
    <section className="dashboard-page">

      <div className="dashboard-panel">

        <div className="empty-state">

          <h2>No existen dispositivos registrados</h2>

          <p>
            Cuando el backend en Python envíe la información,
            aquí aparecerán todos los dispositivos utilizados por los socios,
            incluyendo dirección IP, ubicación, sistema operativo,
            fecha del último acceso y nivel de confianza.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Devices;