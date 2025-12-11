import Style from "../CSS/Products.module.css"
import { useProducts } from "../Hooks/useProducts";
import { useCart } from '../Context/CreateContextCart.js';
import { formatCOP } from "../Utils/PriceFormatted.js"
import { usePagination } from '../Hooks/usePagination.js';  
import Style_pagination from '../CSS/Pagination.module.css';

function Products() {

    const { data, loading, error } = useProducts();

    const {handleAddtoCart} = useCart();    

        const {
        currentItems, // ⬅️ Los 10 productos a renderizar
        currentPage,
        totalPages,
        goToNextPage,
        goToPrevPage,
        isFirstPage,
        isLastPage,
    } = usePagination(data || [], 5);


    //3 Dependiendo si esta cargando o si hay error se devuelve lo correspondiente
    if (loading) {
        return (
            <div>Cargando datos</div>
        )
    }

    if (error) {
        return (
            <div>`Error ${error.message}`</div>
        )
    }

    //Si sale bien todo, se renderiza las cardas con la info de los productos.
    
    return (
            <>
                <h2 className={Style.h2}>Productos de chocolate</h2>
                    <section className={Style.products_container}>
                        
                        {currentItems && currentItems.map((product, index) => (
                            <article key={product.nombre} className={Style.product_item}>
                                <h3>{product.nombre}</h3>
                                
                                <p> { formatCOP (product.precio)}</p>
                                
                                <img src={product.imagen} alt={product.imagen} />
                                <button id={index}
                                onClick={() => handleAddtoCart(product) }  
                                
                                >Agregar</button>
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
            </>
        );


}

export default Products;