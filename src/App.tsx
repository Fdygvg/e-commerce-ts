// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./components/Layout/layout";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Product from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <CartProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* All pages render inside Layout where <Outlet /> is */}
                <Route index element={<Home />} />
                <Route path="products" element={<Product />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<OrderHistory />} />
              </Route>
            </Routes>
          </UserProvider>
        </CartProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
