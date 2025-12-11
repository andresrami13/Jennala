import {useContext, createContext} from "react";

// se crea el contexto
export const ContextCart = createContext();

export const useCart = () => {
    return useContext(ContextCart)
} 
