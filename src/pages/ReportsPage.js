import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ReportsPage.css';
import { FaBox, FaClipboardList, FaPlus } from 'react-icons/fa';

function Reports() {
  return (
    <div className="reports-page">
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
      <div className="main-content-rep">
        <h2>Reportes</h2>
        <p>Seguimiento y gestión del inventario</p>

        <h3>Reportes de inventario</h3>
        <div className="report-items">
          <div className="report-item">
            <div className="icon">
              <FaClipboardList />
            </div>
           
            <div className="report-info">
              <h4>Niveles de inventario</h4>
              <p>Monitorear niveles de inventario, recibir alertas de inventario bajo y reordenar productos</p>
            </div>
            <div className="arrow">&#8594;</div>
          </div>
          <div className="report-item">
            <div className="icon">
              <FaBox />
            </div>
            <div className="report-info">
              <h4>Reporte general</h4>
              <p>Obtener una vista integral del inventario con este reporte</p>
            </div>
            <div className="arrow">&#8594;</div>
          </div>
        </div>

        <h3>Crear un nuevo reporte</h3>
        <div className="create-report">
          <div className="icon">
            <FaPlus />
          </div>
          <p>Crear reporte personalizado</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;
