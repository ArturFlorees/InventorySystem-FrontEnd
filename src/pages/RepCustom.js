// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/RepCustom.css';

// function CustomReports() {
//   const [filters, setFilters] = useState({
//     category: '',
//     stockLevel: '',
//     sortBy: '',
//     sortOrder: '',
//     includeColumns: {
//       productName: true,
//       category: true,
//       stock: true,
//       unitPrice: true,
//       dateAdded: true,
//     },
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleColumnToggle = (column) => {
//     setFilters((prev) => ({
//       ...prev,
//       includeColumns: {
//         ...prev.includeColumns,
//         [column]: !prev.includeColumns[column],
//       },
//     }));
//   };

//   return (
//     <div className="custom-reports-page">
//       <div className="navbarrep">
//       <Link className="home" to="/dashboard">
//           <h2 className="home">PCTECHNOSYSTEM</h2> 
//         </Link>
//         <div className="user-info">
//         <Link className="home" to="/editprofile">
//           <span className='user'>Alan</span>
//           </Link>
//         </div>
//       </div>
//       <div className="main-content-custom-reports">
//         <h2>Custom Reports</h2>
//         <div className="filter-section">
//           <div className="filter-options">
//             <label>
//               Category:
//               <select name="category" value={filters.category} onChange={handleFilterChange}>
//                 <option value="">All</option>
//                 <option value="Laptops">Laptops</option>
//                 <option value="Desktops">Desktops</option>
//                 <option value="Tablets">Tablets</option>
//               </select>
//             </label>
//             <label>
//               Stock Level:
//               <select name="stockLevel" value={filters.stockLevel} onChange={handleFilterChange}>
//                 <option value="">All</option>
//                 <option value="Normal">Normal</option>
//                 <option value="Low">Low</option>
//                 <option value="Critical">Critical</option>
//               </select>
//             </label>
//             <label>
//               Sort By:
//               <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
//                 <option value="">None</option>
//                 <option value="alphabetical">Alphabetical</option>
//                 <option value="stock">Stock</option>
//                 <option value="price">Price</option>
//               </select>
//             </label>
//             <label>
//               Sort Order:
//               <select name="sortOrder" value={filters.sortOrder} onChange={handleFilterChange}>
//                 <option value="">None</option>
//                 <option value="asc">Ascending</option>
//                 <option value="desc">Descending</option>
//               </select>
//             </label>
//           </div>
//           <div className="column-toggle">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={filters.includeColumns.productName}
//                 onChange={() => handleColumnToggle('productName')}
//               />
//               Product Name
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={filters.includeColumns.category}
//                 onChange={() => handleColumnToggle('category')}
//               />
//               Category
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={filters.includeColumns.stock}
//                 onChange={() => handleColumnToggle('stock')}
//               />
//               Stock Available
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={filters.includeColumns.unitPrice}
//                 onChange={() => handleColumnToggle('unitPrice')}
//               />
//               Unit Price
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={filters.includeColumns.dateAdded}
//                 onChange={() => handleColumnToggle('dateAdded')}
//               />
//               Date Added
//             </label>
//           </div>
//         </div>
//         <div className="preview-section">
//           <h3>Report Preview</h3>
//           <table className="report-preview">
//             <thead>
//               <tr>
//                 {filters.includeColumns.productName && <th>Product Name</th>}
//                 {filters.includeColumns.category && <th>Category</th>}
//                 {filters.includeColumns.stock && <th>Stock Available</th>}
//                 {filters.includeColumns.unitPrice && <th>Unit Price</th>}
//                 {filters.includeColumns.dateAdded && <th>Date Added</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {/* Example data, you can replace with actual filtered data */}
//               <tr>
//                 {filters.includeColumns.productName && <td>Macbook Pro 15"</td>}
//                 {filters.includeColumns.category && <td>Laptops</td>}
//                 {filters.includeColumns.stock && <td>100</td>}
//                 {filters.includeColumns.unitPrice && <td>$2500</td>}
//                 {filters.includeColumns.dateAdded && <td>2024-10-01</td>}
//               </tr>
//               <tr>
//                 {filters.includeColumns.productName && <td>iMac</td>}
//                 {filters.includeColumns.category && <td>Desktops</td>}
//                 {filters.includeColumns.stock && <td>150</td>}
//                 {filters.includeColumns.unitPrice && <td>$2000</td>}
//                 {filters.includeColumns.dateAdded && <td>2024-11-05</td>}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomReports;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RepCustom.css';

function CustomReports() {
  const [filters, setFilters] = useState({
    category: '',
    stockLevel: '',
    sortBy: '',
    sortOrder: '',
    includeColumns: {
      productName: true,
      category: true,
      stock: true,
      unitPrice: true,
      dateAdded: true,
    },
  });

  const [data, setData] = useState([
    { productName: "Switch CISCO CATALYST 9200", category: "Redes", stock: 5, unitPrice: 57042.99, dateAdded: "2024-10-01" },
    { productName: "Firewall Fortinet FortiGate 60F", category: "Redes", stock: 20, unitPrice: 28000.00, dateAdded: "2024-11-05" },
    { productName: "Router tp-link Archer B550 Wi-Fi 7", category: "Redes", stock: 20, unitPrice: 6720.00, dateAdded: "2024-09-15" },
    { productName: "HikVision Cámara IP Bullet IR", category: "CCTV", stock: 30, unitPrice: 5604.00, dateAdded: "2024-08-10" },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleColumnToggle = (column) => {
    setFilters((prev) => ({
      ...prev,
      includeColumns: {
        ...prev.includeColumns,
        [column]: !prev.includeColumns[column],
      },
    }));
  };

  const filteredData = data
    .filter((item) => {
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      if (filters.stockLevel) {
        if (
          (filters.stockLevel === 'Normal' && item.stock < 30) ||
          (filters.stockLevel === 'Low' && (item.stock > 20 || item.stock <= 10)) ||
          (filters.stockLevel === 'Critical' && item.stock > 10)
        ) {
          return false;
        }
        if (filters.stockLevel === 'Normal' && item.stock >= 30) {
            return true;
          } else if (filters.stockLevel === 'Low' && item.stock <= 20 && item.stock > 10) {
            return true;
          } else if (filters.stockLevel === 'Critical' && item.stock <= 10) {
            return true;
          }
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'alphabetical') {
        if (filters.sortOrder === 'asc') {
          return a.productName.localeCompare(b.productName);
        } else if (filters.sortOrder === 'desc') {
          return b.productName.localeCompare(a.productName);
        }
      } else if (filters.sortBy === 'stock') {
        if (filters.sortOrder === 'asc') {
          return a.stock - b.stock;
        } else if (filters.sortOrder === 'desc') {
          return b.stock - a.stock;
        }
      } else if (filters.sortBy === 'price') {
        if (filters.sortOrder === 'asc') {
          return a.unitPrice - b.unitPrice;
        } else if (filters.sortOrder === 'desc') {
          return b.unitPrice - a.unitPrice;
        }
      }
      return 0;
    });

  return (
    <div className="custom-reports-page">
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
      <div className="main-content-custom-reports">
        <h2>Reporte personalizado</h2>
        <div className="filter-section">
          <div className="filter-options">
            <label>
              Categoría:
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="Redes">Redes</option>
                <option value="CCTV">CCTV</option>
                <option value="Seguridad">Seguridad</option>
              </select>
            </label>
            <label>
              Nivel de stock:
              <select name="stockLevel" value={filters.stockLevel} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="Normal">Normal</option>
                <option value="Low">Bajo</option>
                <option value="Critical">Crítico</option>
              </select>
            </label>
            <label>
              Ordenar por:
              <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="">Ninguno</option>
                <option value="alphabetical">Alfabéticamente</option>
                <option value="stock">Cantidad</option>
                <option value="price">Precio</option>
              </select>
            </label>
            <label>
              Ordenar:
              <select name="sortOrder" value={filters.sortOrder} onChange={handleFilterChange}>
                <option value="">Ninguno</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </label>
          </div>
          <div className="column-toggle">
            <label>
              <input
                type="checkbox"
                checked={filters.includeColumns.productName}
                onChange={() => handleColumnToggle('productName')}
              />
              Producto
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.includeColumns.category}
                onChange={() => handleColumnToggle('category')}
              />
              Categoría
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.includeColumns.stock}
                onChange={() => handleColumnToggle('stock')}
              />
              Stock disponible
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.includeColumns.unitPrice}
                onChange={() => handleColumnToggle('unitPrice')}
              />
              Precio unitario
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.includeColumns.dateAdded}
                onChange={() => handleColumnToggle('dateAdded')}
              />
              Fecha de ingreso
            </label>
          </div>
        </div>
        <div className="preview-section">
          <h3>Previsualización del reporte</h3>
          <table className="report-preview">
            <thead>
              <tr>
                {filters.includeColumns.productName && <th>Producto</th>}
                {filters.includeColumns.category && <th>Categoría</th>}
                {filters.includeColumns.stock && <th>Stock disponible</th>}
                {filters.includeColumns.unitPrice && <th>Precio unitario</th>}
                {filters.includeColumns.dateAdded && <th>Fecha de ingreso</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  {filters.includeColumns.productName && <td>{item.productName}</td>}
                  {filters.includeColumns.category && <td>{item.category}</td>}
                  {filters.includeColumns.stock && <td>{item.stock}</td>}
                  {filters.includeColumns.unitPrice && <td>${item.unitPrice}</td>}
                  {filters.includeColumns.dateAdded && <td>{item.dateAdded}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="export-rep-cus">
          <button className="export-buttons-reports-custom">Exportar a Excel</button>
          <button className="export-buttons-reports-custom">Exportar a PDF</button>
          <button className="export-buttons-reports-custom">Exportar a CSV</button>
        </div>
      </div>
    </div>
  );
}

export default CustomReports;

