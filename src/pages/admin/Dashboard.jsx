/*import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const {user} = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        <nav className="space-x-4">
            <Link className="px-4 py-2 bg-blue-500 text-white rounded" to="/dashboard/products">Productos</Link>
            {user.role === "admin" && (
            <Link className="px-4 py-2 bg-blue-500 text-white rounded" to="/dashboard/users">Usuarios</Link>
            )}
            {(user.role === "admin" || user.role === "viewer") && (
            <Link className="px-4 py-2 bg-blue-500 text-white rounded" to="/dashboard/reports">Reportes</Link>
            )}
        </nav>
        </div>
  )
}

export default Dashboard*/

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Título del panel */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta 1: Gestión de productos */}
          <motion.div
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/dashboard/products">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-700">Gestión de Productos</h3>
                <p className="text-gray-600 mt-2">Administrar los productos disponibles en la tienda.</p>
              </div>
            </Link>
          </motion.div>

          {/* Tarjeta 2: Gestión de usuarios */}
          <motion.div
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/dashboard/users">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-700">Gestión de Usuarios</h3>
                <p className="text-gray-600 mt-2">Ver y administrar los usuarios registrados.</p>
              </div>
            </Link>
          </motion.div>

          {/* Tarjeta 3: Informes */}
          <motion.div
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/dashboard/reports">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-700">Informes</h3>
                <p className="text-gray-600 mt-2">Ver los informes de ventas y actividad.</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;