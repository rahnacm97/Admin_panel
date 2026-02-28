import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const CATEGORIES = [
    'beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration',
    'kitchen-accessories', 'laptops', 'mens-shirts', 'mens-shoes', 'mens-watches',
    'mobile-accessories', 'motorcycle', 'skin-care', 'smartphones', 'sports-accessories',
    'sunglasses', 'tablets', 'tops', 'vehicle', 'womens-bags', 'womens-dresses',
    'womens-jewellery', 'womens-shoes', 'womens-watches',
];

const defaultForm = {
    title: '', price: '', category: '', description: '', stock: '',
};

export default function ProductForm({ initialData = {}, onSubmit, loading }) {
    const [form, setForm] = useState({ ...defaultForm, ...initialData });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.price || form.price <= 0) e.price = 'Valid price is required';
        if (!form.category || !CATEGORIES.includes(form.category))
            e.category = 'Please select a valid category';
        if (form.stock === '' || form.stock === null) {
            e.stock = 'Stock is required';
        } else if (form.stock < 0) {
            e.stock = 'Stock cannot be negative';
        } else if (form.stock === 0 || form.stock === '0') {
            e.stock = 'Stock must be at least 1';
        }
        return e;
    };

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        onSubmit({
            title: form.title.trim(),
            price: parseFloat(form.price),
            category: form.category,
            description: form.description.trim(),
            stock: parseInt(form.stock, 10),
        });
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
                <div className="form-group full">
                    <label className="form-label">Product Title *</label>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="e.g. iPhone 15 Pro Max"
                        value={form.title}
                        onChange={handleChange('title')}
                    />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Price (USD) *</label>
                    <input
                        className="form-input"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.price}
                        onChange={handleChange('price')}
                    />
                    {errors.price && <span className="form-error">{errors.price}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Stock Quantity *</label>
                    <input
                        className="form-input"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={form.stock}
                        onChange={handleChange('stock')}
                    />
                    {errors.stock && <span className="form-error">{errors.stock}</span>}
                </div>

                <div className="form-group full">
                    <label className="form-label">Category *</label>
                    <select
                        className="form-input"
                        value={form.category}
                        onChange={handleChange('category')}
                    >
                        <option value="">— Select category —</option>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                            </option>
                        ))}
                    </select>
                    {errors.category && <span className="form-error">{errors.category}</span>}
                </div>

                <div className="form-group full">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-input"
                        placeholder="Describe the product…"
                        value={form.description}
                        onChange={handleChange('description')}
                        rows={4}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading
                        ? <><HourglassEmptyIcon fontSize="small" /> Saving…</>
                        : <><SaveIcon fontSize="small" /> Save Product</>}
                </button>
            </div>
        </form>
    );
}
