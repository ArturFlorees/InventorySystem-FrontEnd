import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/AddEditProducts.css';

function AddEditProducts() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [showStockRanges, setShowStockRanges] = useState(false); // Mostrar u ocultar rangos

    // Rango de stock personalizado
    const [stockRanges, setStockRanges] = useState({
        normalMin: '',
        normalMax: '',
        lowMin: '',
        lowMax: '',
        criticalMax: '',
    });

    useEffect(() => {
        if (productId) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products.find((p) => p.id === productId);
            if (product) {
                setProductName(product.name);
                setQuantity(product.quantity);
                setUnitPrice(product.price);
                setCategory(product.category);
                setLocation(product.location);
                setImage(product.image || '');
                if (product.stockRanges) {
                    setStockRanges({
                        normalMin: product.stockRanges.normal.min.toString(),
                        normalMax: product.stockRanges.normal.max.toString(),
                        lowMin: product.stockRanges.low.min.toString(),
                        lowMax: product.stockRanges.low.max.toString(),
                        criticalMax: product.stockRanges.critical.max.toString(),
                    });
                }
                setShowStockRanges(!!product.stockRanges); // Mostrar rangos si el producto los tiene
            }
        }
    }, [productId]);

    const validateStockRanges = () => {
        const { normalMin, normalMax, lowMin, lowMax, criticalMax } = stockRanges;

        if (
            parseInt(criticalMax) >= parseInt(lowMin) ||
            parseInt(lowMax) >= parseInt(normalMin) ||
            parseInt(normalMin) >= parseInt(normalMax)
        ) {
            alert('Por favor, asegúrate de que los rangos de stock sean coherentes.');
            return false;
        }
        return true;
    };

    const handleSaveChanges = () => {
        if (
            !productName ||
            !quantity ||
            !unitPrice ||
            !category ||
            !location ||
            (showStockRanges &&
                (!stockRanges.normalMin ||
                    !stockRanges.normalMax ||
                    !stockRanges.lowMin ||
                    !stockRanges.lowMax ||
                    !stockRanges.criticalMax))
        ) {
            alert('Por favor, completa todos los campos antes de guardar.');
            return;
        }

        if (showStockRanges && !validateStockRanges()) {
            return;
        }

        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (productId) {
            // Editar producto
            const updatedProducts = products.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        name: productName,
                        quantity: parseInt(quantity, 10),
                        price: parseFloat(unitPrice),
                        category,
                        location,
                        image: image || 'https://via.placeholder.com/50',
                        stockRanges: showStockRanges
                            ? {
                                normal: {
                                    min: parseInt(stockRanges.normalMin, 10),
                                    max: parseInt(stockRanges.normalMax, 10),
                                },
                                low: {
                                    min: parseInt(stockRanges.lowMin, 10),
                                    max: parseInt(stockRanges.lowMax, 10),
                                },
                                critical: {
                                    max: parseInt(stockRanges.criticalMax, 10),
                                },
                            }
                            : undefined,
                    }
                    : product
            );
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            alert('Producto editado correctamente.');
        } else {
            // Añadir nuevo producto
            const newProduct = {
                id: (products.length + 1).toString().padStart(3, '0'),
                name: productName,
                quantity: parseInt(quantity, 10),
                price: parseFloat(unitPrice),
                category,
                location,
                image: image || 'https://via.placeholder.com/50',
                date: new Date().toISOString().split('T')[0],
                stockRanges: showStockRanges
                    ? {
                        normal: {
                            min: parseInt(stockRanges.normalMin, 10),
                            max: parseInt(stockRanges.normalMax, 10),
                        },
                        low: {
                            min: parseInt(stockRanges.lowMin, 10),
                            max: parseInt(stockRanges.lowMax, 10),
                        },
                        critical: {
                            max: parseInt(stockRanges.criticalMax, 10),
                        },
                    }
                    : undefined,
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert('Producto añadido correctamente.');
        }

        navigate('/inventory'); // Redirigir al inventario
    };

    return (
        <div className="add-edit-product-page">
            <div className="navbaradd">
                <Link className="home" to="/dashboard">
                    <h2>PCTECHNOSYSTEM</h2>
                </Link>
            </div>
            <div className="add-edit-product-container">
                <h2>{productId ? 'Editar producto' : 'Añadir producto'}</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio unitario</label>
                        <input
                            type="number"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
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
                            required
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
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="URL de la imagen"
                        />
                    </div>
                    <button
                        type="button"
                        className="stock-range-button"
                        onClick={() => setShowStockRanges(!showStockRanges)}
                    >
                        {showStockRanges ? 'Ocultar Rangos de Stock' : 'Configurar Rangos de Stock'}
                    </button>
                    {showStockRanges && (
                        <div className="stock-ranges-popup">
                            <h3>Configurar Rangos de Stock</h3>
                            <div className="form-group">
                                <label>Rango Normal (Mín - Máx)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        placeholder="Mín"
                                        value={stockRanges.normalMin}
                                        onChange={(e) =>
                                            setStockRanges((prev) => ({ ...prev, normalMin: e.target.value }))
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Máx"
                                        value={stockRanges.normalMax}
                                        onChange={(e) =>
                                            setStockRanges((prev) => ({ ...prev, normalMax: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Rango Bajo (Mín - Máx)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        placeholder="Mín"
                                        value={stockRanges.lowMin}
                                        onChange={(e) =>
                                            setStockRanges((prev) => ({ ...prev, lowMin: e.target.value }))
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Máx"
                                        value={stockRanges.lowMax}
                                        onChange={(e) =>
                                            setStockRanges((prev) => ({ ...prev, lowMax: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Rango Crítico (Máx)</label>
                                <input
                                    type="number"
                                    placeholder="Máx"
                                    value={stockRanges.criticalMax}
                                    onChange={(e) =>
                                        setStockRanges((prev) => ({ ...prev, criticalMax: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/inventory')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="save-button"
                            onClick={handleSaveChanges}
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEditProducts;
