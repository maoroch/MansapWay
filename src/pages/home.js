
import AimBot from '../components/AimBot'

const HomePage = () => {
  return (
    <div>
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/images/back.png')" }}
    >
      <div className="p-10 rounded-lg text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 ">Найди своё направление с </h1>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>  <b className='text-yellow-300 '>MansapWay</b></h1>
        <p className="text-lg md:text-xl max-w-xl">
  Мы помогаем студентам колледжей определить подходящую профессию на основе их навыков, интересов и трендов рынка труда Казахстана.
        </p>
      </div>
      <AimBot />
    </div>


<div className="text-center px-4 md:px-20 lg:px-60 mt-20">
  <h1 className="text-3xl md:text-4xl font-bold mb-4">Почему это важно</h1>
  <p className="text-lg leading-8 text-gray-700">
    &gt; Более 60% студентов выбирают профессию случайно <br />
    &gt; 70% молодых специалистов меняют профессию в первые 3 года <br />
    MansapWay помогает принять осознанное решение.
  </p>
</div>



          {/* Блок с карточками */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Наши возможности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300">
                <img
                  src="/images/card.png"
                  alt={`card-${index}`}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Карточка {index}</h3>
                  <p className="text-gray-600">Описание карточки. Здесь можно рассказать о преимуществах, функциях и т.п.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


<div className="service py-16 bg-gray-50">
  <div className="row flex flex-col md:flex-row justify-center items-center gap-12 px-6 max-w-6xl mx-auto">
    
    {/* Текстовая часть */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">🚀 Как работает сервис</h2>

      <p className="text-lg mb-3"><strong>📝 Заполни анкету</strong><br />
        Укажи свои интересы, навыки, любимые предметы и предпочтения. Мы не требуем тестов — просто честные ответы.
      </p>

      <p className="text-lg mb-3"><strong>🤖 Алгоритм анализирует</strong><br />
        Наш искусственный интеллект сопоставляет твои данные с актуальными трендами рынка труда Казахстана и анализирует, в чём ты силён.
      </p>

      <p className="text-lg mb-3"><strong>🎯 Получи рекомендации</strong><br />
        Мы предложим тебе наиболее подходящие профессии и шаги, которые помогут уверенно двигаться вперёд.
      </p>
    </div>

    {/* Изображение */}
    <div className="image md:w-1/2">
      <img src="/images/laptop.jpg" className="w-full max-w-md mx-auto rounded-lg shadow-md" alt="Laptop" />
    </div>
  </div>
</div>


      {/* 1. Статистика по цифрам */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Ключевые цифры</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <p className="text-4xl font-extrabold text-indigo-600">120+</p>
              <p className="mt-2 text-gray-700">Рекомендованных профессий</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <p className="text-4xl font-extrabold text-indigo-600">4 500+</p>
              <p className="mt-2 text-gray-700">Пройдено анкет</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <p className="text-4xl font-extrabold text-indigo-600">87%</p>
              <p className="mt-2 text-gray-700">Точность рекомендаций</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <p className="text-4xl font-extrabold text-indigo-600">1 500+</p>
              <p className="mt-2 text-gray-700">Успешно трудоустроено</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Профессии будущего */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Профессии будущего</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'UX/UI-дизайнер',
                desc: 'Создаёт удобные и красивые интерфейсы для пользователей.',
                img: '/images/profession-ux.png',
              },
              {
                title: 'Data Analyst',
                desc: 'Анализирует данные и выстраивает отчёты для принятия решений.',
                img: '/images/profession-data.png',
              },
              {
                title: 'Техник по IT-безопасности',
                desc: 'Обеспечивает защиту систем от киберугроз.',
                img: '/images/profession-security.png',
              },
              {
                title: 'Специалист по умным устройствам',
                desc: 'Разрабатывает и настраивает IoT-решения.',
                img: '/images/profession-iot.png',
              },
            ].map((prof, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300">
                <img
                  src={prof.img}
                  alt={prof.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-2">{prof.title}</h3>
                  <p className="text-gray-600">{prof.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


</div>
  );
};

export default HomePage;
