import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ element, allowedRoles }) => {
    const {user, token, loading} = useSelector((state) => state.auth);

    if (loading) return <p>Cargando...</p>;

    if (!user || !token) {
        return <Navigate to="/login" />;
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
        return <Navigate to="/home" />;
    }

    return element;
};

// ✅ Definir PropTypes
PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};

export default PrivateRoute;
