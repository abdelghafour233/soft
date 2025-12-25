
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: string, q: number) => void;
  remove: (id: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, updateQuantity, remove }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد. تصفح المتجر واكتشف عروضنا الحصرية.</p>
        <Link to="/" className="inline-block bg-primary text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-primary/90 transition">
          ابدأ التسوق الآن
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black mb-8">سلة المشتريات ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border flex items-center gap-4 shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-grow">
                <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-primary transition">{item.name}</Link>
                <p className="text-primary font-black mt-1">MAD {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-xl">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition"><Minus size={16} /></button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border shadow-lg sticky top-24">
            <h3 className="text-xl font-bold mb-6">ملخص الطلب</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>المجموع الفرعي</span>
                <span>MAD {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>رسوم التوصيل</span>
                <span className="text-green-600 font-bold">مجاني</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-black text-gray-900">
                <span>المجموع الكلي</span>
                <span>MAD {total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-primary/90 transition shadow-xl shadow-primary/20 mb-4">
              إتمام الطلب
            </Link>
            
            <Link to="/" className="w-full flex items-center justify-center gap-2 text-gray-400 font-bold hover:text-primary transition">
              <ArrowLeft size={18} />
              متابعة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
