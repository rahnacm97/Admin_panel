import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon">
                    <DeleteForeverIcon style={{ fontSize: 28, color: 'var(--danger)' }} />
                </div>
                <h3>{title || 'Confirm Action'}</h3>
                <p>{message || 'Are you sure you want to proceed? This action cannot be undone.'}</p>
                <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
                        {loading ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
