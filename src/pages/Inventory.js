import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Inventory.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Inventory() {
  return (
    <div className="inventory-page">
      <div className="navbarrep">
      <Link className="home" to="/dashboard">
          <h2 className="home">PCTECHNOSYSTEM</h2> 
        </Link>
        <div className="user-info">
        <Link className="home" to="/editprofile">
          <span className='user'>Alan</span>
          </Link>
          <div className="user-icon">
            {/* <img src="https://via.placeholder.com/30" alt="User Icon" /> */}
          </div>
        </div>
      </div>
      
      <div className="inventory-container">
      <div className="header">
          <h2>Productos</h2>
        </div>
        <span className="total-items">90 Artículos</span>
        <div className="filters">
          <input type="text" placeholder="Producto o ID" className="search-input" />
          <select className="filter-select">
            <option value="">Filtrar</option>
            <option value="category">Categoría</option>
            <option value="location">Ubicación</option>
          </select>
        </div>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Ubicación</th>
              <th>Fecha de ingreso</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>
                <div className="product-info">
                  <div className="product-image">
                    <img src="https://via.placeholder.com/50" alt="Producto" />
                  </div>
                  Switch CISCO CATALYST 9200
                </div>
              </td>
              <td>Redes</td>
              <td>20</td>
              <td>$57,042.99</td>
              <td>Pasillo 1 - Rack 2</td>
              <td>05/12/2024</td>
              <td>
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrashAlt /></button>
              </td>
            </tr>
            <tr>
              <td>002</td>
              <td>
                <div className="product-info">
                  <div className="product-image">
                    <img src="https://via.placeholder.com/50" alt="Producto" />
                  </div>
                  Firewall Fortinet FortiGate 60F
                </div>
              </td>
              <td>Redes</td>
              <td>20</td>
              <td>$28,000.00</td>
              <td>Pasillo 1 - Rack 2</td>
              <td>01/12/2024</td>
              <td>
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrashAlt /></button>
              </td>
            </tr>
            <tr>
              <td>003</td>
              <td>
                <div className="product-info">
                  <div className="product-image">
                    <img src="https://via.placeholder.com/50" alt="Producto" />
                  </div>
                  Router tp-link Archer B550 Wi-Fi 7
                </div>
              </td>
              <td>Redes</td>
              <td>20</td>
              <td>$6,720.00</td>
              <td>Pasillo 2 - Rack 2</td>
              <td>01/12/2024</td>
              <td>
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrashAlt /></button>
              </td>
            </tr>
            <tr>
              <td>004</td>
              <td>
                <div className="product-info">
                  <div className="product-image">
                    <img src="https://via.placeholder.com/50" alt="Producto" />
                  </div>
                  HikVision Cámara IP Bullet IR
                </div>
              </td>
              <td>CCTV</td>
              <td>30</td>
              <td>$5,604.00</td>
              <td>Pasillo 2 - Rack 2</td>
              <td>01/12/2024</td>
              <td>
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrashAlt /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
