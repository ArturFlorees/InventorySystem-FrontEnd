import React, { createContext, useState, useEffect } from 'react';

// Crear contexto
export const InventoryContext = createContext();

// Proveedor del contexto
export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);

    // Cargar datos iniciales desde localStorage
    useEffect(() => {
        const storedInventory = JSON.parse(localStorage.getItem('products')) || [];
        setInventory(storedInventory);
    }, []);

    const updateInventory = (newInventory) => {
        setInventory(newInventory);
        localStorage.setItem('products', JSON.stringify(newInventory));
    };

    return (
        <InventoryContext.Provider value={{ inventory, updateInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};
