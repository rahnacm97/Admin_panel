import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BoltIcon from '@mui/icons-material/Bolt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const navItems = [
    { to: '/', icon: <DashboardIcon fontSize="small" />, label: 'Dashboard' },
    { to: '/products', icon: <Inventory2Icon fontSize="small" />, label: 'Products', end: false },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-icon">
                    <BoltIcon fontSize="small" />
                </div>
                <div>
                    <div className="brand-name">AdminPanel</div>
                    <div className="brand-sub">Product Manager</div>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section-title">Main Menu</div>
                {navItems.map(({ to, icon, label, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end !== false}
                        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                        <span className="nav-icon">{icon}</span>
                        {label}
                    </NavLink>
                ))}

                <div className="nav-section-title" style={{ marginTop: 20 }}>Products</div>
                <NavLink
                    to="/products/add"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                    <span className="nav-icon"><AddBoxIcon fontSize="small" /></span>
                    Add Product
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="user-avatar">
                        <AdminPanelSettingsIcon fontSize="small" />
                    </div>
                    <div>
                        <div className="user-name">Admin User</div>
                        <div className="user-role">Super Admin</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
