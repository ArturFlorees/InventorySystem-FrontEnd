import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí tengo que poner la lógica de autenticación
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <div className="login-page">
      <div className="navbarlog">
      <Link className="home" to="/dashboard">
          <h2 className="home">PCTECHNOSYSTEM</h2> 
        </Link>
      </div>
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Iniciar sesión</button>
          <Link to="/register">
            <button type="button" className="register-button">Registrarse</button>
          </Link>
          <a href="#" className="forgot-password">Olvidé mi contraseña...</a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;


