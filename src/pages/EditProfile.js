import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EditProfile.css';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="edit-profile-page">
      <div className="navbared">
      <Link className="home" to="/dashboard">
          <h2 className="home">PCTECHNOSYSTEM</h2> 
        </Link>
      </div>
      <div className="edit-profile-container">
        <div className="profile-picture">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <form>
          <div className="form-group">
            <label>Usuario</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>No. Empleado</label>
            <input 
              type="text" 
              value={employeeNumber} 
              onChange={(e) => setEmployeeNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Puesto</label>
            <input 
              type="text" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="buttons-container">
          <button type="button" className="cancel-button">Cancelar</button>
          <button type="button" className="logout-button">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
