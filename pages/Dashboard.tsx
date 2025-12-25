
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Settings as SettingsIcon, 
  Globe, 
  FileCode, 
  Plus, 
  Download, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Table,
  Check,
  Facebook,
  Share2,
  Activity
} from 'lucide-react';
import { Product, Order, Settings } from '../types';

interface DashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const DashboardPage: React.FC<DashboardProps> = ({ products, setProducts, orders, settings, setSettings }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const stats = [
    { label: 'إجمالي المبيعات', value: `MAD ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}`, icon: <TrendingUp />, color: 'text-green-600' },
    { label: 'عدد الطلبات', value: orders.length, icon: <ShoppingCart />, color: 'text-blue-600' },
    { label: 'المنتجات', value: products.length, icon: <Package />, color: 'text-purple-600' },
  ];

  const handleDownloadSite = () => {
    alert("هذه الميزة تقوم بإنشاء حزمة ملفات HTML/CSS/JS جاهزة للنشر على GitHub أو أي استضافة ثابتة.");
    // In a real app, you'd trigger a build process or a zip download
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${currentPath === '/dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <BarChart3 size={20} /> الإحصائيات
          </Link>
          <Link 
            to="/dashboard/orders" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${currentPath.includes('orders') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <ShoppingCart size={20} /> الطلبات
          </Link>
          <Link 
            to="/dashboard/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${currentPath.includes('products') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <Package size={20} /> المنتجات
          </Link>
          <div className="h-px bg-gray-200 my-4"></div>
          <Link 
            to="/dashboard/marketing" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${currentPath.includes('marketing') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <Activity size={20} /> أدوات التتبع (Pixels)
          </Link>
          <Link 
            to="/dashboard/domain" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${currentPath.includes('domain') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <Globe size={20} /> الدومين والاستضافة
          </Link>
          <Link 
            to="/dashboard/scripts" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${currentPath.includes('scripts') ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            <FileCode size={20} /> أكواد مخصصة (JS)
          </Link>

          <button 
            onClick={handleDownloadSite}
            className="w-full mt-8 flex items-center justify-center gap-2 bg-secondary text-white py-4 rounded-xl font-bold hover:bg-secondary/90 transition"
          >
            <Download size={18} /> تحميل الموقع كاملاً
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Overview stats={stats} orders={orders} />} />
            <Route path="/orders" element={<OrdersList orders={orders} />} />
            <Route path="/products" element={<ProductsManager products={products} setProducts={setProducts} />} />
            <Route path="/marketing" element={<MarketingPixels settings={settings} setSettings={setSettings} />} />
            <Route path="/domain" element={<DomainSettings settings={settings} setSettings={setSettings} />} />
            <Route path="/scripts" element={<CustomScripts settings={settings} setSettings={setSettings} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const Overview = ({ stats, orders }: any) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat: any, i: number) => (
        <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold">{stat.label}</p>
            <h3 className="text-2xl font-black">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-3xl border shadow-sm p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="text-primary" /> آخر الطلبات
      </h3>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b text-gray-400 text-sm">
                <th className="py-4 px-2">الزبون</th>
                <th className="py-4 px-2">التاريخ</th>
                <th className="py-4 px-2">المبلغ</th>
                <th className="py-4 px-2">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order: Order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-2 font-bold">{order.customerName}</td>
                  <td className="py-4 px-2 text-gray-500 text-sm">{order.date}</td>
                  <td className="py-4 px-2 font-black text-primary">MAD {order.total}</td>
                  <td className="py-4 px-2">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">قيد التنفيذ</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">لا توجد طلبات بعد.</div>
      )}
    </div>
  </div>
);

const OrdersList = ({ orders }: { orders: Order[] }) => (
  <div className="bg-white rounded-3xl border shadow-sm p-6 animate-in slide-in-from-left duration-300">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
      <button className="flex items-center gap-2 text-primary font-bold hover:underline">
        <Download size={18} /> تصدير Excel
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-right">
        <thead>
          <tr className="border-b bg-gray-50 text-gray-500 text-sm">
            <th className="p-4 rounded-tr-xl">المعرف</th>
            <th className="p-4">الزبون</th>
            <th className="p-4">المدينة</th>
            <th className="p-4">الهاتف</th>
            <th className="p-4">المجموع</th>
            <th className="p-4 rounded-tl-xl">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-mono text-xs">#{o.id}</td>
              <td className="p-4 font-bold">{o.customerName}</td>
              <td className="p-4">{o.city}</td>
              <td className="p-4 text-sm font-mono">{o.phone}</td>
              <td className="p-4 font-black text-primary">MAD {o.total}</td>
              <td className="p-4">
                <button className="text-gray-400 hover:text-primary"><ExternalLink size={18} /></button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-20 text-gray-400">لا توجد طلبات لعرضها</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsManager = ({ products, setProducts }: any) => {
  const [showAdd, setShowAdd] = useState(false);
  
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6 animate-in slide-in-from-left duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">إدارة المخزون</h2>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> إضافة منتج
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p: Product) => (
          <div key={p.id} className="flex gap-4 p-4 border rounded-2xl group hover:border-primary transition">
            <img src={p.image} className="w-20 h-20 rounded-xl object-cover border" alt={p.name} />
            <div className="flex-grow">
              <h4 className="font-bold line-clamp-1">{p.name}</h4>
              <p className="text-primary font-bold text-sm">MAD {p.price}</p>
              <div className="flex gap-2 mt-2">
                <button className="text-xs text-gray-400 hover:text-blue-500">تعديل</button>
                <button 
                  onClick={() => setProducts((prev: any) => prev.filter((item: any) => item.id !== p.id))}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarketingPixels = ({ settings, setSettings }: any) => (
  <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-8 animate-in slide-in-from-left duration-300">
    <div>
      <h2 className="text-2xl font-bold mb-2">أدوات التتبع والتسويق</h2>
      <p className="text-gray-500">قم بإضافة أكواد التتبع الخاصة بمنصات الإعلانات لقياس التحويلات (Conversions).</p>
    </div>

    <div className="grid grid-cols-1 gap-8">
      <div className="space-y-4">
        <label className="flex items-center gap-2 font-bold text-gray-700">
          <Facebook className="text-blue-600" /> Facebook Pixel ID
        </label>
        <input 
          type="text" 
          placeholder="أدخل ID بكسل فيسبوك"
          className="w-full px-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:border-primary transition font-mono"
          value={settings.facebookPixel}
          onChange={e => setSettings({ ...settings, facebookPixel: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2 font-bold text-gray-700">
          <Globe className="text-emerald-600" /> Google Analytics ID (GA4)
        </label>
        <input 
          type="text" 
          placeholder="مثال: G-XXXXXXX"
          className="w-full px-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:border-primary transition font-mono"
          value={settings.googleAnalytics}
          onChange={e => setSettings({ ...settings, googleAnalytics: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2 font-bold text-gray-700">
          <Share2 className="text-pink-600" /> TikTok Pixel ID
        </label>
        <input 
          type="text" 
          placeholder="أدخل ID بكسل تيك توك"
          className="w-full px-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:border-primary transition font-mono"
          value={settings.tiktokPixel}
          onChange={e => setSettings({ ...settings, tiktokPixel: e.target.value })}
        />
      </div>

      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Table className="text-green-600" /> ربط Google Sheets تلقائياً
        </h3>
        <p className="text-sm text-gray-400 mb-4">أدخل عنوان Webhook الخاص بـ Google Script لإرسال الطلبات مباشرة لجدول البيانات.</p>
        <input 
          type="url" 
          placeholder="https://script.google.com/macros/s/..."
          className="w-full px-4 py-4 rounded-2xl border bg-gray-50 outline-none focus:border-primary transition font-mono"
          value={settings.googleSheetsWebhook}
          onChange={e => setSettings({ ...settings, googleSheetsWebhook: e.target.value })}
        />
      </div>
    </div>

    <button className="bg-primary text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
      <Check size={20} /> حفظ الإعدادات
    </button>
  </div>
);

const DomainSettings = ({ settings, setSettings }: any) => (
  <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-8 animate-in slide-in-from-left duration-300">
    <div>
      <h2 className="text-2xl font-bold mb-2">إعدادات النطاق (Domain)</h2>
      <p className="text-gray-500">قم بربط متجرك بعنوان ويب مخصص واحترافي.</p>
    </div>

    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">اسم النطاق الحالي</label>
        <input 
          type="text" 
          className="w-full px-4 py-4 rounded-2xl border bg-gray-50 font-mono"
          value={settings.domainName}
          onChange={e => setSettings({ ...settings, domainName: e.target.value })}
        />
      </div>

      <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Globe size={18} /> سجلات Name Servers (NS) المطلوبة:
        </h4>
        <ul className="space-y-2">
          {settings.nameServers.map((ns: string, i: number) => (
            <li key={i} className="flex justify-between items-center text-sm font-mono text-blue-800 bg-white/50 p-2 rounded-lg">
              <span>{ns}</span>
              <button className="text-[10px] font-bold uppercase hover:text-blue-600">نسخ</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const CustomScripts = ({ settings, setSettings }: any) => (
  <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-8 animate-in slide-in-from-left duration-300">
    <div>
      <h2 className="text-2xl font-bold mb-2">أكواد JavaScript مخصصة</h2>
      <p className="text-gray-500">أضف أي أكواد تتبع إضافية أو أدوات دردشة حية هنا. سيتم حقن الكود في نهاية صفحة المتجر.</p>
    </div>

    <div className="space-y-4">
      <textarea 
        className="w-full h-64 p-4 rounded-2xl border bg-gray-900 text-green-400 font-mono text-sm resize-none outline-none focus:border-primary"
        placeholder="// <script> ... </script>"
        value={settings.customScripts}
        onChange={e => setSettings({ ...settings, customScripts: e.target.value })}
      ></textarea>
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-xl">
        <Activity size={14} /> تذكر دائماً تغليف الأكواد بوسوم <code>&lt;script&gt;</code>.
      </div>
    </div>

    <button className="bg-primary text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
      <Check size={20} /> حفظ الأكواد
    </button>
  </div>
);

export default DashboardPage;
