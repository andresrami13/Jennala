import { createContext } from "react";

// Estructura de los datos que se proporcionarán:
const initialAuthContext = {
    // Estado del usuario
    user: null, 
    // Estado de carga (viene de AuthProvider)
    loading: false, 
    // Funciones
    login: () => {}, 
    logout: () => {}, 
};

// 1. Creación y exportación del Contexto
// Se usa el valor inicial como argumento.
export const AuthContext = createContext(initialAuthContext);
