
import { Product, Settings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'آيفون 15 برو ماكس',
    description: 'أحدث هاتف من آبل مع كاميرا احترافية ومعالج جبار.',
    price: 14500,
    category: 'electronics',
    image: 'https://picsum.photos/seed/iphone/800/600',
    specifications: ['شاشة 6.7 بوصة', 'تخزين 256 جيجابايت', 'تيتانيوم طبيعي']
  },
  {
    id: '2',
    name: 'آلة صنع القهوة نسبريسو',
    description: 'قهوة مثالية بلمسة واحدة كل صباح.',
    price: 1800,
    category: 'home',
    image: 'https://picsum.photos/seed/coffee/800/600',
    specifications: ['نظام كبسولات', 'تسخين سريع', 'تصميم مدمج']
  },
  {
    id: '3',
    name: 'تيسلا موديل 3',
    description: 'السيارة الكهربائية الأكثر تطوراً في العالم.',
    price: 450000,
    category: 'cars',
    image: 'https://picsum.photos/seed/tesla/800/600',
    specifications: ['مدى 500 كم', 'قيادة ذاتية', 'شحن فائق']
  },
  {
    id: '4',
    name: 'ماك بوك برو M3',
    description: 'الأداء الأقوى للمحترفين والمبدعين.',
    price: 22000,
    category: 'electronics',
    image: 'https://picsum.photos/seed/macbook/800/600',
    specifications: ['شريحة M3 Pro', '16GB RAM', 'Liquid Retina XDR']
  }
];

export const INITIAL_SETTINGS: Settings = {
  facebookPixel: '',
  googleAnalytics: '',
  tiktokPixel: '',
  googleSheetsWebhook: '',
  domainName: 'www.my-morocco-store.com',
  nameServers: ['ns1.hosting.com', 'ns2.hosting.com'],
  customScripts: ''
};
