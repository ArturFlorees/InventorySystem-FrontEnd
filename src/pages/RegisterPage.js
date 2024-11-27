import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Obtener usuarios existentes desde localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validar si el nombre de usuario ya existe
    if (users.some((user) => user.username === username)) {
      setError('El usuario ya existe. Elige otro nombre.');
      return;
    }

    // Generar un ID único para el usuario
    const newId = (users.length + 1).toString().padStart(3, '0');

    // Crear el nuevo usuario con los campos necesarios
    const newUser = {
      id: newId,
      name: username,
      username,
      email,
      password,
      position: '', // Campo vacío para que lo editen posteriormente
      employeeNumber: '', // Campo vacío para que lo editen posteriormente
      avatar: 'https://via.placeholder.com/150', // Imagen por defecto
    };

    // Guardar el nuevo usuario en localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
      <div className="register-page">
        <div className="navbarreg">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
        </div>
        <div className="register-container">
          <h2>Regístrate</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Usuario</label>
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <div className="input-group">
              <label>Confirmar contraseña</label>
              <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
            </div>
            <div className="input-group">
              <label>Correo electrónico</label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="register-button">
              Registrarse
            </button>
          </form>
        </div>
      </div>
  );
}

export default RegisterPage;
