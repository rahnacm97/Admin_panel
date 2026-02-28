import { useLocation } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pageTitles = {
    '/': { title: 'Dashboard', sub: 'Welcome back, Admin!' },
    '/products': { title: 'Products', sub: 'Manage your product inventory' },
    '/products/add': { title: 'Add Product', sub: 'Create a new product listing' },
};

export default function Header() {
    const { pathname } = useLocation();

    const match =
        Object.keys(pageTitles)
            .filter((key) => pathname.startsWith(key))
            .sort((a, b) => b.length - a.length)[0];

    const isEditPage = pathname.match(/^\/products\/edit\/\d+/);
    const info = isEditPage
        ? { title: 'Edit Product', sub: 'Update product details' }
        : pageTitles[match] || { title: 'Admin Panel', sub: '' };

    return (
        <header className="header">
            <div className="header-left">
                <h1>{info.title}</h1>
                {info.sub && <p>{info.sub}</p>}
            </div>
            <div className="header-right">
                <span className="header-badge">
                    <FiberManualRecordIcon style={{ fontSize: 10, color: 'var(--success)', marginRight: 4 }} />
                    Live
                </span>
                <div className="header-avatar">
                    <AccountCircleIcon fontSize="small" />
                </div>
            </div>
        </header>
    );
}
