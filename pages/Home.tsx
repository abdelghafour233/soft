
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// Add Package to the imports from lucide-react
import { Smartphone, Car, Sofa, Flame, ShieldCheck, Truck, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const HomePage: React.FC<HomeProps> = ({ products, addToCart }) => {
  const { search } = useLocation();
  const categoryFilter = new URLSearchParams(search).get('cat');

  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return products;
    return products.filter(p => p.category === categoryFilter);
  }, [products, categoryFilter]);

  const categories = [
    { id: 'electronics', name: 'إلكترونيات', icon: <Smartphone />, color: 'bg-blue-50 text-blue-600' },
    { id: 'home', name: 'منزل', icon: <Sofa />, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'cars', name: 'سيارات', icon: <Car />, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      {!categoryFilter && (
        <section className="relative rounded-3xl overflow-hidden bg-secondary text-white p-8 md:p-16 mb-12">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              تسوق أفضل المنتجات <br />
              <span className="text-primary">بأفضل الأسعار</span> في المغرب
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              نقدم لكم تشكيلة واسعة من السيارات الفاخرة، أحدث التقنيات، ومستلزمات المنزل العصرية مع توصيل سريع لجميع المدن.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition shadow-lg shadow-primary/20">
                اكتشف العروض
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition">
                أحدث المنتجات
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <img 
              src="https://picsum.photos/seed/morocco/1200/600" 
              alt="Hero BG" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Truck size={24} />
          </div>
          <div>
            <h4 className="font-bold">توصيل سريع</h4>
            <p className="text-xs text-gray-500">لجميع المدن المغربية خلال 48 ساعة</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold">ضمان الجودة</h4>
            <p className="text-xs text-gray-500">منتجات أصلية مع ضمان لمدة سنة</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Flame size={24} />
          </div>
          <div>
            <h4 className="font-bold">عروض حصرية</h4>
            <p className="text-xs text-gray-500">خصومات تصل إلى 40% في عطلة نهاية الأسبوع</p>
          </div>
        </div>
      </section>

      {/* Categories Selection */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">تسوق حسب الفئة</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => window.location.hash = `/?cat=${cat.id}`}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                categoryFilter === cat.id ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent bg-white hover:border-primary/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="font-bold text-lg">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {categoryFilter ? categories.find(c => c.id === categoryFilter)?.name : 'جميع المنتجات'}
          </h2>
          {categoryFilter && (
            <button 
              onClick={() => window.location.hash = '/'} 
              className="text-sm text-primary hover:underline"
            >
              عرض الكل
            </button>
          )}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-medium">عذراً، لا توجد منتجات متوفرة حالياً في هذه الفئة.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
