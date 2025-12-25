
export type Category = 'electronics' | 'home' | 'cars';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  specifications: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Settings {
  facebookPixel: string;
  googleAnalytics: string;
  tiktokPixel: string;
  googleSheetsWebhook: string;
  domainName: string;
  nameServers: string[];
  customScripts: string;
}

export interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  settings: Settings;
}
