
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, ShieldCheck, RefreshCcw, Truck, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface ProductPageProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = useMemo(() => products.find(p => p.id === id), [products, id]);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <Link to="/" className="text-primary hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/" className="hover:text-primary transition">الرئيسية</Link>
        <ChevronRight size={14} />
        <Link to={`/?cat=${product.category}`} className="hover:text-primary transition">
          {product.category === 'electronics' ? 'إلكترونيات' : product.category === 'home' ? 'منزل' : 'سيارات'}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden border bg-white">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border cursor-pointer hover:border-primary transition">
                <img src={`https://picsum.photos/seed/${product.id}-${i}/200/200`} alt="Thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2 uppercase">متوفر في المخزون</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary">MAD {product.price.toLocaleString()}</span>
              <span className="text-gray-400 line-through text-lg">MAD {(product.price * 1.2).toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 text-center">
              <Truck size={20} className="text-primary" />
              <span className="text-[10px] text-gray-500 font-bold">توصيل مجاني</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 text-center">
              <ShieldCheck size={20} className="text-primary" />
              <span className="text-[10px] text-gray-500 font-bold">ضمان سنة</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 text-center">
              <RefreshCcw size={20} className="text-primary" />
              <span className="text-[10px] text-gray-500 font-bold">إرجاع مجاني</span>
            </div>
          </div>

          <div className="mb-8 border-b">
            <div className="flex gap-8">
              <button 
                onClick={() => setActiveTab('desc')}
                className={`pb-4 font-bold border-b-2 transition ${activeTab === 'desc' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
              >
                الوصف
              </button>
              <button 
                onClick={() => setActiveTab('specs')}
                className={`pb-4 font-bold border-b-2 transition ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
              >
                المواصفات
              </button>
            </div>
            <div className="py-6 min-h-[150px]">
              {activeTab === 'desc' ? (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              ) : (
                <ul className="space-y-2">
                  {product.specifications.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-primary/90 transition shadow-xl shadow-primary/20 transform active:scale-[0.98]"
          >
            <ShoppingCart size={24} />
            أضف إلى سلة المشتريات
          </button>
          
          <div className="mt-8 p-4 rounded-2xl bg-secondary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">تحتاج لمساعدة؟</p>
                <p className="text-[10px] text-gray-400">نحن متواجدون 24/7 للرد على استفساراتك</p>
              </div>
            </div>
            <button className="text-xs bg-white text-secondary px-4 py-2 rounded-xl font-bold">دردشة الآن</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
