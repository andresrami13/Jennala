import { useProducts } from '../Hooks/useProducts';
import Style from '../CSS/Products.module.css'
function MainImages() {

    const { data, loading, error } = useProducts();

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
        <div className={Style.pictures_container}>
            <section className={Style.pictures}>
                {data && data.map((product) => (
                    <img src={product.imagen} alt="product.imagen" />
                ))}
            </section>
        </div>
        );
}

export default MainImages;