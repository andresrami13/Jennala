import { useEffect, useState } from "react";
import { ContextCart } from "./CreateContextCart";

export const ProviderCart = ({children}) => {

    // Esta parte llama a lo que este guardado en el local storage
    const [cart, setCart] = useState (() => {

        const storeCart = localStorage.getItem('shoppingCart')
        return storeCart ? JSON.parse(storeCart) : [];

    });

    // esta parte guarda lo que se tenga en el carrito.
    useEffect (() => {
        const cart_json = JSON.stringify(cart)
        localStorage.setItem('shoppingCart', cart_json)
    },
    // Se coloca este segundo parametro porque cada se vez que haya
    // alguna modificacion en el carrito se debe renderizar
    [cart]); 
    

    //Funciones para usar en los componentes
    function handleAddtoCart (ProductToAdd) {
        setCart( prevCart => [...prevCart, ProductToAdd])
    }

    function getItemCount () {
        return cart.length
    };

    function DeleleFromCart (ProductToDelete) {
        
    // 1. Usa setCart para actualizar el estado, basándote en el estado anterior (prevCart)
    setCart(prevCart => {
        
            // Crea una copia del array
            const newCart = [...prevCart];
            
            // Usa splice para eliminar un elemento en esa posición
            newCart.splice(ProductToDelete, 1);

                      
            // Retorna el nuevo array de carrito
            return newCart;
        });

    }


    // Se condensan las funciones, valores y todo en ContextValue
    const ContextValue = {
        cart,
        handleAddtoCart,
        getItemCount,
        DeleleFromCart
    }


    return (
        <ContextCart.Provider value={ContextValue}>
            {children}
        </ContextCart.Provider> 
    )
}

export default ProviderCart;