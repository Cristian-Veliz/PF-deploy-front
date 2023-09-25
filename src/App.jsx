import React, { useState } from 'react';
import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail.jsx';
import MyOrders from './views/MyOrders/MyOrders';
import Contact from './views/Contact/Contact';
import About from './views/About/About';
import CardWidget from './components/CardWidget/CardWidget';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
// import Form from './components/FormLogin/Form';
import { CarritoProvider } from './components/Context/CartContext';
import Login from './views/Login/Login';
import NewPassword from './components/NewPassword/NewPassword';
import Register from './components/RegisterUser/Register';

function App() {
  const { pathname } = useLocation();

  // Estado local para la cantidad total de compras
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // Función para actualizar la cantidad total
  const actualizarCantidadTotal = (cantidad) => {
    setCantidadTotal(cantidad);
  };

  return (
    <div className="App">
      <CarritoProvider>
        {pathname === '/' ? null : (
          <NavBar
            cantidadTotal={cantidadTotal}
            actualizarCantidadTotal={actualizarCantidadTotal}
          />
        )}
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route
            exact
            path='/products/:id'
            render={(props) => (
              <Detail
                {...props}
                actualizarCantidadTotal={actualizarCantidadTotal}
                cantidadTotal={cantidadTotal}
              />
            )}
          />
          <Route exact path='/orders' component={MyOrders} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/about' component={About} />
          <Route exact path='/checkout' component={Checkout} /> 
          <Route exact path='/login' component={Login} /> 
          <Route exact path='/newPassword' component={NewPassword} /> 
          <Route exact path='/register' component={Register} /> 
          <Route
            exact
            path='/cart'
            render={(props) => (
              <Cart
              {...props}
              actualizarCantidadTotal={actualizarCantidadTotal}
              cantidadTotal={cantidadTotal}
              />
              )}
          />
        </Switch>
      </CarritoProvider>
    </div>
  );
}

export default App;


//agregar boton de My profile y Logout al lado izquierdo del logo del carrito, en un div aparte siguiendo el css de la nav. 





// function App() {
//   const {pathname} = useLocation();
//   return (
//     <div className="App">
//       {pathname === '/' ? null : <NavBar/>  }
//       <Switch>
//         <Route exact path='/' component={Landing}/>
//         <Route exact path='/home' component={Home}/>
//         <Route exact path='/products/:id' component={Detail}/>
//         <Route exact path='/orders' component={MyOrders}/>
//         <Route exact path='/contact' component={Contact}/>
//         <Route exact path='/about' component={About}/>
//         <Route exact path='/cart' component={CardWidget}/>
//         {/* <Route exact path='*' component={NotFound}/> */}
//       </Switch>

//     </div>
//   );
// }

// export default App;

