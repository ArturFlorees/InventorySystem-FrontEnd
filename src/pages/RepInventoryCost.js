import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RepInventoryCost.css';
import { FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Función para formatear números con comas
const formatNumber = (number) => {
  return number.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

function ReportInventoryCost() {
  const [data, setData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [itemToDelete, setItemToDelete] = useState(null); // Para manejar la confirmación de eliminación

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const calculatedData = storedProducts.map((product) => ({
      id: product.id || 'N/A',
      productName: product.name || 'Sin nombre',
      unitPrice: product.price || 0,
      quantity: product.quantity || 0,
      subtotal: (product.price || 0) * (product.quantity || 0),
    }));

    setData(calculatedData);
    calculateTotalCost(calculatedData);
  }, []);

  const calculateTotalCost = (products) => {
    const total = products.reduce((acc, product) => acc + product.subtotal, 0);
    setTotalCost(total);
  };

  const confirmDelete = (id) => {
    setItemToDelete(id); // Guardar el ID del producto para confirmar eliminación
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    const updatedData = data.filter((item) => item.id !== itemToDelete);
    setData(updatedData);
    calculateTotalCost(updatedData);
    setItemToDelete(null); // Limpiar el estado de confirmación
  };

  const cancelDelete = () => {
    setItemToDelete(null); // Cancelar la acción de eliminar
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const headers = ['ID', 'Producto', 'Precio unitario', 'Cantidad', 'Subtotal'];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Costos de Inventario');
    XLSX.writeFile(workbook, 'costos_inventario.xlsx');
  };

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
        .map((row) => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'costos_inventario.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
      <div className="inventory-cost-report-page">
        <div className="navbarrep">
          <Link className="home" to="/dashboard">
            <h2 className="home">PCTECHNOSYSTEM</h2>
          </Link>
        </div>
        <div className="main-content-inventory-cost">
          <div className="header">
            <h2>Costos de Inventario</h2>
          </div>
          <div className="inventory-cost-table">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
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
                    <td>
                      <button className="delete-button" onClick={() => confirmDelete(item.id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
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

        {/* Modal de confirmación para eliminar */}
        {itemToDelete && (
            <div className="delete-modal">
              <p>¿Estás seguro de que deseas eliminar este producto?</p>
              <div className="modal-actions">
                <button className="confirm-delete-button" onClick={handleDelete}>
                  Confirmar
                </button>
                <button className="cancel-delete-button" onClick={cancelDelete}>
                  Cancelar
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

export default ReportInventoryCost;
