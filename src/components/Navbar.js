import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">Logo</Link>
      </div>
      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-indigo-600 transition">Главная</Link>
        <Link to="/about" className="hover:text-indigo-600 transition">О нас</Link>
        <Link to="/features" className="hover:text-indigo-600 transition">Функционал</Link>
        <Link to="/auth" className="hover:text-indigo-600 transition">Войти</Link>
      </div>
    </nav>
  );
};

export default Navbar;
