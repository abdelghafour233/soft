
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border">
      <Link to={`/product/${product.id}`} className="block relative aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-primary">
          MAD {product.price.toLocaleString()}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-primary transition line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-400 mr-2">(12 تقييم)</span>
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full mt-4 bg-primary text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition transform active:scale-95"
        >
          <ShoppingCart size={18} />
          أضف للسلة
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
