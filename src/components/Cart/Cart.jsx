import React, { useContext } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

const Cart = ({ actualizarCantidadTotal }) => { // Paso la función actualizarCantidadTotal como prop
  const { cart, vaciarCarrito, total, cantidadTotal, eliminarProducto } = useContext(CartContext);

  if (cantidadTotal === 0) {
    return (
      <>
        <h2>No hay Productos en el Carrito</h2>
        <Link to='/home' className={style.finalizar}>Productos</Link>
      </>
    );
  }

  // Función para eliminar un producto del carrito
  const handleEliminarProducto = (id) => {
    eliminarProducto(id);

    // Calcular la nueva cantidad total
    let nuevaCantidadTotal = 0;
    cart.forEach((producto) => {
      nuevaCantidadTotal += producto.cantidad;
    });

    // Actualizar la cantidad total
    actualizarCantidadTotal(nuevaCantidadTotal);
  };

  // Función para vaciar el carrito
  const handleVaciarCarrito = () => {
    vaciarCarrito();
    // Actualizar la cantidad total a 0
    actualizarCantidadTotal(0);
  };

  return (
    <div>
      <div className={style.eliminar}>
        {cart.map((producto, index) => (
          <CartItem
            key={index}
            {...producto}
            onEliminarProducto={handleEliminarProducto}
          />
        ))}
      </div>
      <div className={style.medio}>
        <h3>Cantidad Total de Orden: {cantidadTotal} </h3>
        <h3 className={style.precio}>Total: U$S {total.toFixed(2)} </h3>
        <button className={style.button} onClick={handleVaciarCarrito}>
          Vaciar Carrito
        </button>
      </div>
      <hr />
      <div>
        <Link to='/checkout' className={style.finalizar}>Finalizar compra</Link>
      </div>
    </div>
  );
};

export default Cart;
