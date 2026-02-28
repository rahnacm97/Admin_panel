import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import { useProducts } from '../context/products-context';
import ProductForm from '../components/products/ProductForm';

export default function AddProduct() {
    const navigate = useNavigate();
    const { addProduct } = useProducts();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            await addProduct(formData);
            toast.success('Product added successfully!');
            setTimeout(() => navigate('/products'), 1500);
        } catch {
            toast.error('Failed to add product. Please try again.');
            setLoading(false);
        }
    };

    return (
        <>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Add New Product</h2>
                    <p className="page-subtitle">Fill in the details to create a new product.</p>
                </div>
                <Link to="/products" className="btn btn-ghost">
                    <ArrowBackIcon fontSize="small" /> Back to Products
                </Link>
            </div>

            <div className="form-page">
                <div className="form-card">
                    <ProductForm onSubmit={handleSubmit} loading={loading} />
                </div>
            </div>
        </>
    );
}
