import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, allowedRoles }) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
        return <Navigate to="/home" />;
    }

    return element;
};

export default PrivateRoute;