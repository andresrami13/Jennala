import React from 'react';
import Style from '../CSS/ShoppinCart.module.css'
import ShoppingCartCard from './ShoppingCartCard.jsx'
import { useCart } from "../Context/CreateContextCart.js"


function Shopping_Cart() {

    const { cart } = useCart();
    
    return (
        <>
            <div className= {Style.div_header_Xclose_model}>
                <h4>Esto es lo que llevas en tu carrito</h4>
                <button onClick={ () => { window.location.href = '/' } } >X</button>
            </div>
            <section className= {Style.sect_Prod_Shop_Cart}>
                
                {cart.length === 0 ? (

                    <h4>El carrito esta vacio</h4>
                ) : (

                    <ShoppingCartCard /> 
                )}

            </section>  
        </>   
    )   
}

export default Shopping_Cart;    