import { useContext } from "react";
// 💡 NOTA: Asegúrate de que la ruta a AuthContext sea correcta
import { AuthContext } from "./auth"; 

export const useAuth = () => {
    // 🐛 CORREGIDO: Asignar el contexto a una variable
    const context = useContext(AuthContext); 

    if (!context) {
        // 🐛 CORREGIDO: Esta verificación es VITAL y ahora es alcanzable
        throw new Error("useAuth must be used within an AuthProvider");
    }

    // Retornar el contexto DESPUÉS de la verificación
    return context; 
};