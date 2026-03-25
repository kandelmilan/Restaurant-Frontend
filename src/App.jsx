// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./assets/CartContext.jsx";
import Index from "./pages/Index.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProtectedRoute from "./RequiredComponents/ProtectedRoute.jsx";
import AdminPanel from "./AdminPages/AdminPanel.jsx";
import AdminLogin from "./AdminPages/AdminLogin.jsx";


const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Protected admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

export default App;