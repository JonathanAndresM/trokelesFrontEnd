import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/admin",
});

// Interceptor para manejar errores 401 (Token expirado)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("⚠️ Token inválido o expirado");

            // Opcional: Intentar refrescar el token antes de cerrar sesión
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                try {
                    const res = await axios.post("http://localhost:8080/api/auth/refresh", { refreshToken });
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    localStorage.setItem("token", res.data.token);
                    return api.request(error.config); // Reintenta la petición original con el nuevo token
                } catch (refreshError) {
                    console.error("⚠️ No se pudo refrescar el token, cerrando sesión.");
                    console.error(refreshError);
                }
            }

            // Si no hay refreshToken o falla, cerrar sesión
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
