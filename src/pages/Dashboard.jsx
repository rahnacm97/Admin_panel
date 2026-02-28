import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/Star';
import { useProducts } from '../context/products-context';
import { formatPrice } from '../utils/helpers';
import Loader from '../components/ui/Loader';

export default function Dashboard() {
    const { products, total, loading, error, refetch } = useProducts();

    if (loading) return <Loader message="Loading dashboard…" />;
    if (error) return (
        <div className="error-wrap">
            <ErrorOutlineIcon style={{ fontSize: 40 }} />
            <h3>Error</h3><p>{error}</p>
            <button className="btn btn-ghost" onClick={refetch}>
                <RefreshIcon fontSize="small" /> Retry
            </button>
        </div>
    );

    const categories = [...new Set(products.map((p) => p.category))].length;
    const lowStock = products.filter((p) => p.stock < 10).length;

    const statCards = [
        { icon: <Inventory2Icon />, label: 'Total Products', value: total, color: '#6c63ff', bg: 'rgba(108,99,255,0.12)' },
        { icon: <CategoryIcon />, label: 'Categories', value: categories, color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
        { icon: <WarningAmberIcon />, label: 'Low Stock', value: lowStock, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
        { icon: <CheckCircleIcon />, label: 'In Stock', value: total - lowStock, color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
    ];

    const recent = products.slice(0, 5);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h2 className="page-title">Overview</h2>
                    <p className="page-subtitle">Here's what's happening with your store today.</p>
                </div>
                <Link to="/products/add" className="btn btn-primary">
                    <AddIcon fontSize="small" /> Add Product
                </Link>
            </div>

            <div className="stat-grid">
                {statCards.map((s) => (
                    <div className="stat-card" key={s.label}>
                        <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                            {s.icon}
                        </div>
                        <div className="stat-info">
                            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="recent-table-wrap">
                <div className="recent-header">
                    <h2>Recent Products</h2>
                    <Link to="/products" className="btn btn-ghost btn-sm">
                        View All <ArrowForwardIcon style={{ fontSize: 14 }} />
                    </Link>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="product-cell">
                                            <img src={p.thumbnail} alt={p.title} className="product-thumb"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/38'; }} />
                                            <span className="product-name">{p.title}</span>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-info">{p.category}</span></td>
                                    <td style={{ fontWeight: 600 }}>{formatPrice(p.price)}</td>
                                    <td>
                                        <span className={`badge badge-${p.stock < 10 ? 'warning' : 'success'}`}>
                                            {p.stock}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
