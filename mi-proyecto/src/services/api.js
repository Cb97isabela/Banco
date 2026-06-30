import ENDPOINTS from "./endpoints";

const BASE_URL = "http://localhost:8000";

export async function evaluarTransaccion(data) {
  const response = await fetch(
    `${BASE_URL}${ENDPOINTS.EVALUAR_TRANSACCION}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error al evaluar la transacción");
  }

  return await response.json();
}

export async function obtenerDashboard() {
  const response = await fetch(
    `${BASE_URL}${ENDPOINTS.DASHBOARD}`
  );

  return await response.json();
}

export async function obtenerFraudes() {
  const response = await fetch(
    `${BASE_URL}${ENDPOINTS.FRAUDES}`
  );

  return await response.json();
}

export async function obtenerDispositivos() {
  const response = await fetch(
    `${BASE_URL}${ENDPOINTS.DISPOSITIVOS}`
  );

  return await response.json();
}

export async function obtenerReportes() {
  const response = await fetch(
    `${BASE_URL}${ENDPOINTS.REPORTES}`
  );

  return await response.json();
}