function ModifyForm() {
    return (
        <div>
            <h2>Modificar Producto</h2>
            Aquí iría el formulario para modificar un producto
            <form action="" >

                <div></div>    
                <label htmlFor="productName">Nombre del Producto:</label>
                <input type="text" id="productName" name="productName" />
                <br />

                <label htmlFor="productPrice">Precio:</label>
                <input type="number" id="productPrice" name="productPrice" />
                <br />

                <label htmlFor="productImage">URL de la Imagen:</label>
                <input type="text" id="productImage" name="productImage" />
                <br />
                </form> 
            
        </div>
    );
}

export default ModifyForm;