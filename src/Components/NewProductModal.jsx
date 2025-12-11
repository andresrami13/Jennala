
import { useState } from 'react';
import Style from '../CSS/ProductEditModal.module.css'; 

// Define la estructura inicial de un producto nuevo (vacío)
const initialFormState = {
    nombre: '',
    precio: 0,
    imagen: '',
    descripcion: '',
    // Asegúrate de incluir aquí cualquier otro campo obligatorio
};

const ProductCreateModal = ({ onClose, onCreate }) => {
    
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Manejar el precio como número
        const val = name === 'precio' ? parseFloat(value) : value; 
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Llamar a la función que inserta en Supabase
        const result = await onCreate(formData);
        
        if (result) {
            onClose();
        } else {
            console.error("Fallo al crear el producto.");
        }
    };

    return (
        <div className={Style.modal_overlay} onClick={onClose}>
            <div className={Style.modal_content} onClick={e => e.stopPropagation()}>
                <h3>Crear Nuevo Producto</h3>
                <form onSubmit={handleSubmit}>
                    <label>Nombre:
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </label>
                    <label>Precio:
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min="0"/>
                    </label>
                    <label>URL Imagen:
                        <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} />
                    </label>
                    <label>Descripción:
                        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" />
                    </label>
                    
                    <div className={Style.modal_actions}>
                        <button type="submit" className={Style.button_Modify}>
                            Crear Producto
                        </button>
                        <button type="button" className={Style.button_cancel} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreateModal;