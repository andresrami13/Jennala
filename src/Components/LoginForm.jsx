import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/UseAuth.js';
import Style from '../CSS/LoginForm.module.css'; 
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    // 1. Obtener valores y funciones del contexto
    const { user, loading, login } = useAuth();
    
    // 2. Estados locales para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate(); // ⬅️ INICIALIZAR EL HOOK

    // 3. Manejador de Envío del Formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null); // Limpiar errores

        try {
            // Llama a la función login de AuthProvider
            await login(email, password);
            // Si tiene éxito, el estado 'user' se actualizará automáticamente.
        } catch (error) {
            // Capturar el error lanzado desde AuthProvider
            setFormError(error.message || "Error de autenticación desconocido.");
        }
    };

    // 2. Usar useEffect para manejar la redirección cuando el usuario cambie
    useEffect(() => {
        // Verifica si el usuario ha iniciado sesión (user NO es null)
        if (user) {
            // Verifica si tiene el rol de administrador (asumiendo que tu objeto 'user' tiene un campo 'role')
            if (user.role === 'admin') {
                navigate('/Admin'); // Redirige a la página de administración
            } else {
                navigate('/'); // O redirige a la página de inicio para usuarios normales
            }
        }
    }, [user, navigate]);

    // Si no está logeado, muestra el formulario
    return (
        <form onSubmit={handleSubmit} className = {Style.login_form} >
            <h2>Iniciar Sesión</h2>
            
            {formError && <p style={{ color: 'red' }}>{formError}</p>}
            
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
            />
            
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
            />
            
            <button
                type="submit"
                // Deshabilitar el botón mientras loading sea true
                disabled={loading}
            >
                {/* Texto dinámico según el estado de carga */}
                {loading ? 'Cargando...' : 'Entrar'}
            </button>
            <p style={{ fontSize: '12px', color: '#666' }}>
                *Credenciales válidas: 5 o más caracteres en ambos campos.
            </p>
        </form>
    );
};

export default LoginForm;