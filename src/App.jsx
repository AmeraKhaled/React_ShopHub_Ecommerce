import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Toast from "./components/Toast";
import { CartProvider } from "./contexts/CartContext";
import { useToast } from "./contexts/ToastContext";

function AppContent() {
  const toast = useToast();

  return (
    <CartProvider toast={toast}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toast />
      </div>
    </CartProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App
