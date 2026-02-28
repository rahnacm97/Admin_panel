export default function Loader({ message = 'Loading...' }) {
    return (
        <div className="loader-wrap">
            <div className="spinner" />
            <span>{message}</span>
        </div>
    );
}
