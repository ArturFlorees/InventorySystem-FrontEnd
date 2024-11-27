import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AddEditProducts.css';

function AddEditProducts() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState(null);

  const handleSaveChanges = () => {
    // Aquí me hace falta poner la lógica para guardar los cambios del producto
    console.log('Guardando cambios...', { productName, quantity, unitPrice, category, location });
  };

  return (
    <div className="add-edit-product-page">
      <div className="navbaradd">
        <Link className="home" to="/dashboard">
          <h2>PCTECHNOSYSTEM</h2> 
        </Link>
        <div className="user-info">
          <span className='user'>Alan</span>
          <div className="user-icon">
            {/* <img src="https://via.placeholder.com/30" alt="User Icon" /> */}
          </div>
        </div>
      </div>
      <div className="add-edit-product-container">
        <h2>Añadir/Editar productos</h2>
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input 
              type="text" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Precio unitario</label>
            <input
              type="number"
              value={unitPrice} 
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccionar categoría</option>
              <option value="Redes">Redes</option>
              <option value="CCTV">CCTV</option>
              <option value="Seguridad">Seguridad</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ubicación</label>
            <select 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Seleccionar ubicación</option>
              <option value="P1R1">Pasillo 1 - Rack 1</option>
              <option value="P1R2">Pasillo 1 - Rack 2</option>
              <option value="P2R1">Pasillo 2 - Rack 1</option>
              <option value="P2R2">Pasillo 2 - Rack 2</option>
              <option value="P3R1">Pasillo 3 - Rack 1</option>
              <option value="P3R2">Pasillo 3 - Rack 2</option>
              <option value="P4R1">Pasillo 4 - Rack 1</option>
              <option value="P4R2">Pasillo 4 - Rack 2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Imagen del producto</label>
            <div className="image-upload-container">
              <p>Arrastra y suelta para subir</p>
              <button type="button" onClick={() => document.querySelector('input[type="file"]').click()}>Escoger imagen</button>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button">Cancelar</button>
            <button type="button" className="save-button" onClick={handleSaveChanges}>Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditProducts;
