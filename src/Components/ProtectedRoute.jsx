

import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/UseAuth.js'; // Ajusta la ruta a tu hook

const ProtectedRoute = ({ children }) => {
    // 1. Obtener el estado del usuario
    const { user, loading } = useAuth();

    // Opcional: Si el AuthProvider tiene una verificación de carga inicial
    if (loading) {
        // Podrías mostrar un spinner o mensaje de carga aquí
        return <div>Cargando...</div>; 
    }

    // 2. Lógica de protección
    if (!user) {
        // Si NO hay usuario (user es null), redirigir al login.
        // El componente <Navigate> de React Router DOM realiza la redirección.
        return <Navigate to="/Login" replace />;
    }

    // 3. Si hay usuario, renderizar los componentes hijos (la página Admin)
    return children;
};

export default ProtectedRoute;