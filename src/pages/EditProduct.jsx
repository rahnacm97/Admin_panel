import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { toast } from 'react-toastify';
import { useProducts } from '../context/products-context';
import ProductForm from '../components/products/ProductForm';
import Loader from '../components/ui/Loader';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, updateProduct, loading: contextLoading } = useProducts();

    const [saving, setSaving] = useState(false);

    const product = useMemo(
        () => products.find((p) => p.id === parseInt(id, 10)),
        [products, id]
    );

    const initialData = product
        ? {
            title: product.title, price: product.price, category: product.category,
            description: product.description, stock: product.stock
        }
        : null;

    const handleSubmit = async (formData) => {
        try {
            setSaving(true);
            await updateProduct(parseInt(id, 10), formData);
            toast.success('Product updated successfully!');
            setTimeout(() => navigate('/products'), 1500);
        } catch {
            toast.error('Failed to update product. Please try again.');
            setSaving(false);
        }
    };

    if (contextLoading) return <Loader message="Loading product…" />;

    if (!product) {
        return (
            <div className="error-wrap">
                <ErrorOutlineIcon style={{ fontSize: 40, color: 'var(--danger)' }} />
                <h3>Product Not Found</h3>
                <p>No product with ID #{id} exists in the current list.</p>
                <Link to="/products" className="btn btn-ghost" style={{ marginTop: 12 }}>
                    <ArrowBackIcon fontSize="small" /> Back to Products
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Edit Product</h2>
                    <p className="page-subtitle">Updating: {product.title}</p>
                </div>
                <Link to="/products" className="btn btn-ghost">
                    <ArrowBackIcon fontSize="small" /> Back to Products
                </Link>
            </div>

            <div className="form-page">
                <div className="form-card">
                    <ProductForm initialData={initialData} onSubmit={handleSubmit} loading={saving} />
                </div>
            </div>
        </>
    );
}
