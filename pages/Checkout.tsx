
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CheckCircle, Truck, ShieldCheck, MapPin, User, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  placeOrder: (data: { name: string; city: string; phone: string }) => string;
}

const CheckoutPage: React.FC<CheckoutProps> = ({ cart, placeOrder }) => {
  const [formData, setFormData] = useState({ name: '', city: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0 && !orderId) return <Navigate to="/" />;

  if (orderId) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-black mb-4">تم تأكيد طلبك بنجاح!</h2>
        <p className="text-gray-500 mb-2">رقم الطلب الخاص بك هو: <span className="font-bold text-secondary">#{orderId}</span></p>
        <p className="text-gray-400 mb-8">سيتواصل معك فريقنا قريباً عبر الهاتف لتأكيد التوصيل.</p>
        <Link to="/" className="inline-block bg-primary text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition">
          العودة للمتجر
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.phone) return alert('الرجاء ملء جميع الحقول');
    
    setIsSubmitting(true);
    setTimeout(() => {
      const id = placeOrder(formData);
      setOrderId(id);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-black mb-2">إتمام الطلب</h1>
            <p className="text-gray-500">أدخل معلوماتك الشخصية لضمان وصول الطلب في أسرع وقت.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <User size={16} /> الاسم الكامل
                </label>
                <input
                  required
                  type="text"
                  placeholder="محمد المغربي"
                  className="w-full px-4 py-4 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> المدينة
                </label>
                <select
                  required
                  className="w-full px-4 py-4 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition outline-none"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                >
                  <option value="">اختر مدينتك</option>
                  <option value="الدار البيضاء">الدار البيضاء</option>
                  <option value="الرباط">الرباط</option>
                  <option value="مراكش">مراكش</option>
                  <option value="طنجة">طنجة</option>
                  <option value="فاس">فاس</option>
                  <option value="أكادير">أكادير</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} /> رقم الهاتف
                </label>
                <input
                  required
                  type="tel"
                  placeholder="06XXXXXXXX"
                  className="w-full px-4 py-4 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-4 text-blue-800">
              <Truck size={24} className="flex-shrink-0" />
              <p className="text-sm">الدفع عند الاستلام متاح! ستقوم بالدفع فقط عندما يصل المنتج لباب منزلك.</p>
            </div>

            <button 
              disabled={isSubmitting}
              className={`w-full bg-primary text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition shadow-xl shadow-primary/20 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
              {isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب الآن'}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-3xl p-8 border shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6">محتويات السلة</h3>
            <div className="divide-y mb-6 max-h-[400px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border" />
                  <div className="flex-grow">
                    <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity} × MAD {item.price.toLocaleString()}</p>
                  </div>
                  <span className="font-bold">MAD {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t">
              <div className="flex justify-between text-gray-500">
                <span>المجموع الفرعي</span>
                <span>MAD {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600 font-bold">
                <span>التوصيل</span>
                <span>مجاني</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-gray-900 pt-4">
                <span>المجموع الكلي</span>
                <span>MAD {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
              <ShieldCheck size={32} />
              <img src="https://picsum.photos/seed/secure/100/40" alt="Secure Payment" className="grayscale" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
