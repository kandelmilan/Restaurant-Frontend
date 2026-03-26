import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./assets/CartContext.jsx";

// Public Pages
import Index from "./pages/Index.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import CartPage from "./pages/CartPage.jsx";

// Admin Pages
import AdminLogin from "./AdminPages/AdminLogin.jsx";
import AdminLayout from "./AdminPages/AdminLayout.jsx";
import AdminDashboard from "./AdminPages/AdminPanel.jsx";
import AdminOrders from "./AdminPages/AdminOrders.jsx";
import AdminMenu from "./AdminPages/AdminMenu.jsx";

// Auth Wrapper
import ProtectedRoute from "./RequiredComponents/ProtectedRoute.jsx";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN PANEL ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Default dashboard */}
            <Route index element={<AdminDashboard />} />

            {/* Sub routes */}
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />

            {/* Optional: redirect unknown admin routes */}
            <Route path="*" element={<Navigate to="/admin/login" />} />
          </Route>

          {/* ================= GLOBAL FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;