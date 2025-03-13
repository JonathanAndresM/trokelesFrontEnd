import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({
            ...userData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(userData));

        if (user?.role) {
            if (user.role === "admin" || user.role === "editor") {
                navigate("/dashboard");
            } else {
                navigate("/products");
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <h2 className="text-3xl font-bold mb-6">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={userData.email}
                    className="w-full p-2 border mb-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={userData.password}
                    className="w-full p-2 border mb-2"
                />
                <button type="submit"
                    className="bg-blue-500 text-white p-2 w-full"
                    disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar sesión"}
                </button>
            </form>
        </div>
    );
}

export default Login;