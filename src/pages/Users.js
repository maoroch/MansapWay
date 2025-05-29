import React from "react";

const profileData = {
  name: "null",
  photo: "/1.png",
  attributes: {
    "Навыки": "—",
    "Интересы": "—",
    "Регион": "—",
    "Город": "—",
    "Уровень образования": "—",
    "Предпочитаемый регион работы": "—",
    "Пол": "—",
    "Возраст": "—"
  }
};

const studentData = {
  "Фамилия": "—",
  "Имя": "—",
  "Отчество": "—",
  "Почта": "—",
  "Телефон": "—",
  "Уровень образования": "—",
  "Место обучения": "—",
  "Профессия": "",
  "Предпочитаемый регион работы": "",
  "Интересы": "—",
  "Навыки": "—"
};

const EditProfileButton = () => {
  const handleClick = () => {
    console.log('Редактирование профиля...');
    // Логика открытия формы редактирования
  };}

const Users = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Левая колонка */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center">
            <img
              src={profileData.photo}
              alt=""
              className="w-36 h-36 rounded-full border-4 border-gray-200 object-cover "
            />
            <h2 className="text-xl font-semibold mt-4">{profileData.name}</h2>
          </div>
          <div className="mt-6 space-y-3 text-sm">
            {Object.entries(profileData.attributes).map(([label, value]) => (
              <div key={label}>
                <p className="font-medium text-gray-800">{label}:</p>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6">

          <h3 className="text-lg font-semibold mb-2 text-indigo-700">Информация о студенте</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
            {Object.entries(studentData).slice(0, 9).map(([label, value]) => (
              <div key={label}>
                <p className="font-medium text-gray-800">{label}</p>
                <p className="text-gray-600">{value || "—"}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2 text-indigo-700">Дополнительная информация</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {Object.entries(studentData).slice(9).map(([label, value]) => (
              <div key={label}>
                <p className="font-medium text-gray-800">{label}</p>
                <p className="text-gray-600">{value || "—"}</p>
              </div>
            ))}
          </div>
          <div className="button"><button
      
      style={{
        backgroundColor: '#4338d4',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s',
        position: 'absolute',
        bottom: '-40px',
        right: '15%',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#3629c0')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#4338d4')}
    >
      Редактировать профиль
    </button></div>
        </div>
      </div>
    </div>
  );
};

export default Users;
