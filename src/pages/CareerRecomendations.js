import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CareerRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch('/recommendations');
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error('Ошибка при получении рекомендаций:', err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
          Рекомендации по профессиям
        </h1>

        <div className="mt-12 bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-md shadow-sm py-10">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">Советы по выбору профессии</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Оценивайте не только навыки, но и то, что вам действительно интересно.</li>
            <li>Изучайте рынок труда: какие профессии востребованы в Казахстане.</li>
            <li>Развивайте гибкие навыки — коммуникацию, критическое мышление, адаптивность.</li>
            <li>Не бойтесь менять направление — это нормально на этапе обучения и карьеры.</li>
            <li>Консультируйтесь с преподавателями и специалистами — их опыт может быть полезен.</li>
          </ul>
        </div>

        {/* Популярные профессии (статический контент) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Популярные профессии в Казахстане
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-indigo-600">IT-специалист</h3>
              <p className="text-gray-600 mt-2">Разработка программного обеспечения и кибербезопасность — востребованные направления.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-indigo-600">Инженер</h3>
              <p className="text-gray-600 mt-2">Инфраструктурные проекты требуют квалифицированных специалистов.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-indigo-600">Медицинский работник</h3>
              <p className="text-gray-600 mt-2">Медицина остается приоритетной сферой с высоким спросом.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-indigo-600">Маркетолог</h3>
              <p className="text-gray-600 mt-2">Цифровой маркетинг растет благодаря развитию онлайн-коммерции.</p>
            </div>
          </div>
        </motion.div>

        {/* Шаги для начала карьеры (статический контент) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-gray-50 border-l-4 border-green-400 p-6 rounded-md shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Шаги для начала карьеры
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Пройдите профориентацию, чтобы понять свои сильные стороны.</li>
            <li>Выберите учебное направление или курсы для развития навыков.</li>
            <li>Создайте резюме и портфолио для демонстрации своих достижений.</li>
            <li>Начните с подработки или стажировки для получения опыта.</li>
          </ol>
        </motion.div>

        {loading ? (
          <div className="text-center text-lg text-gray-600 mt-10">Загрузка...</div>
        ) : recommendations.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Рекомендованные профессии:
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-700">
              {recommendations.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-lg text-gray-600 mt-10">
            Не удалось загрузить рекомендации.
          </div>
        )}
      </motion.div>

      {/* Новый блок: Полезные ресурсы */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Полезные ресурсы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-indigo-600">Курсы и обучение</h3>
            <p className="text-gray-600 mt-2">Платформы вроде Coursera и Stepik предлагают курсы по IT и другим направлениям.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-indigo-600">Вакансии</h3>
            <p className="text-gray-600 mt-2">Проверьте сайты hh.kz и enbek.kz для поиска работы в Казахстане.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-indigo-600">Профориентация</h3>
            <p className="text-gray-600 mt-2">Тесты на 123test.com помогут определить ваши интересы.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-indigo-600">Сообщества</h3>
            <p className="text-gray-600 mt-2">Присоединяйтесь к группам в Telegram или Facebook для обмена опытом.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerRecommendations;