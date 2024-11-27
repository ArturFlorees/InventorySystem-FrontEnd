import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Inventory.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import productsData from '../pages/data'; // Importar datos iniciales

function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    // Obtener productos del localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Combinar productos de data.js y localStorage
    const combinedProducts = [
      ...productsData.filter(
          (dataProduct) =>
              !storedProducts.some((storedProduct) => storedProduct.id === dataProduct.id)
      ),
      ...storedProducts,
    ];

    // Guardar productos combinados en localStorage
    localStorage.setItem('products', JSON.stringify(combinedProducts));

    // Actualizar el estado con los productos combinados
    setProducts(combinedProducts);

    // Obtener el usuario que inició sesión
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleDelete = (id) => {
    // Eliminar el producto del estado
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);

    // Actualizar el localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert(`Producto con ID ${id} eliminado.`);
  };

  const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="inventory-page">
        <div className="navbarrep">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
          <div className="user-info">
            <span className="user-name">{loggedInUser.username || 'Usuario'}</span>
            <img
                className="user-avatar"
                src={loggedInUser.avatar || 'https://via.placeholder.com/50'}
                alt="Avatar"
            />
          </div>
        </div>

        <div className="inventory-container">
          <div className="header">
            <h2>Productos</h2>
          </div>
          <span className="total-items">{products.length} Artículos</span>
          <div className="filters">
            <input
                type="text"
                placeholder="Producto o ID"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className="product-info">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      {product.name}
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.location}</td>
                  <td>{product.date}</td>
                  <td>
                    <Link to={`/edit-product/${product.id}`}>
                      <button className="edit-button">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                        className="delete-button"
                        onClick={() => handleDelete(product.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default Inventory;
