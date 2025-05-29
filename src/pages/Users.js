import React from "react";

const profileData = {
  name: "Лилит Дульян",
  photo: "/1.png",
  attributes: {
    "Навыки": "Java, Python, HTML, CSS",
    "Интересы": "Основной филиал",
    "Регион": "Акмолинская область",
    "Город": "Кокшетау",
    "Уровень образования": "Высшее",
    "Предпочитаемый регион работы": "Кокшетау",
    "Пол": "Женский",
    "Возраст": "20 лет"
  }
};

const studentData = {
  "Фамилия": "Омаров",
  "Имя": "Ерсултан",
  "Отчество": "Асылбекович",
  "Почта": "ersultan.omarov.06@mail.ru",
  "Телефон": "+7 (777) 308 6793",
  "Уровень образования": "Среднее",
  "Место обучения": "ВТК г.Кокшетау",
  "Профессия": "",
  "Предпочитаемый регион работы": "",
  "Интересы": "Люблю разрабатывать коды для сайтов",
  "Навыки": "Java, Python"
};

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
        </div>
      </div>
    </div>
  );
};

export default Users;
