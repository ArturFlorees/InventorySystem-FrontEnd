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

          <h3>Reportes de inventario predeterminados</h3>
          <div className="report-items">
            {/* Link to Actual Stock Report */}
            <Link className="home" to="/repactualstock">
              <div className="report-item">
                <div className="icon">
                  <FaClipboardList />
                </div>
                <div className="report-info">
                  <h4>Reporte de stock actual</h4>
                  <p>Con este reporte monitorea los niveles del stock</p>
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
                  <h4>Reporte de costos de inventario</h4>
                  <p>Con este reporte obtén una vista integral del costo del inventario</p>
                </div>
                <div className="arrow">&#8594;</div>
              </div>
            </Link>
            <p className="parrafo">¡Expórtalos en el formato que desees!</p>
          </div>

          <h3>Crear un reporte personalizado</h3>
          <Link className="home" to="/repcustom">
            <div className="create-report">
              <div className="icon">
                <FaPlus />
              </div>
              <p>Crea un reporte que se adapte totalmente a tus necesidades</p>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default Reports;