import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Inventory.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import productsData from '../pages/data'; // Importar datos iniciales

function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Cargar productos solo al inicio de la aplicación
    const initializeProducts = () => {
      const storedProducts = JSON.parse(localStorage.getItem('products'));

      if (!storedProducts) {
        // Si no hay productos en localStorage, guardar los datos iniciales
        localStorage.setItem('products', JSON.stringify(productsData));
        setProducts(productsData);
      } else {
        // Si ya existen productos, cargarlos desde localStorage
        setProducts(storedProducts);
      }
    };

    // Cargar el usuario logueado
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }

    initializeProducts();
  }, []);

  const handleDelete = (id) => {
    if (isDeleting) return;

    setIsDeleting(true);
    setTimeout(() => {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // Actualizar localStorage
      setIsDeleting(false);
    }, 500);
  };

  const handleEdit = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Actualizar localStorage
  };

  const handleAdd = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Actualizar localStorage
  };

  const filteredProducts = products.filter(
      (product) => product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredProducts.length > 0 ? (
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
                            <img
                                src={product.image || 'https://via.placeholder.com/100'}
                                alt={product.name || 'Producto sin nombre'}
                            />
                          </div>
                          {product.name}
                        </div>
                      </td>
                      <td>{product.category || 'Sin categoría'}</td>
                      <td>{product.quantity || 0}</td>
                      <td>${(product.price || 0).toFixed(2)}</td>
                      <td>{product.location || 'Sin ubicación'}</td>
                      <td>{product.date || 'Sin fecha'}</td>
                      <td>
                        <Link to={`/edit-product/${product.id}`}>
                          <button className="edit-button">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(product.id)}
                            disabled={isDeleting}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          ) : (
              <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
  );
}

export default Inventory;
