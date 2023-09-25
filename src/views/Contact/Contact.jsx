import React, { useState, useRef } from 'react';
import "./Contact.module.css"
import styles from './Contact.module.css';

const Contact = () => {
  const datosFormulario = useRef(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    consulta: '',
  });

  const [errores, setErrores] = useState({
    nombre: '',
    apellido: '',
    email: '',
    consulta: '',
  });

  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const manejarCambio = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrores({ ...errores, [event.target.name]: '' });
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    const nuevosErrores = {};

    const letrasRegex = /^[A-Za-z]+$/;

    if (formData.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (!letrasRegex.test(formData.nombre) || formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe contener al menos 3 letras y solo letras';
    }

    if (formData.apellido.trim() === '') {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    } else if (!letrasRegex.test(formData.apellido) || formData.apellido.trim().length < 3) {
      nuevosErrores.apellido = 'El apellido debe contener al menos 3 letras y solo letras';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === '') {
      nuevosErrores.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido';
    }

    if (formData.consulta.trim() === '') {
      nuevosErrores.consulta = 'La consulta es obligatoria';
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      // Envía los datos del formulario si no hay errores
      // Aquí puedes agregar la lógica para enviar el correo electrónico
      // y luego mostrar el modal
      mostrarModal();
    }
  };

  const mostrarModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.contactanos}>
      <h3>Contacta con Nosotros</h3>
      <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. Estamos aquí para ayudarte en lo que necesites.</p>
      <h4>Déjanos tu consulta</h4>
      <form onSubmit={manejarEnvio} ref={datosFormulario} id='formulario' className={styles.formulario}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={manejarCambio} />
          {errores.nombre && <span className={styles.error}>{errores.nombre}</span>}
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" value={formData.apellido} onChange={manejarCambio} />
          {errores.apellido && <span className={styles.error}>{errores.apellido}</span>}
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={manejarCambio} />
          {errores.email && <span className={styles.error}>{errores.email}</span>}
        </label>
        <div id="consulta">
          <textarea
            placeholder="Escribe tus preguntas o comentarios aquí"
            name="consulta"
            value={formData.consulta}
            onChange={manejarCambio}
          ></textarea>
          {errores.consulta && <span className={styles.error}>{errores.consulta}</span>}
        </div>
        <br />
        <button type="submit">Enviar</button>
      </form>

      {/* Modal */}
      {modalVisible && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <h2>Consulta Enviada Exitosamente</h2>
            <p>Tu consulta se ha enviado correctamente. Nos pondremos en contacto contigo pronto.</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
