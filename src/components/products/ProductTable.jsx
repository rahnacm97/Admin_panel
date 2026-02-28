import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import InboxIcon from '@mui/icons-material/Inbox';
import { formatPrice, getStockStatus } from '../../utils/helpers';

export default function ProductTable({ products, onDelete }) {
    const navigate = useNavigate();

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon"><InboxIcon style={{ fontSize: 48, color: 'var(--text-muted)' }} /></div>
                <h4>No products found</h4>
                <p>Try a different search term or add a new product.</p>
            </div>
        );
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const stockStatus = getStockStatus(product.stock);
                        return (
                            <tr key={product.id}>
                                <td>
                                    <div className="product-cell">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="product-thumb"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/38'; }}
                                        />
                                        <div>
                                            <div className="product-name">{product.title}</div>
                                            <div className="product-sku">ID #{product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-info">{product.category}</span>
                                </td>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {formatPrice(product.price)}
                                </td>
                                <td>
                                    <span className={`badge badge-${stockStatus}`}>
                                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'var(--warning)' }}>
                                        <StarIcon style={{ fontSize: 16 }} />
                                        {product.rating?.toFixed(1) ?? '—'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => navigate(`/products/edit/${product.id}`)}
                                            title="Edit product"
                                        >
                                            <EditIcon style={{ fontSize: 15 }} /> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger-ghost btn-sm"
                                            onClick={() => onDelete(product)}
                                            title="Delete product"
                                        >
                                            <DeleteIcon style={{ fontSize: 15 }} /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
