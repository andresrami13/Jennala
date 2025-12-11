import { useCart } from "../Context/CreateContextCart.js"
import Style from "../CSS/ShoppingCartCard.module.css"
import { formatCOP } from "../Utils/PriceFormatted.js"

function ShoppingCartCard () {

    const { cart } = useCart();
    const { DeleleFromCart } = useCart();


    return (
        <>
            {cart && cart.map((product, index) => (
            
                <article key={index} className={Style.product_item}>
                    <h3>{product.nombre}</h3>
                    
                    <p> {formatCOP (product.precio)} </p>
                    
                    <img src={product.imagen} alt={product.imagen} />
                    <button id={index} 
                    onClick={() => DeleleFromCart(index)}
                    >Borrar Producto</button>
                </article>
            ))}
        </>
    
    )

}

export default ShoppingCartCard