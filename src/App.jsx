import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./assets/CartContext.jsx";
import Index from "./pages/Index.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import CartPage from "./pages/CartPage.jsx";
// import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

export default App;