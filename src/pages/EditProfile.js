import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/EditProfile.css';
import usersData from '../pages/usersData'; // Datos iniciales de usuarios
import { FaCamera } from 'react-icons/fa';

function EditProfile() {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    employeeNumber: '',
    position: '',
    avatar: '', // Campo para la foto de perfil
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || usersData;
    const userToEdit = storedUsers.find((user) => user.id === id);

    if (userToEdit) {
      setUserData({
        username: userToEdit.username || '',
        email: userToEdit.email || '',
        employeeNumber: userToEdit.employeeNumber || '',
        position: userToEdit.position || '',
        avatar: userToEdit.avatar || 'https://via.placeholder.com/150', // Imagen por defecto si no tiene una foto de perfil
      });
    } else {
      alert('Usuario no encontrado');
      navigate('/userlist'); // Redirigir a la gestión de usuarios si el ID no es válido
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUserData((prevData) => ({ ...prevData, avatar: event.target.result }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Solo se permiten imágenes en formato PNG o JPG.');
        e.target.value = null; // Limpiar el campo de archivo
      }
    }
  };

  const handleSaveChanges = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || usersData;

    const updatedUsers = storedUsers.map((user) =>
        user.id === id ? { ...user, ...userData } : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Perfil actualizado correctamente');
    navigate('/userlist'); // Redirigir a la gestión de usuarios
  };

  return (
      <div className="edit-profile-page">
        <div className="navbared">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
        </div>
        <div className="edit-profile-container">
          <div className="profile-picture">
            <img src={userData.avatar} alt="Profile" />
            <label htmlFor="file-upload" className="upload-icon">
              <FaCamera />
            </label>
            <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
          </div>
          <form>
            <div className="form-group">
              <label>Usuario</label>
              <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>No. Empleado</label>
              <input
                  type="text"
                  name="employeeNumber"
                  value={userData.employeeNumber}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>Puesto</label>
              <input
                  type="text"
                  name="position"
                  value={userData.position}
                  onChange={handleInputChange}
                  required
              />
            </div>
            <div className="buttons-container">
              <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate('/userlist')}
              >
                Cancelar
              </button>
              <button
                  type="button"
                  className="logout-button"
                  onClick={handleSaveChanges}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default EditProfile;
