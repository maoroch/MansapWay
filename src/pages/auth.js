import { useState } from 'react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [errors, setErrors] = useState({});
  
  // Состояние для формы входа
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Состояние для формы регистрации
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Обработчик изменения полей входа
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Обработчик изменения полей регистрации
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Валидация формы входа
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email обязателен';
    if (!loginData.password) newErrors.password = 'Пароль обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Валидация формы регистрации
  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.name) newErrors.name = 'Имя обязательно';
    if (!registerData.email) newErrors.email = 'Email обязателен';
    if (!registerData.password) newErrors.password = 'Пароль обязателен';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!registerData.agreeTerms) newErrors.agreeTerms = 'Необходимо согласие с условиями';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка формы входа
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log('Отправка данных входа:', loginData);
      // Здесь будет запрос к API
      alert('Вход выполнен успешно!');
    }
  };

  // Отправка формы регистрации
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      console.log('Отправка данных регистрации:', registerData);
      // Здесь будет запрос к API
      alert('Регистрация прошла успешно! Выполняется вход...');
      // Переключаем на вкладку входа и заполняем данные
      setActiveTab('login');
      setLoginData({
        email: registerData.email,
        password: registerData.password,
        rememberMe: false
      });
    }
  };

  // Обработчик входа через соцсети
  const handleSocialLogin = (provider) => {
    alert(`Вход через ${provider} будет реализован позже`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Переключатель вкладок */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'} tab-button focus:outline-none`}
            onClick={() => setActiveTab('login')}
          >
            Вход
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'} tab-button focus:outline-none`}
            onClick={() => setActiveTab('register')}
          >
            Регистрация
          </button>
        </div>

        {/* Форма входа */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="loginEmail"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Пароль</label>
              <input
                type="password"
                id="loginPassword"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Запомнить меня</label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Войти
              </button>
            </div>
          </form>
        )}

        {/* Форма регистрации */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div>
              <label htmlFor="registerName" className="block text-sm font-medium text-gray-700">Имя</label>
              <input
                type="text"
                id="registerName"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="registerEmail"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700">Пароль</label>
              <input
                type="password"
                id="registerPassword"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="registerConfirmPassword" className="block text-sm font-medium text-gray-700">Подтвердите пароль</label>
              <input
                type="password"
                id="registerConfirmPassword"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="agreeTerms"
                type="checkbox"
                checked={registerData.agreeTerms}
                onChange={handleRegisterChange}
                className={`h-4 w-4 ${errors.agreeTerms ? 'text-red-500' : 'text-indigo-600'} focus:ring-indigo-500 border-gray-300 rounded`}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Я согласен с <a href="#" className="text-indigo-600 hover:text-indigo-500">условиями использования</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="error-message">{errors.agreeTerms}</p>}
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
