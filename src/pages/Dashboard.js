import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { FaBox, FaUserFriends, FaFileAlt, FaUsers, FaDollarSign, FaTags, FaExclamationTriangle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalStock: 0,
    totalInventoryValue: 0,
    lowStockAlerts: 0,
    totalCategories: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUsername(loggedInUser.username);
      setUserId(loggedInUser.id);
      calculateStats(storedProducts, storedUsers); // Calcular estadísticas desde `localStorage`
    }
  }, [navigate]);

  const calculateStats = (inventoryData, usersData) => {
    const totalValue = inventoryData.reduce(
        (acc, product) => acc + (product.price || 0) * (product.quantity || 0),
        0
    );
    const lowStock = inventoryData.filter((product) => product.quantity <= 10).length;
    const categories = [...new Set(inventoryData.map((product) => product.category))].length;

    setStats({
      totalProducts: inventoryData.length,
      totalUsers: usersData.length,
      totalStock: inventoryData.reduce((acc, product) => acc + (product.quantity || 0), 0),
      totalInventoryValue: totalValue,
      lowStockAlerts: lowStock,
      totalCategories: categories,
    });
  };

  return (
      <div className="dashboard-page">
        <div className="sidebardash">
          <h2>PCTECHNOSYSTEM</h2>
          <ul>
            <Link className="home" to="../inventory">
              <li><FaBox /> Inventario</li>
            </Link>
            <Link className="home" to={`/editprofile/${userId}`}>
              <li><FaUserFriends /> Mi perfil</li>
            </Link>
            <Link className="home" to="../reports">
              <li><FaFileAlt /> Reportes</li>
            </Link>
            <Link className="home" to="../userlist">
              <li><FaUsers /> Gestión de Usuarios</li>
            </Link>
          </ul>
        </div>
        <div className="main-content-dash">
          <h2>¡Bienvenido, {username || 'Usuario'}!</h2>
          <div className="inventory-count">
            <div className="count-info">
              <h3>Añade un nuevo producto al inventario</h3>
              <p>El producto estará disponible en breve</p>
            </div>
            <Link className="home" to="../addeditproducts">
              <button className="add-product-button">Añadir producto</button>
            </Link>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card stat-products">
              <FaBox className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.totalProducts}</h3>
                <p>Productos Totales</p>
              </div>
            </div>
            <div className="stat-card stat-users">
              <FaUsers className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.totalUsers}</h3>
                <p>Usuarios Totales</p>
              </div>
            </div>
            <div className="stat-card stat-stock">
              <FaBox className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.totalStock}</h3>
                <p>Existencias Totales</p>
              </div>
            </div>
            <div className="stat-card stat-inventory-value">
              <FaDollarSign className="stat-icon" />
              <div className="stat-info">
                <h3>${stats.totalInventoryValue.toLocaleString('es-MX')}</h3>
                <p>Valor Inventario</p>
              </div>
            </div>
            <div className="stat-card stat-categories">
              <FaTags className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.totalCategories}</h3>
                <p>Categorías Totales</p>
              </div>
            </div>
            <div className="stat-card stat-alerts">
              <FaExclamationTriangle className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.lowStockAlerts}</h3>
                <p>Alertas de Stock Bajo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
