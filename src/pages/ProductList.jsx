import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";
import { useProducts } from "../context/products-context";
import ProductTable from "../components/products/ProductTable";
import ConfirmModal from "../components/ui/ConfirmModal";
import SearchBar from "../components/ui/SearchBar";
import Loader from "../components/ui/Loader";

const PAGE_LIMIT = 5;

export default function ProductList() {
    const { products, total, loading, error, refetch, deleteProduct } =
        useProducts();

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Filter products
    const filtered = useMemo(() => {
        if (!query.trim()) return products;
        const q = query.toLowerCase();
        return products.filter(
            (p) =>
                p.title?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q),
        );
    }, [products, query]);

    // Paginate
    const paginated = filtered.slice(page * PAGE_LIMIT, (page + 1) * PAGE_LIMIT);
    const totalPages = Math.ceil(filtered.length / PAGE_LIMIT);

    const handleQueryChange = (val) => {
        setQuery(val);
        setPage(0);
    };

    // Delete
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        try {
            setDeleteLoading(true);
            await deleteProduct(deleteTarget.id);
            toast.success(`"${deleteTarget.title}" deleted successfully.`);
        } catch {
            toast.error("Failed to delete product.");
        } finally {
            setDeleteLoading(false);
            setDeleteTarget(null);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={!!deleteTarget}
                title="Delete Product"
                message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
                loading={deleteLoading}
            />

            <div className="page-header">
                <div>
                    <h2 className="page-title">Product List</h2>
                    <p className="page-subtitle">{total} products in your inventory</p>
                </div>
                <Link to="/products/add" className="btn btn-primary">
                    <AddIcon fontSize="small" /> Add Product
                </Link>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div>
                        <div className="table-title">All Products</div>
                        <div className="table-count">
                            {query
                                ? `${filtered.length} results for "${query}"`
                                : `Showing ${paginated.length} of ${total}`}
                        </div>
                    </div>
                    <SearchBar value={query} onChange={handleQueryChange} />
                </div>

                {loading ? (
                    <Loader message="Fetching products…" />
                ) : error ? (
                    <div className="error-wrap">
                        <ErrorOutlineIcon
                            style={{ fontSize: 40, color: "var(--danger)" }}
                        />
                        <h3>Error</h3>
                        <p>{error}</p>
                        <button className="btn btn-ghost" onClick={refetch}>
                            <RefreshIcon fontSize="small" /> Retry
                        </button>
                    </div>
                ) : (
                    <ProductTable products={paginated} onDelete={setDeleteTarget} />
                )}

                {!loading && !error && totalPages > 1 && (
                    <div className="pagination">
                        <span>
                            Page {page + 1} of {totalPages}
                        </span>
                        <div className="pagination-btns">
                            <button
                                className="btn btn-ghost btn-sm"
                                disabled={page === 0}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                <NavigateBeforeIcon fontSize="small" /> Prev
                            </button>
                            <button
                                className="btn btn-ghost btn-sm"
                                disabled={page >= totalPages - 1}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next <NavigateNextIcon fontSize="small" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
