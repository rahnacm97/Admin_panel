
export const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);


export const getStockStatus = (stock) => {
    if (stock === 0) return 'danger';
    if (stock < 10) return 'warning';
    return 'success';
};


export const debounce = (fn, delay = 400) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};


export const truncate = (text = '', maxLen = 60) =>
    text.length > maxLen ? `${text.slice(0, maxLen)}…` : text;

export const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('API Error:', message);
    throw new Error(message);
};
