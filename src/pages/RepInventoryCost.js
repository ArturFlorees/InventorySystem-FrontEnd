import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RepInventoryCost.css';
import { FaPlus } from 'react-icons/fa';
import productsData from '../pages/data';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Función para formatear números con comas
const formatNumber = (number) => {
  return number.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

function InventoryCostReport() {
  const [data, setData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate(); // Para redirigir al formulario de añadir producto

  // Cargar datos de `data.js` y `localStorage`
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const combinedProducts = [
      ...productsData.filter(
          (dataProduct) =>
              !storedProducts.some((storedProduct) => storedProduct.id === dataProduct.id)
      ),
      ...storedProducts,
    ];

    const calculatedData = combinedProducts.map((product) => ({
      id: product.id || 'N/A',
      productName: product.name || product.productName || 'Sin nombre',
      unitPrice: product.price || 0,
      quantity: product.quantity || 0,
      subtotal: (product.price || 0) * (product.quantity || 0),
    }));

    setData(calculatedData);

    // Calcular el costo total del inventario
    const total = calculatedData.reduce((acc, product) => acc + product.subtotal, 0);
    setTotalCost(total);
  }, []);

  // Exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Agregar encabezados personalizados
    const headers = ['ID', 'Producto', 'Precio unitario', 'Cantidad', 'Subtotal'];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

    // Crear libro de trabajo y hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Costos de Inventario');

    // Guardar el archivo
    XLSX.writeFile(workbook, 'costos_inventario.xlsx');
  };

  // Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['ID', 'Producto', 'Precio unitario', 'Cantidad', 'Subtotal'];
    const tableRows = data.map((item) => [
      item.id,
      item.productName,
      `$${formatNumber(item.unitPrice)}`,
      item.quantity,
      `$${formatNumber(item.subtotal)}`,
    ]);

    doc.text('Reporte de Costos de Inventario', 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save('costos_inventario.pdf');
  };

  // Exportar a CSV
  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Producto', 'Precio unitario', 'Cantidad', 'Subtotal'],
      ...data.map((item) => [
        item.id,
        item.productName,
        `$${formatNumber(item.unitPrice)}`,
        item.quantity,
        `$${formatNumber(item.subtotal)}`,
      ]),
    ]
        .map((e) => e.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'costos_inventario.csv');
    link.click();
  };

  // Redirigir a añadir producto
  const handleAddProduct = () => {
    navigate('/addeditproducts'); // Redirigir a la página de añadir producto
  };

  return (
      <div className="inventory-cost-report-page">
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
        <div className="main-content-inventory-cost">
          <div className="header">
            <h2>Costos de Inventario</h2>
            <button className="add-item-button" onClick={handleAddProduct}>
              <FaPlus /> Añadir nuevo producto
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
              {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>${formatNumber(item.unitPrice)}</td>
                    <td>{item.quantity}</td>
                    <td>${formatNumber(item.subtotal)}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="total">
            <span>Costo total del inventario: ${formatNumber(totalCost)}</span>
          </div>
          <div className="export">
            <button className="export-buttons-inventory-cost" onClick={exportToExcel}>
              Exportar a Excel
            </button>
            <button className="export-buttons-inventory-cost" onClick={exportToPDF}>
              Exportar a PDF
            </button>
            <button className="export-buttons-inventory-cost" onClick={exportToCSV}>
              Exportar a CSV
            </button>
          </div>
        </div>
      </div>
  );
}

export default InventoryCostReport;