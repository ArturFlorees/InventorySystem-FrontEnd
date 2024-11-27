import React from 'react';
import '../styles/Dashboard.css';
import { FaBox, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="sidebardash">
        <h2>PCTECHNOSYSTEM</h2>
        <ul>
          <Link className="home" to="../inventory">
          <li><FaBox /> Inventario</li>
          </Link>
          <Link className="home" to="../editprofile">
          <li><FaUserFriends /> Mi perfil</li>
          </Link>
          <Link className="home" to="../reports">
          <li><FaFileAlt /> Reportes</li>
          </Link>
        </ul>
      </div>
      <div className="main-content-dash">
        <h2>¡Bienvenido Alan!</h2>
        <div className="inventory-count">
          <div className="count-info">
            <h3>Añade un nuevo producto al inventario</h3>
            <p>El producto estará disponible en breve</p>
          </div>
          <Link className="home" to="../addeditproducts">
          <button className="add-product-button">Añadir producto</button>
          </Link>
        </div>
        <div className="subtitle">
          <h3>Productos principales</h3>
        </div>
        <div className="products-container">
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Switch Catalyst" />
            <h4>Switch Catalyst</h4>
            <p>20 unidades</p>
            <p>$57,042.99</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Firewall FortiGate" />
            <h4>Firewall FortiGate</h4>
            <p>20 unidades</p>
            <p>$28,000.00</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Router tp-link Archer" />
            <h4>Router tp-link Archer</h4>
            <p>20 unidades</p>
            <p>$6,720.00</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="HikVision Cámara IP" />
            <h4>HikVision Cámara IP</h4>
            <p>30 unidades</p>
            <p>$5,604.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
