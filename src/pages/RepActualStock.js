import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RepActualStock.css';
import { FaPlus } from 'react-icons/fa';
import productsData from '../pages/data';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ActualStockReport() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Para redirigir al formulario de añadir producto

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const combinedProducts = [
      ...productsData.filter(
          (dataProduct) =>
              !storedProducts.some((storedProduct) => storedProduct.id === dataProduct.id)
      ),
      ...storedProducts,
    ].map((product) => {
      const quantity = product.quantity || product.stock || 0;

      let stockLevel = 'Sin Definir';
      if (product.stockRanges) {
        const { normal, low, critical } = product.stockRanges;
        if (quantity >= normal.min && quantity <= normal.max) {
          stockLevel = 'Normal';
        } else if (quantity >= low.min && quantity <= low.max) {
          stockLevel = 'Bajo';
        } else if (quantity <= critical.max) {
          stockLevel = 'Crítico';
        }
      }

      return {
        id: product.id || 'N/A',
        productName: product.name || product.productName || 'Sin nombre',
        category: product.category || 'Sin categoría',
        stock: quantity,
        stockLevel,
      };
    });

    setData(combinedProducts);
  }, []);

  // Función para redirigir al formulario de añadir producto
  const handleAddProduct = () => {
    navigate('/addeditproducts'); // Redirigir a la ruta del formulario de añadir producto
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Agregar encabezados personalizados
    const headers = ['ID', 'Producto', 'Categoría', 'Cantidad', 'Nivel de Stock'];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

    // Crear libro de trabajo y hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Actual');

    // Guardar el archivo
    XLSX.writeFile(workbook, 'stock_actual.xlsx');
  };

  // Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['ID', 'Producto', 'Categoría', 'Cantidad', 'Nivel de Stock'];
    const tableRows = data.map((item) => [
      item.id,
      item.productName,
      item.category,
      item.stock,
      item.stockLevel,
    ]);

    doc.text('Reporte de Stock Actual', 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save('stock_actual.pdf');
  };

  // Exportar a CSV
  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Producto', 'Categoría', 'Cantidad', 'Nivel de Stock'],
      ...data.map((item) => [
        item.id,
        item.productName,
        item.category,
        item.stock,
        item.stockLevel,
      ]),
    ]
        .map((e) => e.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'stock_actual.csv');
    link.click();
  };

  return (
      <div className="actual-stock-report-page">
        <div className="navbarrep">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
          <div className="user-info">
            <Link className="home" to="/editprofile">
            </Link>
          </div>
        </div>
        <div className="main-content">
          <div className="header">
            <h2>Stock Actual</h2>
            <button className="add-item-button" onClick={handleAddProduct}>
              <FaPlus /> Añadir Producto
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
              {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td>
                    <span
                        className={`level ${
                            item.stockLevel === 'Normal'
                                ? 'normal'
                                : item.stockLevel === 'Bajo'
                                    ? 'low'
                                    : item.stockLevel === 'Crítico'
                                        ? 'critical'
                                        : 'undefined'
                        }`}
                    >
                      {item.stockLevel}
                    </span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="export">
            <button className="export-buttons" onClick={exportToExcel}>
              Exportar a Excel
            </button>
            <button className="export-buttons" onClick={exportToPDF}>
              Exportar a PDF
            </button>
            <button className="export-buttons" onClick={exportToCSV}>
              Exportar a CSV
            </button>
          </div>
        </div>
      </div>
  );
}

export default ActualStockReport;
