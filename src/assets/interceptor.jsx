import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/admin",
});

// Interceptor para manejar errores 401 (Token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;