import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useState } from "react";


const Register = () => {

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        type: "minorista",
        taxId: "", // CUIT solo si es mayorista
        companyName: "", // Nombre de la empresa solo si es mayorista
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUser(user));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    className="input"
                />

                <select name="type" onChange={handleChange} className="input">
                    <option value="minorista">Cliente Minorista</option>
                    <option value="mayorista">Cliente Mayorista</option>
                </select>

                {user.type === "mayorista" && (
                    <>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Nombre de la Empresa"
                            onChange={handleChange}
                            className="input"
                        />
                        <input
                            type="text"
                            name="taxId"
                            placeholder="ID Fiscal (CUIT, RUC, etc.)"
                            onChange={handleChange}
                            className="input"
                        />
                    </>
                )}

                <button type="submit" className="btn-primary">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;