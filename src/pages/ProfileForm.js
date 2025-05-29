import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function ProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(135deg, #fefefe 25%, #fafafa 25%, #fafafa 50%, #fefefe 50%, #fefefe 75%, #fafafa 75%, #fafafa 100%)',
        backgroundSize: '8px 8px',
        backgroundColor: '#fefefe',
      }}
    >
      {/* Основной контент */}
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Блок профиля */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl w-full mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800">Профиль пользователя</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Навыки */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-800 mb-1">Навыки</label>
                <input
                  type="text"
                  {...register('skills', { required: 'Навыки обязательны' })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  placeholder="Введите навыки через запятую (например, Java, Python)"
                />
                <div className="h-6">
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1 text-center">{errors.skills.message}</p>
                  )}
                </div>
              </div>

              {/* Интересы */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-800 mb-1">Интересы</label>
                <input
                  type="text"
                  {...register('interests', { required: 'Интересы обязательны' })}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  placeholder="Введите интересы через запятую (например, спорт, чтение)"
                />
                <div className="h-6">
                  {errors.interests && (
                    <p className="text-red-500 text-sm mt-1 text-center">{errors.interests.message}</p>
                  )}
                </div>
              </div>

              {/* Уровень образования */}
              <div className="sm:col-span-1 lg:col-span-1">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <label className="block text-sm font-medium text-gray-800 mb-1 text-center">Уровень образования</label>
                    <select
                      {...register('educationLevel', { required: 'Уровень образования обязателен' })}
                      className="mt-1 block w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    >
                      <option value="">Выберите уровень</option>
                      <option value="High school">Среднее образование</option>
                      <option value="Bachelor">Бакалавр</option>
                      <option value="Master">Магистр</option>
                      <option value="PhD">Доктор наук</option>
                    </select>
                    <div className="h-6">
                      {errors.educationLevel && (
                        <p className="text-red-500 text-sm mt-1 text-center">{errors.educationLevel.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Предпочитаемый регион */}
              <div className="sm:col-span-1 lg:col-span-1">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <label className="block text-sm font-medium text-gray-800 mb-1 text-center">Предпочитаемый регион</label>
                    <select
                      {...register('preferredRegion', { required: 'Регион обязателен' })}
                      className="mt-1 block w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 max-h-40 overflow-y-auto"
                    >
                      <option value="">Выберите регион</option>
                      <option value="Абай">Абай</option>
                      <option value="Акмолинская">Акмолинская</option>
                      <option value="Актюбинская">Актюбинская</option>
                      <option value="Алматинская">Алматинская</option>
                      <option value="Атырауская">Атырауская</option>
                      <option value="Восточно-Казахстанская">Восточно-Казахстанская</option>
                      <option value="Жамбылская">Жамбылская</option>
                      <option value="Жетысуская">Жетысуская</option>
                      <option value="Карагандинская">Карагандинская</option>
                      <option value="Костанайская">Костанайская</option>
                      <option value="Кызылординская">Кызылординская</option>
                      <option value="Мангистауская">Мангистауская</option>
                      <option value="Павлодарская">Павлодарская</option>
                      <option value="Северо-Казахстанская">Северо-Казахстанская</option>
                      <option value="Туркестанская">Туркестанская</option>
                      <option value="Улытауская">Улытауская</option>
                      <option value="Западно-Казахстанская">Западно-Казахстанская</option>
                      <option value="Алматы">Алматы (город)</option>
                      <option value="Астана">Астана (город)</option>
                      <option value="Шымкент">Шымкент (город)</option>
                      <option value="Байконур">Байконур (город)</option>
                    </select>
                    <div className="h-6">
                      {errors.preferredRegion && (
                        <p className="text-red-500 text-sm mt-1 text-center">{errors.preferredRegion.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка */}
              <div className="sm:col-span-2 lg:col-span-3">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 font-semibold shadow-lg"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}