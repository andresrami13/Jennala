import { NavLink } from 'react-router-dom';
import Style from '../CSS/Navbar.module.css'
import { useCart } from '../Context/CreateContextCart.js';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const navigate = useNavigate(); 

  const {getItemCount} = useCart();

  const itemCount = getItemCount();
  
  return (
    <nav className = {Style.header_nav}>
      <h1>Choco Jennala</h1>
      <ul className= {Style.navegation}>

          <NavLink to = '/' className = {Style.shopping_Cart_button}>
              Inicio
          </NavLink>

          <NavLink  to = '/Login' className = {Style.shopping_Cart_button}>
              Iniciar Sesión
          </NavLink>

          <button className = {Style.shopping_Cart_button} onClick={ () => { navigate('/Shopping_Cart') } } >
              <i className = 'fa-solid fa-cart-shopping'></i> Carrito ({itemCount}) </button>

      </ul>
    </nav>
  );
}



export default Navbar;
