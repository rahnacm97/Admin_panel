import { useState, useEffect, useCallback } from 'react';
import {
    getProducts,
    addProduct as apiAdd,
    updateProduct as apiUpdate,
    deleteProduct as apiDelete,
} from '../services/productService';
import { ProductsContext } from './products-context';

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Initial fetch
    const fetchAll = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getProducts(100, 0);
            setProducts(data.products);
            setTotal(data.total);
        } catch {
            setError('Failed to load products.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // Add product
    const addProduct = async (formData) => {
        const result = await apiAdd(formData);
        setProducts((prev) => [result, ...prev]);
        setTotal((t) => t + 1);
        return result;
    };

    // Update 
    const updateProduct = async (id, formData) => {
        const result = await apiUpdate(id, formData);
        setProducts((prev) =>
            prev.map((p) => (p.id === result.id ? { ...p, ...result } : p))
        );
        return result;
    };

    // Delete
    const deleteProduct = async (id) => {
        await apiDelete(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setTotal((t) => t - 1);
    };

    const value = {
        products,
        total,
        loading,
        error,
        refetch: fetchAll,
        addProduct,
        updateProduct,
        deleteProduct,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}
