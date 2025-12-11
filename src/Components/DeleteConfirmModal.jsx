// DeleteConfirmModal.jsx

import React from 'react';
import Style from '../CSS/ProductEditModal.module.css'; 

const DeleteConfirmModal = ({ product, onClose, onDelete }) => {
    
    // Si no hay producto, no renderizamos el modal
    if (!product) return null; 

    const handleDelete = async () => { // 🎯 Hacer la función asíncrona es una buena práctica aquí
            // 🎯 Asegurar que pasamos product.id
            const success = await onDelete(product.id); 
            
            // Si la eliminación fue exitosa, cerramos el modal
            if (success) { 
                onClose(); 
            } else {
                // Opcional: manejar el error aquí si quieres mostrar un mensaje
                console.error("Fallo al eliminar el producto.");
            }
        };
        
    return (
        <div className={Style.modal_overlay} onClick={onClose}>
            <div className={Style.modal_content} onClick={e => e.stopPropagation()}>
                <h3>Confirmar Eliminación</h3>
                <p>¿Estás seguro de que deseas eliminar el producto: <b>{product.nombre}</b>?</p>
                <p>Esta acción es irreversible.</p>
                <div className={Style.modal_actions}>
                    <button  onClick={handleDelete} className={Style.button_Delete}>
                        Sí, Eliminar
                    </button>
                    <button  onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;