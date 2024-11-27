import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya hay un usuario logueado, redirigir al dashboard
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Reiniciar estados
    setError('');
    setLoading(true);

    // Simular una pequeña demora para la experiencia de usuario
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Verificar si el usuario existe y la contraseña es correcta
      const user = users.find(
          (user) => user.username === username && user.password === password
      );

      if (user) {
        // Guardar el usuario autenticado en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso');
        navigate('/dashboard'); // Redirigir al dashboard o página principal
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = () => {
    if (error) setError(''); // Limpiar errores al cambiar inputs
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
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleInputChange();
                  }}
                  required
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
                  required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
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
