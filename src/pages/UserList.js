import React, { useEffect, useState } from 'react';
import '../styles/UserList.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import usersData from '../pages/usersData'; // Datos iniciales de usuarios

function UserList() {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null); // Usuario seleccionado para eliminar
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar datos desde `localStorage` o usar `usersData` como base
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers) {
            setUsers(storedUsers);
        } else {
            setUsers(usersData);
            localStorage.setItem('users', JSON.stringify(usersData)); // Inicializar `localStorage`
        }
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }, [users]);

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setUserToDelete(null);
        alert('Usuario eliminado correctamente.');
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
            <div className="user-list">
                {users.map((user) => (
                    <div className="user-item" key={user.id}>
                        <img src={user.avatar} alt={user.name} className="user-avatar" />
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
