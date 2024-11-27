import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RepActualStock.css';
import { FaPlus } from 'react-icons/fa';

function ActualStockReport() {
  return (
    <div className="actual-stock-report-page">
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
      <div className="main-content">
        <div className="header">
          <h2>Stock Actual</h2>
          <button className="add-item-button">
            <FaPlus /> Add new item
          </button>
        </div>
        <h3>Detalles</h3>
        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Nivel de Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Switch CISCO CATALYST 9200</td>
                <td>Redes</td>
                <td>100</td>
                <td><span className="level normal">Normal</span></td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Firewall Fortinet FortiGate 60F</td>
                <td>Redes</td>
                <td>50</td>
                <td><span className="level low">Bajo</span></td>
              </tr>
              <tr>
                <td>#003</td>
                <td>Router tp-link Archer B550 Wi-Fi 7</td>
                <td>Redes</td>
                <td>20</td>
                <td><span className="level critical">Crítico</span></td>
              </tr>
              <tr>
                <td>#004</td>
                <td>HikVision Cámara IP Bullet IR</td>
                <td>CCTV</td>
                <td>150</td>
                <td><span className="level normal">Normal</span></td>
              </tr>
              <tr>
                <td>#3460</td>
                <td>iPad</td>
                <td>Tablets</td>
                <td>80</td>
                <td><span className="level low">Bajo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="export">
          <button className="export-buttons">Exportar a Excel</button>
          <button className="export-buttons">Exportar a PDF</button>
          <button className="export-buttons">Exportar a CSV</button>
        </div>
      </div>
    </div>
  );
}

export default ActualStockReport;
