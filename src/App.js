import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import Dashboard from './pages/Dashboard.js';
import Inventory from './pages/Inventory.js';
import AddEditProducts from './pages/AddEditProducts.js';
import EditProfile from './pages/EditProfile.js';
import ReportsPage from './pages/ReportsPage.js';
import RepActualStock from './pages/RepActualStock.js';
import RepInventoryCost from './pages/RepInventoryCost.js';
import RepCustom from './pages/RepCustom.js';
import UserList from './pages/UserList.js';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/addeditproducts" element={<AddEditProducts />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/repactualstock" element={<RepActualStock />} />
          <Route path="/repinventorycost" element={<RepInventoryCost />} />
          <Route path="/repcustom" element={<RepCustom />} />
          <Route path="/userlist" element={<UserList />} /> {/* Nueva ruta para UserList */}
          <Route path="/repactualstock" element={<RepActualStock />} />
          <Route path="/repinventorycost" element={<RepInventoryCost />} />
          <Route path="/repcustom" element={<RepCustom />} />
        </Routes>
      </Router>
  );
}

export default App;
