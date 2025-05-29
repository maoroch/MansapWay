import React, { useState } from 'react';

const DataAnalystModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataAnalysts = [
    {
      id: 1,
      percentage: 85,
      title: "Старший аналитик данных",
      description: "Анализирует сложные данные для принятия стратегических решений",
      demand: "Высокий",
      education: "Магистратура",
      salary: "₸5 000 000 / год",
      skills: ["SQL", "Python", "Tableau", "Машинное обучение"]
    },
    {
      id: 2,
      percentage: 90,
      title: "Бизнес-аналитик",
      description: "Преобразует данные в бизнес-инсайты для руководства",
      demand: "Очень высокий",
      education: "Бакалавр",
      salary: "₸4 200 000 / год",
      skills: ["Excel", "Power BI", "Статистика", "Финансы"]
    },
    {
      id: 3,
      percentage: 20,
      title: "Начинающий аналитик",
      description: "Базовая обработка и визуализация данных",
      demand: "Низкий",
      education: "Колледж",
      salary: "₸1 800 000 / год",
      skills: ["Excel", "Основы SQL", "Google Analytics"]
    }
  ];

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      {/* Кнопка для открытия модального окна */}
      <button
        onClick={toggleModal}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-medium flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
        Результат
      </button>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Затемнение фона */}
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={toggleModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Контент модального окна */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Сравнение профессий аналитиков</h2>
                  <button
                    onClick={toggleModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {dataAnalysts.map((analyst) => (
                    <div key={analyst.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{analyst.title}</h3>
                        <div className="flex items-center">
                          <div className={`h-4 w-4 rounded-full mr-2 ${getPercentageColor(analyst.percentage)}`}></div>
                          <span className="text-sm font-medium text-gray-600">
                            {analyst.percentage}% совпадение
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{analyst.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Востребованность</span>
                          <span className={`font-semibold ${
                            analyst.demand === 'Очень высокий' ? 'text-green-600' : 
                            analyst.demand === 'Высокий' ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {analyst.demand}
                          </span>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Образование</span>
                          <span className="font-semibold text-gray-700">{analyst.education}</span>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Зарплата</span>
                          <span className="font-semibold text-gray-700">{analyst.salary}</span>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-500">Уровень</span>
                          <span className="font-semibold text-gray-700">
                            {analyst.percentage >= 80 ? 'Сеньор' : 
                             analyst.percentage >= 50 ? 'Мидл' : 'Джуниор'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="block text-sm font-medium text-gray-500 mb-2">Ключевые навыки</span>
                        <div className="flex flex-wrap gap-2">
                          {analyst.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Сохранить сравнение
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalystModal;