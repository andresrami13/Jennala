import { useState, useMemo } from 'react';

/**
 * Hook personalizado para manejar la lógica de paginación de cualquier array de datos.
 * * @param {Array} data El array completo de elementos a paginar (ej: todos los productos).
 * @param {number} itemsPerPage La cantidad de elementos que se mostrarán por página.
 * @returns {Object} Un objeto con los datos de la página actual y las funciones de navegación.
 */
export function usePagination(data = [], itemsPerPage = 10) {
    
    // Estado para controlar la página actual (empezamos en la página 1)
    const [currentPage, setCurrentPage] = useState(1); 

    // --- 1. Cálculos de Paginación (Usamos useMemo para optimización) ---
    
    const totalItems = data.length;
    
    // Calcula el número total de páginas
    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    // Calcula el subconjunto de datos para la página actual
    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        
        // slice() selecciona los elementos de la página actual
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [data, currentPage, itemsPerPage]);


    // --- 2. Funciones de Navegación ---

    const goToNextPage = () => {
        // Solo avanza si no estamos en la última página
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        // Solo retrocede si no estamos en la primera página
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // --- 3. Retorno del Hook ---
    return {
        currentPage,
        totalPages,
        currentItems, // 🎯 Los 10 productos que debes renderizar
        goToNextPage,
        goToPrevPage,
        goToPage,
        itemsPerPage,
        totalItems,
        isFirstPage: currentPage === 1,
        isLastPage: currentPage === totalPages,
    };
}