
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Home as HomeIcon, Package, User, ChevronLeft, Search, Menu, X, Trash2, CheckCircle, Smartphone, Car, Sofa } from 'lucide-react';
import { Product, CartItem, Order, Settings, StoreState } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from './constants';

// Pages
import HomePage from './pages/Home';
import ProductPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import DashboardPage from './pages/Dashboard';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const placeOrder = (customerData: { name: string; city: string; phone: string }) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: customerData.name,
      city: customerData.city,
      phone: customerData.phone,
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString('ar-MA'),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    
    // Simulate Google Sheets Sync
    if (settings.googleSheetsWebhook) {
      console.log('Syncing order to Google Sheets:', newOrder);
      // fetch(settings.googleSheetsWebhook, { method: 'POST', body: JSON.stringify(newOrder) });
    }
    
    return newOrder.id;
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo & Mobile Menu Button */}
              <div className="flex items-center">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="sm:hidden p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold text-primary mr-2 sm:mr-0">
                  <Package className="w-8 h-8" />
                  <span className="hidden sm:block">متجر المغرب</span>
                </Link>
              </div>

              {/* Desktop Nav */}
              <div className="hidden sm:flex items-center gap-8">
                <Link to="/" className="text-gray-600 hover:text-primary transition">الرئيسية</Link>
                <Link to="/?cat=electronics" className="text-gray-600 hover:text-primary transition">إلكترونيات</Link>
                <Link to="/?cat=home" className="text-gray-600 hover:text-primary transition">منزل</Link>
                <Link to="/?cat=cars" className="text-gray-600 hover:text-primary transition">سيارات</Link>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 text-gray-400 hover:text-primary transition" title="لوحة التحكم">
                  <LayoutDashboard size={24} />
                </Link>
                <Link to="/cart" className="p-2 text-gray-400 hover:text-primary transition relative">
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {isMenuOpen && (
            <div className="sm:hidden bg-white border-t py-2 shadow-lg">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50">الرئيسية</Link>
              <Link to="/?cat=electronics" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50">إلكترونيات</Link>
              <Link to="/?cat=home" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50">منتجات منزلية</Link>
              <Link to="/?cat=cars" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-600 hover:bg-gray-50">سيارات</Link>
            </div>
          )}
        </nav>

        {/* Dynamic Scripts Loader */}
        {settings.customScripts && (
          <script dangerouslySetInnerHTML={{ __html: settings.customScripts }} />
        )}

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateCartQuantity} remove={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} placeOrder={placeOrder} />} />
            <Route 
              path="/dashboard/*" 
              element={
                <DashboardPage 
                  products={products} 
                  setProducts={setProducts} 
                  orders={orders} 
                  settings={settings} 
                  setSettings={setSettings} 
                />
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 font-medium mb-2">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} متجر المغرب الحديث</p>
            <div className="flex justify-center gap-6 mt-4">
              <span className="text-gray-400 text-sm">سياسة الخصوصية</span>
              <span className="text-gray-400 text-sm">شروط الخدمة</span>
              <span className="text-gray-400 text-sm">اتصل بنا</span>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
