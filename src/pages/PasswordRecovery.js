import React, { useState } from 'react';
import '../styles/PasswordRecovery.css';

function PasswordRecovery() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí debo meter la lógica para enviar la solicitud de recuperación de contraseña
    console.log('Solicitud enviada para:', { username, email });
  };

  return (
    <div className="password-recovery-page">
      <div className="recovery-container">
        <h2>Recuperación de Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="send-button">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecovery;
