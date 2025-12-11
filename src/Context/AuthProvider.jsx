import { AuthContext } from "./auth"; // Archivo donde creaste AuthContext
import { useState } from "react";
// Se elimina la importación de 'Children' (no es necesario)

const AuthProvider = ({ children }) => { // 🐛 CORREGIDO: 'Children' a 'children'

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null; 
    });
    const [loading, setLoading] = useState(false);




    // Define las credenciales de prueba
    const ADMIN_EMAIL = 'admin@jennala.com';
    const ADMIN_PASSWORD = 'contraseña123';

    const login = async (email, password) => {

        setLoading(true);

        try {
            // Simulamos una llamada a una API de autenticación
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // 🐛 MODIFICACIÓN CLAVE AQUÍ: Compara con las credenciales fijas
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                const mockUser = {
                    email,
                    name: "Administrador Jennala",
                    role: "admin" // Este rol se asigna si las credenciales coinciden
                };
                
                // Asignación directa del objeto de usuario
                setUser(mockUser); 
                
                // Opcional: Persistir la sesión en localStorage (buena práctica de enseñanza)
                localStorage.setItem('user', JSON.stringify(mockUser)); 

            } else {
                // Si no coinciden, lanza un error que será capturado por el LoginForm
                throw new Error("Correo y/o contraseña incorrectas.");
            }

        } catch (error) {
            console.error("Error during login:", error);
            // Lanzamos el error para que el formulario lo muestre
            throw error; 
            
        } finally {
            setLoading(false); 
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // ✅ AÑADIDO: Incluir 'loading' en el valor del contexto
    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children} {/* 🐛 CORREGIDO: Usar 'children' */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;