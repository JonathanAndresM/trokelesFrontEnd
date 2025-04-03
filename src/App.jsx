import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/admin/Dashboard'
import ManageUsers from './pages/admin/ManageUsers'
import ManageProducts from './pages/admin/ManageProducts'
import Reports from './pages/admin/Reports'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageTransition from './components/PageTransition'
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import Product from './pages/Product'

const ProtectedRoute = ({ children }) => {
    const {token, loading} = useSelector((state) => state.auth);

    if (loading) return <p>Cargando...</p>;
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}
      hideProgressBar={false} newestOnTop={true} closeOnClick
      pauseOnHover draggable theme='dark' transition={Slide} />
      <Router>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          {/* Panel de Administración */}
          <Route path="/dashboard" element={<ProtectedRoute><PrivateRoute element={<Dashboard />} allowedRoles={["admin", "editor", "viewer"]} /></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute><PrivateRoute element={<ManageUsers />} allowedRoles={["admin"]} /></ProtectedRoute>} />
          <Route path="/dashboard/products" element={<ProtectedRoute><PrivateRoute element={<ManageProducts />} allowedRoles={["admin", "editor"]} /></ProtectedRoute>} />
          <Route path="/dashboard/reports" element={<ProtectedRoute><PrivateRoute element={<Reports />} allowedRoles={["admin", "viewer"]} /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  )
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default App
