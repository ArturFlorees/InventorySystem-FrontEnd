import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RepInventoryCost.css';
import { FaPlus } from 'react-icons/fa';

function InventoryCostReport() {
  return (
    <div className="inventory-cost-report-page">
      <div className="navbarrep">
      <Link className="home" to="/dashboard">
          <h2 className="home">PCTECHNOSYSTEM</h2> 
        </Link>
        <div className="user-info">
        <Link className="home" to="/editprofile">
          <span className='user'>Alan</span>
          </Link>
        </div>
      </div>
      <div className="main-content-inventory-cost">
        <div className="header">
          <h2>Costos de Inventario</h2>
          <button className="add-item-button">
            <FaPlus /> Add new item
          </button>
        </div>
        <h3>Detalles</h3>
        <div className="inventory-cost-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Switch CISCO CATALYST 9200</td>
                <td>Redes</td>
                <td>20</td>
                <td><span>$1,140,859.80</span></td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Firewall Fortinet FortiGate 60F</td>
                <td>Redes</td>
                <td>20</td>
                <td><span>$560,000.00</span></td>
              </tr>
              <tr>
                <td>#003</td>
                <td>Router tp-link Archer B550 Wi-Fi 7</td>
                <td>Redes</td>
                <td>20</td>
                <td><span>$134,400.00</span></td>
              </tr>
              <tr>
                <td>#004</td>
                <td>HikVision Cámara IP Bullet IR</td>
                <td>CCTV</td>
                <td>30</td>
                <td><span>$168,120.00</span></td>
              </tr>
              <tr>
                <td>#3460</td>
                <td>iPad</td>
                <td>Tablets</td>
                <td>80</td>
                <td><span>Bajo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="total">
          <span>Costo total del inventario: $2,003,379.80</span>
        </div>
        <div className="export">
          <button className="export-buttons-inventory-cost">Exportar a Excel</button>
          <button className="export-buttons-inventory-cost">Exportar a PDF</button>
          <button className="export-buttons-inventory-cost">Exportar a CSV</button>
        </div>
      </div>
    </div>
  );
}

export default InventoryCostReport;