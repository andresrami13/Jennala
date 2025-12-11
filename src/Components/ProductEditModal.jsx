import React, { useState } from 'react'; // Eliminamos useEffect
import Style from '../CSS/ProductEditModal.module.css'; 

const ProductEditModal = ({ product, onClose, onSave }) => {

    const [formData, setFormData] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const val = name === 'precio' ? parseFloat(value) : value; 
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e) => { // 🎯 Hacer la función asíncrona
            e.preventDefault();
            
            // 🎯 Esperamos la respuesta del guardado (la llamada a updateProduct)
            const updated = await onSave(formData); 
            
            if (updated) {
                onClose(); // Cerramos solo si el guardado fue exitoso
            } else {
                console.error("Fallo al actualizar el producto.");
            }
        };

    return (
        <div className={Style.modal_overlay} onClick={onClose}>
            <div className={Style.modal_content} onClick={e => e.stopPropagation()}>
                <h3>Editar Producto: {product.nombre}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Nombre:
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </label>
                    <label>Precio:
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} required />
                    </label>
                    <label>URL Imagen:
                        <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} />
                    </label>
                    
                    <div className={Style.modal_actions}>
                        <button type="submit" className= {Style.button_Modify}>
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEditModal;