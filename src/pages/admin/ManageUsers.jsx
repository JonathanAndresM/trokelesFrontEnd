import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, getUsers, updateUser } from "../../redux/adminSlice";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);
    const [newUser, setNewUser] = useState({ name: "", lastName: "", email: "", password: "", role: "user" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const handlerBackToDashboard = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // Callback para manejar la edición de usuario
    const handleEditClick = useCallback((user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    }, []);

    // Callback para guardar el usuario actualizado
    const handleSave = useCallback(() => {
        dispatch(updateUser({ id: selectedUser._id, user: selectedUser }));
        toast.success("✅ Usuario actualizado correctamente", {
            position: "bottom-right",
            icon: "📝",
            style: { backgroundColor: "#4CAF50", color: "white" },
        });
        setIsModalOpen(false);
    }, [dispatch, selectedUser]);

    // Callback para eliminar el usuario
    const handleDelete = useCallback((id) => {
        dispatch(deleteUser(id));
        toast.error("❌ Usuario eliminado", {
            position: "bottom-right",
            icon: "🗑️",
            style: { backgroundColor: "#E53935", color: "white" },
        });
    }, [dispatch]);

    // Maneja los cambios en el formulario de nuevo usuario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn">Gestión de Usuarios</h1>
            <button
                onClick={handlerBackToDashboard}
                className="bg-blue-500 text-white p-3 rounded-lg mb-6 transition-all duration-300 transform hover:scale-105 hover:bg-blue-600"
            >
                Volver al Dashboard
            </button>
            {/* Formulario para agregar nuevo usuario */}
            <div className="bg-white shadow-lg p-6 rounded-lg mb-6 transition-all duration-300 transform hover:scale-105 hover:bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Crear Nuevo Usuario</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        onChange={handleInputChange}
                        value={newUser.name}
                        className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        name="lastName"
                        onChange={handleInputChange}
                        value={newUser.lastName}
                        className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleInputChange}
                        value={newUser.email}
                        className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={handleInputChange}
                        value={newUser.password}
                        className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
                    />
                    <select
                        name="role"
                        onChange={handleInputChange}
                        value={newUser.role}
                        className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <option value="user">Usuario</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button
                    onClick={() => dispatch(createUser(newUser))}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Crear Usuario
                </button>
            </div>

            {/* Lista de usuarios */}
            <ul className="space-y-4">
                {users.map(({ _id, name, role }) => (
                    <li
                        key={_id}
                        className="mb-4 p-4 bg-white shadow-lg rounded-lg flex justify-between items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
                    >
                        <span className="font-semibold text-gray-800">{name} - {role}</span>
                        <div className="flex gap-2">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 transform hover:scale-105"
                                onClick={() => handleEditClick({ _id, name, role })}
                                aria-label={`Editar ${name}`}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
                                onClick={() => handleDelete(_id)}
                                aria-label={`Eliminar ${name}`}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal de Edición */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Usuario" onSave={handleSave}>
                    <input
                        type="text"
                        value={selectedUser?.name || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-4"
                    />
                    <input
                        type="email"
                        value={selectedUser?.email || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-4"
                    />
                    <input
                        type="password"
                        value={selectedUser?.password || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                        className="w-full p-2 border rounded-lg mb-4"
                    />
                    <select
                        value={selectedUser?.role || "user"}
                        onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="user">Usuario</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Administrador</option>
                    </select>
                </Modal>
            )}
        </div>
    );
};

export default ManageUsers;
