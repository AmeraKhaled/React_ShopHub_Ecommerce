import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const { getCartItemCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const { toggleLanguage, t, isRTL } = useLanguage();
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    return (
        <nav className={`bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo and Brand */}
                    <Link className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/">
                        <span className="text-3xl">🛍️</span>
                        <span>ShopHub</span>
                    </Link>

                    {/* Theme and Language Toggles */}
                    <div className="flex items-center space-x-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title={isDarkMode ? t('lightMode') : t('darkMode')}
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {t('language')}
                        </button>

                        {/* Cart Icon */}
                        {isAuthenticated ? (
                            <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
                                </svg>
                                {getCartItemCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {getCartItemCount()}
                                    </span>
                                )}
                            </Link>
                        ) : (
                            <Link to="/login" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
                                </svg>
                                {getCartItemCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {getCartItemCount()}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Auth Section */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 dark:text-gray-300">{t('welcomeBack')}, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {t('login')}
                                </Link>
                                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    {t('signup')}
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
