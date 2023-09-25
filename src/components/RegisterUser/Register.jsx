import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "../../views/Login/Form.module.css";
import validation from "../../views/Login/validation";
import Logo from "../../assets/LogoDivano.jpg";
import axios from "axios";


export default function Register() {
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name:"",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(validation({ ...userData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3001/auth/register", userData);
        // const { name } = response.data;
        console.log("ddddd", response.data);
        history.push("/");
        // alert(`Bienvenido ${name}`);
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
      }
    }}

//   const handleLogin = () => {
//     dispatch(loginSuccess(userData));
//     history.push("/");
//   };
const isButtonDisabled = !userData.email || !userData.password || !userData.name;

  // const detailToShow = () => {
  //   context.openRecovery();
  // };

  return (
    <div>
      <div className={styles.contenedor}>
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Bienvenido</h1> {/* Título */}
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <p className={styles.errors}>{errors.email ? errors.email : null}</p>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <p className={styles.errors}>
            {errors.password ? errors.password : null}
          </p>
          <button type="submit" disabled={isButtonDisabled}>Crear Cuenta</button>
          
        </form>
      </div>
      
    </div>
  );
}
