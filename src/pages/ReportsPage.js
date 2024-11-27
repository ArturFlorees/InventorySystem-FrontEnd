import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ReportsPage.css';
import { FaBox, FaClipboardList, FaPlus } from 'react-icons/fa';

function Reports() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  return (
      <div className="reports-page">
        {/* Navbar */}
        <div className="navbarrep">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
          <div className="user-info">
            <span className="user-name">{loggedInUser.username}</span>
            <img
                src={loggedInUser.avatar || 'https://via.placeholder.com/50'}
                alt="User Avatar"
                className="user-avatar"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-rep">
          <h2>Reportes</h2>
          <p>Seguimiento y gestión del inventario</p>

          <h3>Reportes de inventario</h3>
          <div className="report-items">
            {/* Link to Actual Stock Report */}
            <Link className="home" to="/repactualstock">
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
            </Link>

            {/* Link to Inventory Cost Report */}
            <Link className="home" to="/repinventorycost">
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
            </Link>
          </div>

          <h3>Crear un nuevo reporte</h3>
          <Link className="home" to="/repcustom">
            <div className="create-report">
              <div className="icon">
                <FaPlus />
              </div>
              <p>Crear reporte personalizado</p>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default Reports;
