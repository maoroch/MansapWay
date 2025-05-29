  import { Link } from 'react-router-dom';

  const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        {/* Навигация */}
        <div className="justify-center flex mb-10 mt-5 gap-10">
          <Link to="/" className="hover:text-gray-300 transition">Главная</Link>
          <Link to="/about" className="hover:text-gray-300 transition">О нас</Link>
          <Link to="/features" className="hover:text-gray-300 transition">Функционал</Link>
          <Link to="/auth" className="hover:text-gray-300 transition">Войти</Link>
        </div>

        {/* Центрированная линия */}
        <div className="flex justify-center mb-6">
          <div className="h-px w-4/5 bg-white opacity-40" />
        </div>

        {/* Копирайт и ссылки */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300, mt-10">
          <p>&copy; {new Date().getFullYear()} MyApp. Все права защищены.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
            <a href="#" className="hover:underline">Контакты</a>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
