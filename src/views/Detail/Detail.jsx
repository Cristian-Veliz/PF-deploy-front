import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import style from '../Detail/Detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFurnitures } from '../../components/redux/actions/Actions';
import { CartContext } from '../../components/Context/CartContext';

const Detail = ({ actualizarCantidadTotal, cantidadTotal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allFurnitures = useSelector((state) => state.allFurnitures);
  const history = useHistory();

  const { addItem } = useContext(CartContext); // Obtengo la función addItem del contexto

  const [contador, setContador] = useState(1);
  const [productoAgregado, setProductoAgregado] = useState(false);
  const [mostrarControles, setMostrarControles] = useState(true);

  useEffect(() => {
    if (!allFurnitures.length) {
      dispatch(getAllFurnitures());
    }
  }, [dispatch, allFurnitures]);

  if (!allFurnitures.length) {
    return <div>Loading...</div>;
  }

  const furniture = allFurnitures.find((item) => item.id === parseInt(id, 10));

  if (!furniture) {
    return <div>Furniture not found</div>;
  }

  const { image, name, price, colors, description } = furniture;
  const colorString = Array.isArray(colors) ? colors.join(', ') : '';

  const aumentarContador = () => {
    setContador(contador + 1);
  };

  const disminuirContador = () => {
    if (contador > 1) {
      setContador(contador - 1);
    }
  };

  const agregarAlCarrito = () => {
    // Se llama a la función addItem del contexto para agregar el producto al carrito
    addItem(furniture, contador);
    setProductoAgregado(true);
    setMostrarControles(false);
    console.log(`Agregado al carrito: ${contador} ${name}`);

    // Actualiza la cantidad total en el contexto directamente
    const nuevaCantidadTotal = cantidadTotal + contador;
    actualizarCantidadTotal(nuevaCantidadTotal);
  };

  const redireccionarACarrito = () => {
    history.push('/cart');
  };

  const redireccionarAHome = () => {
    history.push('/home');
  };

  return (
    <div key={id} className={style.container}>
      <div key={id} className={style.container}></div>
      <div className={style.name}>
        <img src={image} alt={name} />
        <h3>Name: {name}</h3>
        <h3>Colors: {colorString}</h3>
        <h3>Description: {description}</h3>
        <h3>Price: {`${price} usd`}</h3>

        <div>
          {mostrarControles && (
            <>
              <button onClick={disminuirContador}>-</button>
              <span>{contador}</span>
              <button onClick={aumentarContador}>+</button>
            </>
          )}
        </div>

        {productoAgregado && (
          <div>
            <button onClick={redireccionarAHome}>Seguir Comprando</button>
            <button onClick={redireccionarACarrito}>Ver Carrito</button>
          </div>
        )}

        {!productoAgregado && (
          <div>
            <button onClick={agregarAlCarrito}>Agregar al carrito</button>
            <button onClick={redireccionarAHome}>Productos</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
