import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(product);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain p-4 bg-gray-50 dark:bg-gray-700"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.title}
          </h5>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex">
            {renderStars(product.rating?.rate || 0)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            ({product.rating?.count || 0} {t('reviews')})
          </span>
        </div>
        <p className="text-green-600 dark:text-green-400 font-bold text-xl mb-4">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-yellow-400 text-black text-center py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors font-medium"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
