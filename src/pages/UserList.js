import React, { useEffect, useState } from 'react';
import '../styles/UserList.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import usersData from '../pages/usersData'; // Datos iniciales de usuarios

function UserList() {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null); // Usuario seleccionado para eliminar
    const [notification, setNotification] = useState(''); // Para manejar notificaciones
    const navigate = useNavigate();

    useEffect(() => {
        const initializeUsers = () => {
            // Obtener los usuarios almacenados en `localStorage`
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Crear una combinación única de usuarios de `usersData` y `storedUsers`
            const combinedUsers = [
                ...storedUsers,
                ...usersData.filter(
                    (userData) =>
                        !storedUsers.some((storedUser) => storedUser.id === userData.id)
                ),
            ];

            // Actualizar estado y `localStorage`
            setUsers(combinedUsers);
            localStorage.setItem('users', JSON.stringify(combinedUsers));
        };

        initializeUsers();
    }, []);

    const handleDeleteUser = (id) => {
        // Eliminar el usuario del estado
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);

        // Actualizar el `localStorage`
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Mostrar notificación
        setNotification('Usuario eliminado correctamente.');
        setTimeout(() => setNotification(''), 3000); // Desaparecer notificación después de 3 segundos

        // Limpiar la ventana de confirmación
        setUserToDelete(null);
    };

    const cancelDelete = () => {
        setUserToDelete(null);
    };

    return (
        <div className="user-list-container">
            <div className="navbarrep">
                <Link className="home" to="/dashboard">
                    <h2 className="home">PCTECHNOSYSTEM</h2>
                </Link>
            </div>
            <h2>Gestión de Usuarios</h2>
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
            <div className="user-list">
                {users.map((user) => (
                    <div className="user-item" key={user.id}>
                        <img
                            src={user.avatar || 'https://via.placeholder.com/100'}
                            alt={user.name}
                            className="user-avatar"
                        />
                        <span className="user-name">{user.name}</span>
                        <div className="user-actions">
                            <button
                                className="edit-button"
                                onClick={() => navigate(`/editprofile/${user.id}`)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => setUserToDelete(user)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmación */}
            {userToDelete && (
                <div className="delete-modal">
                    <p>
                        ¿Estás seguro de que deseas eliminar a{' '}
                        <strong>{userToDelete.name}</strong>?
                    </p>
                    <div className="modal-actions">
                        <button
                            className="confirm-delete-button"
                            onClick={() => handleDeleteUser(userToDelete.id)}
                        >
                            Confirmar
                        </button>
                        <button className="cancel-delete-button" onClick={cancelDelete}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;
