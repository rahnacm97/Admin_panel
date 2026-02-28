# Product Admin Panel

A professional, high-performance Product Management Dashboard built with **React**, **Vite**, and **Material UI Icons**. This application integrates with the DummyJSON API to provide a full CRUD (Create, Read, Update, Delete) experience for inventory management.

## Key Features

- **Dynamic Dashboard**: Overview of total products, category counts, and low-stock alerts.
- **Product Management**: Full-featured product list with search, pagination, and deletion.
- **Form Validation**: Strict validation for stock quantities (min: 1) and price.
- **Global State**: Managed via React Context API for seamless data flow between pages.
- **Modern UI**: Dark-themed professional layout with Material UI icons and `react-toastify` notifications.
- **Error Handling**: Centralized API error handling with professional user feedback.

## Tech Stack

- **Frontend**: React (Functional Components + Hooks)
- **Routing**: React Router v6
- **State Management**: React Context API
- **API Client**: Axios
- **Icons**: Material UI Icons (`@mui/icons-material`)
- **Notifications**: React Toastify

## Setup Instructions

1. **Clone or Navigate to the project directory:**
   ```bash
   cd AdminDashboard
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

---

## Key Assumptions & Notes

### 1. Mock API Persistence
The application uses [DummyJSON](https://dummyjson.com/) as its backend. 
- **Assumption**: Since DummyJSON is a mock server, `POST`, `PUT`, and `DELETE` requests will return a success response but **won't persist changes** on the server.
- **Implementation**: The application uses a custom state manager in `ProductsContext.jsx` to manually update the local state after successful API calls, ensuring the UI reflects your changes immediately during the session.

### 2. Category 
- **Assumption**: The category selection uses exact names (e.g., `skin-care`, `home-decoration`) to match API responses. These are hardcoded in `ProductForm.jsx` for perfect synchronization with the backend data.

### 3. Modern Browser Support
Ensures compatibility with modern browsers that support CSS Variables, Flexbox/Grid, and ES6+ modules.
