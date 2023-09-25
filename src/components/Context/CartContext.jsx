import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext(
//   {
//   cart: [],
//   total: 0,
//   cantidadTotal: 0,
// }
);

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
    const openRecovery = ()=>setRecoveryOpen(true);
    const closeRecovery = ()=>setRecoveryOpen(false);

  // Cargar el carrito desde localStorage al iniciar la aplicación
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      const carritoParseado = JSON.parse(carritoGuardado);
      setCart(carritoParseado.cart);
      setTotal(carritoParseado.total);
      setCantidadTotal(carritoParseado.cantidadTotal);
    }
  }, []);

  // Función para guardar el carrito en localStorage
  const guardarCarritoEnLocalStorage = (carrito, nuevoTotal, nuevaCantidadTotal) => {
    localStorage.setItem(
      "carrito",
      JSON.stringify({ cart: carrito, total: nuevoTotal, cantidadTotal: nuevaCantidadTotal })
    );
    console.log("Carrito guardado en localStorage:", {
      cart: carrito,
      total: nuevoTotal,
      cantidadTotal: nuevaCantidadTotal,
    });
  };

  const addItem = (item, cantidad) => {
    const productoExistenteIndex = cart.findIndex(
      (prod) => prod.item.id === item.id
    );

    if (productoExistenteIndex === -1) {
      const nuevoProducto = { item, cantidad };
      const nuevoCarrito = [...cart, nuevoProducto];

      // Actualiza las cantidades totales
      const nuevoTotal = total + item.price * cantidad;
      const nuevaCantidadTotal = cantidadTotal + cantidad;

      setCart(nuevoCarrito);
      setCantidadTotal(nuevaCantidadTotal);
      setTotal(nuevoTotal);

      // Guardar en localStorage cada vez que se agrega un producto
      guardarCarritoEnLocalStorage(nuevoCarrito, nuevoTotal, nuevaCantidadTotal);
    } else {
      const carritoActualizado = [...cart];
      carritoActualizado[productoExistenteIndex].cantidad += cantidad;

      // Actualiza las cantidades totales
      const nuevoTotal = total + item.price * cantidad;
      const nuevaCantidadTotal = cantidadTotal + cantidad;

      setCart(carritoActualizado);
      setCantidadTotal(nuevaCantidadTotal);
      setTotal(nuevoTotal);

      // Guardar en localStorage cada vez que se actualiza un producto existente
      guardarCarritoEnLocalStorage(carritoActualizado, nuevoTotal, nuevaCantidadTotal);
    }

    console.log("Producto agregado al carrito:", {
      item,
      cantidad,
      cart,
      total,
      cantidadTotal,
    });
  };

  const eliminarProducto = (id) => {
    const productoEliminado = cart.find((prod) => prod.item.id === id);
    const carritoActualizado = cart.filter((prod) => prod.item.id !== id);

    // Actualiza las cantidades totales
    const nuevoTotal = total - productoEliminado.item.price * productoEliminado.cantidad;
    const nuevaCantidadTotal = cantidadTotal - productoEliminado.cantidad;

    setCart(carritoActualizado);
    setTotal(nuevoTotal);
    setCantidadTotal(nuevaCantidadTotal);

    // Guardar en localStorage cada vez que se elimina un producto
    guardarCarritoEnLocalStorage(carritoActualizado, nuevoTotal, nuevaCantidadTotal);

    console.log("Producto eliminado del carrito:", {
      id,
      cart: carritoActualizado,
      total: nuevoTotal,
      cantidadTotal: nuevaCantidadTotal,
    });
  };

  const vaciarCarrito = () => {
    // Limpiar el estado del carrito
    setCart([]);
    setCantidadTotal(0);
    setTotal(0);

    // Limpiar localStorage cuando se vacía el carrito
    localStorage.removeItem("carrito");

    console.log("Carrito vacio y localStorage limpio");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        eliminarProducto,
        vaciarCarrito,
        total,
        cantidadTotal,
        recoveryOpen,
        openRecovery,
        closeRecovery
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
