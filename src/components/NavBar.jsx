/*import { useState } from 'react';
import logoTrokeles from '../assets/Logo Redes.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = () => {
    const { user } = useSelector((state) => state.auth)
    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logoTrokeles} alt="Logo" className="h-10 w-14 rounded-2xl mr-2" />
                <span className="text-xl font-bold">Trokeles</span>
            </div>
            <button
                className="text-white text-2xl md:hidden focus:outline-none"
                onClick={toggleMenu}
            >
                ☰
            </button>
            <ul
                className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:flex md:items-center md:space-x-6 transition-transform ${menuOpen ? 'block' : 'hidden'
                    }`}
            >
                {!user ? (
                    <>
                        <li className="border-b md:border-none">
                            <a href="/login" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Login
                            </a>
                        </li>
                        <li>
                            <a href="/register" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Registro
                            </a>
                        </li>
                    </>
                ) : user.role === 'admin' ? (
                    <>
                        <motion.div
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/dashboard">
                                <div className="px-2 py-1">
                                    <h3 className="text-xl font-semibold text-gray-700">Dashboard</h3>
                                </div>
                            </Link>
                        </motion.div>
                        <li className="border-b md:border-none">
                            <a href="#dashboard" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#product" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Productos
                            </a>
                        </li>
                        <li>
                            <a href="#logout" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Cerrar sesión
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="border-b md:border-none">
                            <a href="#profile" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Perfil
                            </a>
                        </li>
                        <li>
                            <a href="#products" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Productos
                            </a>
                        </li>
                        <li>
                            <a href="#cart" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Carrito
                            </a>
                        </li>
                        <li>
                            <a href="#logout" className="block px-4 py-2 md:p-0 hover:bg-gray-700 md:hover:bg-transparent">
                                Cerrar sesión
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;*/


import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoTrokeles from '../assets/Logo Redes.png';

const NavBar = () => {
    const { user } = useSelector((state) => state.auth);
    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = './';
    };
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const Logout = () => {
        return (
            <Link  onClick={logoutUser}>
                <div className="px-2 py-1">
                    <h3 className="text-md font-semibold text-red-400">Cerrar sesión</h3>
                </div>
            </Link>
        );
    }

    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between relative">
            <div className="flex items-center">
                <img src={logoTrokeles} alt="Logo" className="h-10 w-14 rounded-2xl mr-2" />
                <span className="text-xl font-bold">Trokeles</span>
            </div>
            <button
                className="text-white text-2xl md:hidden focus:outline-none"
                onClick={toggleMenu}
            >
                ☰
            </button>
            <ul
                className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:flex md:items-center md:space-x-6 transition-transform ${
                    menuOpen ? 'block' : 'hidden'
                }`}
            >
                {!user ? (
                    <>
                        <li>
                        <motion.div
                            className="bg-white rounded-lg shadow-lg hover:shadow-white transition-all duration-300 ease-in-out"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/login" onClick={toggleMenu}>
                                <div className="px-2 py-1">
                                    <h3 className="text-md font-semibold text-gray-700">Login</h3>
                                </div>
                            </Link>
                        </motion.div> 
                        </li>
                        <li>
                        <motion.div
                            className="bg-white rounded-lg shadow-lg hover:shadow-white transition-all duration-300 ease-in-out"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/register" onClick={toggleMenu}>
                                <div className="px-2 py-1">
                                    <h3 className="text-md font-semibold text-gray-700">Registro</h3>
                                </div>
                            </Link>
                        </motion.div>
                        </li>
                    </>
                ) : user.role === "admin" ? ( // Asegurar que admin tiene el rol 3
                    <>
                        <li>
                        <motion.div
                            className="bg-white rounded-lg shadow-lg hover:shadow-white transition-all duration-300 ease-in-out"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/dashboard" onClick={toggleMenu}>
                                <div className="px-2 py-1">
                                    <h3 className="text-md font-semibold text-gray-700">Dashboard</h3>
                                </div>
                            </Link>
                        </motion.div> 
                        </li>
                        <li>
                        <motion.div
                            className="bg-white rounded-lg shadow-lg hover:shadow-white transition-all duration-300 ease-in-out"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/products" onClick={toggleMenu}>
                                <div className="px-2 py-1">
                                    <h3 className="text-md font-semibold text-gray-700">Productos</h3>
                                </div>
                            </Link>
                        </motion.div>
                        </li>
                        <li>
                        <motion.div
                            className="bg-white rounded-lg shadow-lg hover:shadow-white transition-all duration-300 ease-in-out"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link onClick={logoutUser}>
                                <div className="px-2 py-1">
                                    <h3 className="text-md font-semibold text-red-400">Cerrar sesión</h3>
                                </div>
                            </Link>
                        </motion.div>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="block px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="block px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>
                                Carrito
                            </Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
