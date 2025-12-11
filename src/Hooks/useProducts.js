import { useState, useEffect, useCallback } from "react";
import { supabase } from '../supabaseClient.js'; 

export function useProducts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(Date.now()); // Para forzar refetch

    // Función para obtener los datos (ahora externa para poder llamarla de nuevo)
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let { data: Products, error } = await supabase
                .from('Products') 
                .select('*');

            if (error) throw error;
            setData(Products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta al montar y cada vez que 'lastUpdated' cambie
    useEffect(() => {
        fetchData();
    }, [fetchData, lastUpdated]); 
    // Ahora incluye fetchData en dependencias ya que es useCallback, para evitar warnings

    // --- FUNCIONES DE MODIFICACIÓN DE DATOS en SUPABASE---

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('Products')
                .delete()
                .eq('id', id); // ⬅️ IMPORTANTE: Supabase usa .eq() para WHERE

            if (error) throw error;

            // Forzar la re-obtención de datos para actualizar la UI
            setLastUpdated(Date.now()); 
            return true; // Éxito
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return false; // Fallo
        }
    };

    const updateProduct = async (productData) => {
        setLoading(true);
        try {
            // El .update() recibe el objeto con los campos a cambiar
            const { data, error } = await supabase
                .from('Products')
                .update(productData)
                .eq('id', productData.id) // Busca el producto por su ID
                .select(); // Pide el registro actualizado

            if (error) throw error;
            
            // Forzar la re-obtención de datos para actualizar la UI
            setLastUpdated(Date.now()); 
            return data; // Retorna el producto actualizado
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return null; // Fallo
        }
    };

    const createProduct = async (productData) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('Products')
                .insert([productData]) // Insertar un nuevo producto
                .select(); // Pide el registro insertado
            if (error) throw error;
            
            // Forzar la re-obtención de datos para actualizar la UI
            setLastUpdated(Date.now()); 
            return data; // Retorna el producto insertado
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return null; // Fallo
        }       
    }

    return { data, loading, error, deleteProduct, updateProduct, createProduct}; // ⬅️ Exportamos las nuevas funciones
}