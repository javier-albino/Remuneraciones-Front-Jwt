import useAuthStore from './../storage/store';

const getTokenOrThrow = () => {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error('Token no disponible. Asegúrate de estar autenticado.');
  }
  return token;
};

// Función para manejar las respuestas HTTP
const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 404 || response.status === 204) {
      throw new Error(`Error ${response.status}: El recurso no fue encontrado.`);
    }
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.status === 204 ? null : await response.json();
};

const login = async (correo, password) => {
  try {
    const response = await fetch('https://18.189.157.175:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password }), // 🔹 Cambia 'email' por 'correo'
    });

    const data = await response.json();
    

    if (data.token) {
      useAuthStore.getState().setToken(data.token);
      //console.log('✅ Token recibido:', data.token);
      return data.token;
    } else {
      console.error('⚠ No se recibió un token válido.');
      return null;
    }
  } catch (error) {
    console.error('❌ Error en login:', error);
    return null;
  }
};

const API_URL = 'https://18.189.157.175:3000/remuneraciones'; // ⚠️ Cambia esto si usas otro puerto o dominio

export const getRemuneraciones = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener las remuneraciones: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en getRemuneraciones:', error);
    return null;
  }
};

export { login };
