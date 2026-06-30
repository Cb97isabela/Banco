import ENDPOINTS from "./endpoints";

async function request(endpoint, options = {}) {
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la petición al backend");
  }

  return await response.json();
}

export async function evaluarTransaccion(data) {
  return await request(ENDPOINTS.EVALUAR_TRANSACCION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function verificarBackend() {
  return await request(ENDPOINTS.HEALTH);
}

export async function verificarBaseDatos() {
  return await request(ENDPOINTS.DATABASE);
}