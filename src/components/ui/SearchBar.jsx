import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchBar({ value, onChange, placeholder = 'Search products…' }) {
    return (
        <div className="search-bar">
            <span className="search-icon">
                <SearchIcon style={{ fontSize: 18 }} />
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {value && (
                <button
                    className="btn"
                    style={{ padding: '0 2px', color: 'var(--text-muted)', background: 'none', display: 'flex' }}
                    onClick={() => onChange('')}
                >
                    <CloseIcon style={{ fontSize: 16 }} />
                </button>
            )}
        </div>
    );
}
