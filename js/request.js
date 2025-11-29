// js/request.js
const BASE_URL = "https://kutexa.onrender.com/api";

export async function reconciliar(formData) {
  try {
    const resp = await fetch(`${BASE_URL}/reconciliar`, {
      method: "POST",
      body: formData
    });

    if (!resp.ok) {
      const errorText = await resp.text().catch(() => 'Erro desconhecido');
      throw new Error(`Erro ${resp.status}: ${errorText}`);
    }

    const data = await resp.json();
    console.log("Dados recebidos:", data);
    return data;
    
  } catch (err) {
    console.error("reconciliar error:", err);
    throw err;
  }
}