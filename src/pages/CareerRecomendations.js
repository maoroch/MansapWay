import { useState } from 'react';

const CareerRecommendations = () => {
  const [formData, setFormData] = useState({
    skills: '',
    interests: '',
    experience: '',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const query = new URLSearchParams(formData).toString();
      const response = await fetch(`/recommendations?${query}`);
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error('Ошибка при получении рекомендаций:', err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Получение рекомендаций по профессиям</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="skills"
          placeholder="Ваши навыки (через запятую)"
          value={formData.skills}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          name="interests"
          placeholder="Ваши интересы (через запятую)"
          value={formData.interests}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />
        <input
          type="text"
          name="experience"
          placeholder="Опыт работы или учебы"
          value={formData.experience}
          onChange={handleChange}
          className="border p-3 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? 'Загрузка...' : 'Получить рекомендации'}
        </button>
      </form>

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Рекомендованные профессии:</h2>
          <ul className="list-disc list-inside">
            {recommendations.map((job, index) => (
              <li key={index} className="text-lg">{job}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;