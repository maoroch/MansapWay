import { useState } from 'react';
import { useNavigate } from 'react-router';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email обязателен';
    if (!loginData.password) newErrors.password = 'Пароль обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.username) newErrors.username = 'Имя пользователя обязательно';
    if (!registerData.email) newErrors.email = 'Email обязателен';
    if (!registerData.password) newErrors.password = 'Пароль обязателен';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!registerData.agreeTerms) newErrors.agreeTerms = 'Необходимо согласие с условиями';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      try {
        console.log('Отправка данных входа:', loginData);
        
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          alert('Ошибка входа: ' + errorText);
          return;
        }
        
        const token = await response.text();
        localStorage.setItem('token', token);
        console.log(token);
        navigate('/');
        
      } catch (error) {
        console.error('Ошибка при входе:', error);
        alert('Ошибка подключения к серверу');
      }
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (validateRegister()) {
      try {
        console.log('Отправка данных регистрации:', registerData);
        
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          alert('Ошибка регистрации: ' + errorText);
          return;
        }
        
        const token = await response.text();
        console.log(token);
        localStorage.setItem('token', token);
        navigate('/');
        
        setActiveTab('login');
        setLoginData({
          email: registerData.email,
          password: registerData.password,
          rememberMe: false
        });
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
        alert('Ошибка подключения к серверу');
      }
    }
  };
  
  const handleSocialLogin = (provider) => {
    alert(`Вход через ${provider} будет реализован позже`);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Tabs */}
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
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
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
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
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
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Запомнить меня</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
              </div>
            </div>
            
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm">
                Войти
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div>
              <label htmlFor="registerUsername" className="block text-sm font-medium text-gray-700">Имя пользователя</label>
              <input
                type="text"
                id="registerUsername"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            
            <div>
              <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="registerEmail"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
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
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
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
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
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
                className={`h-4 w-4 ${errors.agreeTerms ? 'text-red-500' : 'text-indigo-600'} border-gray-300 rounded`}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                Я согласен с <a href="#" className="text-indigo-600 hover:text-indigo-500">условиями использования</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="error-message">{errors.agreeTerms}</p>}
            
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm">
                Зарегистрироваться
              </button>
            </div>
          </form>
        )}
        
        {/* Social login buttons remain unchanged */}
        {/* ... */}
      </div>
    </div>
  );
};

export default AuthPage;
