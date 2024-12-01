import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RepCustom.css';
import productsData from '../pages/data';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CustomReports() {
  const [filters, setFilters] = useState({
    category: '',
    stockLevel: '',
    sortBy: '',
    sortOrder: '',
    includeColumns: {
      id: true,
      productName: true,
      category: true,
      stock: true,
      unitPrice: true,
      dateAdded: true,
    },
  });

  const [data, setData] = useState([]);

  // Cargar datos combinados de `data.js` y `localStorage`
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const combinedProducts = [
      ...productsData.filter(
          (dataProduct) =>
              !storedProducts.some((storedProduct) => storedProduct.id === dataProduct.id)
      ),
      ...storedProducts,
    ].map((product) => ({
      id: product.id || 'N/A',
      productName: product.name || product.productName || 'Sin nombre',
      category: product.category || 'Sin categoría',
      stock: product.quantity || product.stock || 0,
      unitPrice: product.price || product.unitPrice || 0,
      dateAdded: product.date || product.dateAdded || 'Sin fecha',
    }));
    setData(combinedProducts);
  }, []);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  
  // Manejar columnas visibles
  const handleColumnToggle = (column) => {
    setFilters((prev) => ({
      ...prev,
      includeColumns: {
        ...prev.includeColumns,
        [column]: !prev.includeColumns[column],
      },
    }));
  };

  // Aplicar filtros y ordenamiento
  const filteredData = data
      .filter((item) => {
        if (filters.category && item.category !== filters.category) {
          return false;
        }
        if (filters.stockLevel) {
          if (filters.stockLevel === 'Normal' && item.stock < 30) {
            return false;
          }
          if (filters.stockLevel === 'Low' && (item.stock > 20 || item.stock <= 10)) {
            return false;
          }
          if (filters.stockLevel === 'Critical' && item.stock > 10) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'alphabetical') {
          return filters.sortOrder === 'asc'
              ? a.productName.localeCompare(b.productName)
              : b.productName.localeCompare(a.productName);
        } else if (filters.sortBy === 'stock') {
          return filters.sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;
        } else if (filters.sortBy === 'price') {
          return filters.sortOrder === 'asc'
              ? a.unitPrice - b.unitPrice
              : b.unitPrice - a.unitPrice;
        }
        return 0;
      });

  // Exportar a Excel
  const exportToExcel = () => {
    const worksheetData = filteredData.map((item) => {
      const row = {};
      if (filters.includeColumns.id) row.ID = item.id;
      if (filters.includeColumns.productName) row.Producto = item.productName;
      if (filters.includeColumns.category) row.Categoría = item.category;
      if (filters.includeColumns.stock) row.Stock = item.stock;
      if (filters.includeColumns.unitPrice)
        row['Precio Unitario'] = `$${item.unitPrice.toFixed(2)}`;
      if (filters.includeColumns.dateAdded) row['Fecha de Ingreso'] = item.dateAdded;
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Personalizado');
    XLSX.writeFile(workbook, 'reporte_personalizado.xlsx');
  };

  // Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [];
    const tableRows = [];

    if (filters.includeColumns.id) tableColumn.push('ID');
    if (filters.includeColumns.productName) tableColumn.push('Producto');
    if (filters.includeColumns.category) tableColumn.push('Categoría');
    if (filters.includeColumns.stock) tableColumn.push('Stock');
    if (filters.includeColumns.unitPrice) tableColumn.push('Precio Unitario');
    if (filters.includeColumns.dateAdded) tableColumn.push('Fecha de Ingreso');

    filteredData.forEach((item) => {
      const row = [];
      if (filters.includeColumns.id) row.push(item.id);
      if (filters.includeColumns.productName) row.push(item.productName);
      if (filters.includeColumns.category) row.push(item.category);
      if (filters.includeColumns.stock) row.push(item.stock);
      if (filters.includeColumns.unitPrice)
        row.push(`$${item.unitPrice.toFixed(2)}`);
      if (filters.includeColumns.dateAdded) row.push(item.dateAdded);
      tableRows.push(row);
    });

    doc.text('Reporte Personalizado', 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save('reporte_personalizado.pdf');
  };

  // Exportar a CSV
  const exportToCSV = () => {
    const csvRows = [];
    const headers = [];

    if (filters.includeColumns.id) headers.push('ID');
    if (filters.includeColumns.productName) headers.push('Producto');
    if (filters.includeColumns.category) headers.push('Categoría');
    if (filters.includeColumns.stock) headers.push('Stock');
    if (filters.includeColumns.unitPrice) headers.push('Precio Unitario');
    if (filters.includeColumns.dateAdded) headers.push('Fecha de Ingreso');

    csvRows.push(headers.join(','));

    filteredData.forEach((item) => {
      const row = [];
      if (filters.includeColumns.id) row.push(item.id);
      if (filters.includeColumns.productName) row.push(item.productName);
      if (filters.includeColumns.category) row.push(item.category);
      if (filters.includeColumns.stock) row.push(item.stock);
      if (filters.includeColumns.unitPrice)
        row.push(`$${item.unitPrice.toFixed(2)}`);
      if (filters.includeColumns.dateAdded) row.push(item.dateAdded);
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'reporte_personalizado.csv');
    link.click();
  };

  return (
      <div className="custom-reports-page">
        <div className="navbarrep">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
          <div className="user-info">
            <Link className="home" to="/editprofile">
              <span className="user">Alan</span>
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
                    checked={filters.includeColumns.id}
                    onChange={() => handleColumnToggle('id')}
                />
                ID
              </label>
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
                {filters.includeColumns.id && <th>ID</th>}

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
                    {filters.includeColumns.id && <td>{item.id}</td>}
                    {filters.includeColumns.productName && <td>{item.productName}</td>}
                    {filters.includeColumns.category && <td>{item.category}</td>}
                    {filters.includeColumns.stock && <td>{item.stock}</td>}
                    {filters.includeColumns.unitPrice && (
                        <td>${item.unitPrice.toFixed(2)}</td>
                    )}
                    {filters.includeColumns.dateAdded && <td>{item.dateAdded}</td>}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="export-rep-cus">
            <button className="export-buttons-reports-custom" onClick={exportToExcel}>
              Exportar a Excel
            </button>
            <button className="export-buttons-reports-custom" onClick={exportToPDF}>
              Exportar a PDF
            </button>
            <button className="export-buttons-reports-custom" onClick={exportToCSV}>
              Exportar a CSV
            </button>
          </div>
        </div>
      </div>
  );
}

export default CustomReports;