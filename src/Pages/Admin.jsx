import { useAuth } from '../Context/UseAuth.js';
import { useNavigate } from 'react-router-dom';
import Style from '../CSS/Admin.module.css';
import Style_pagination from '../CSS/Pagination.module.css';
import { useProducts } from "../Hooks/useProducts";
import { formatCOP } from "../Utils/PriceFormatted.js"
import { useState } from 'react';
import { usePagination } from '../Hooks/usePagination.js';  

// Importar los Modales
import ProductCreateModal from '../Components/NewProductModal.jsx';
import ProductEditModal from '../Components/ProductEditModal.jsx';
import DeleteConfirmModal from '../Components/DeleteConfirmModal.jsx';

function Admin () {

    // --- Hooks y Datos del Contexto ---
    const { user, logout } = useAuth();
    const navigate = useNavigate(); 
    
    // Desestructuramos todas las funciones CRUD del hook
    const { data, loading, error, deleteProduct, updateProduct, createProduct } = useProducts();

    const {
        currentItems, // ⬅️ Los 10 productos a renderizar
        currentPage,
        totalPages,
        goToNextPage,
        goToPrevPage,
        isFirstPage,
        isLastPage,
    } = usePagination(data || [], 6);




    // --- ESTADO PARA MANEJAR MODALES ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
    const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para editar/eliminar

    // --- MANEJADORES DE CIERRE GENERAL ---
    
    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsCreateModalOpen(false);
        setSelectedProduct(null); // Limpiar el producto seleccionado al cerrar
    };

    // --- MANEJADORES DE APERTURA ---

    const handleCreateClick = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };
    
    // --- MANEJADORES DE SUPABASE (Llamadas a Funciones del Hook) ---
    
    const handleCreateProduct = async (newProductData) => {
        // Llama al hook y retorna el resultado para que el modal sepa si cerrar
        const result = await createProduct(newProductData);
        return result; 
    };

    const handleSaveEdit = async (updatedData) => {
        // Llama al hook y retorna el resultado para que el modal sepa si cerrar
        const result = await updateProduct(updatedData);
        return result; 
    };

    const handleDeleteConfirm = async (productId) => {
        // Llama al hook y retorna true/false para que el modal sepa si cerrar
        const success = await deleteProduct(productId);
        return success;
    };
    
    // --- Renderizado de Carga/Error ---
    if (loading) {
        return (
            <div className={Style.Admin}>Cargando datos...</div>
        )
    }

    if (error) {
        return (
            <div className={Style.Admin}>`Error al cargar productos: ${error}`</div>
        )
    }


    return (
        <div className={Style.Admin} >
            <h2>¡Hola! {user?.name} </h2>
            <h3>Panel de Administración</h3>
            
            <div className={Style.admin_header_actions}>
                <p>Bienvenido al panel de administración. Aquí puedes gestionar productos.</p>
                {/* BOTÓN PARA ABRIR EL MODAL DE CREACIÓN */}
                <button onClick={handleCreateClick} className={Style.button_Create}>
                    ➕ Crear Nuevo Producto
                </button>
            </div>
            
            <section className={Style.products_container}>
                {currentItems && currentItems.map((product) => (
                    // Usamos el ID como key para asegurar la eficiencia
                    <article key={product.id} className={Style.product_item}> 
                        <h3>{product.nombre}</h3>
                        <p> { formatCOP (product.precio)}</p>
                        <img src={product.imagen} alt={product.nombre} />
                        
                        <div className={Style.button_container}>
                            <button 
                                onClick={() => handleEditClick(product)}
                                className={Style.button_Modify}>
                                Modify
                            </button>
                            <button 
                                onClick={() => handleDeleteClick(product)}
                                className={Style.button_Delete}>
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {/* --- Controles de Paginación --- */}
            <div className={Style_pagination.pagination_controls}>
                <button 
                    onClick={goToPrevPage}
                    disabled={isFirstPage}
                >
                    &lt; Anterior
                </button>
                
                <span>Página {currentPage} de {totalPages}</span>

                <button 
                    onClick={goToNextPage}
                    disabled={isLastPage}
                >
                    Siguiente &gt;
                </button>
            </div>

            <button onClick={() => {
                logout();
                navigate('/Login')
            }} className={Style.button_logout}>
                Cerrar Sesión
            </button>
            
            {/* 4. RENDERIZADO DE MODALES */}

            {/* Modal de Creación */}
            {isCreateModalOpen && (
                <ProductCreateModal
                    onClose={handleCloseModals}
                    onCreate={handleCreateProduct}
                />
            )}
            
            {/* Modal de Edición */}
            {isEditModalOpen && selectedProduct && (
                <ProductEditModal 
                    // Usamos el ID como key para forzar la re-inicialización del estado
                    key={selectedProduct.id} 
                    product={selectedProduct}
                    onClose={handleCloseModals}
                    onSave={handleSaveEdit}
                />
            )}

            {/* Modal de Eliminación */}
            {isDeleteModalOpen && selectedProduct && (
                <DeleteConfirmModal 
                    product={selectedProduct}
                    onClose={handleCloseModals}
                    onDelete={handleDeleteConfirm}
                />
            )}
        </div>
    )
} 

export default Admin;