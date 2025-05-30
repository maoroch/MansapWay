import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import ModalWindow from '../components/ModalWindow'


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

const Users = () => {
  const [profileData, setProfileData] = useState({
    name: "—",
    photo: "/1.png",
    attributes: {
      "Навыки": '—',
      "Интересы": '—',
      "Уровень образования":  "—",
      "Предпочитаемый регион работы":  "—"
    }
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Вы не авторизованы. Переход на страницу входа...");
      navigate('/auth')
      return;
    }
    
    fetch("http://localhost:8080/myProfile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных профиля");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = {
          name: data.username || "—",
          photo: "/1.png",
          attributes: {
            "Навыки": data.skills.join(", "),
            "Интересы": data.interests.join(", "),
            "Уровень образования": data.educationLevel || "—",
            "Предпочитаемый регион работы": data.preferredRegion || "—"
          }
        };
        console.log(data)
        setProfileData(formattedData);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }, []);
  
  // if (!profileData) return <div className="text-center mt-10">Загрузка...</div>;
  
  const handleClick = () => {
    navigate("/profile")
  }
  
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
          <div className="mt-6 text-right">
            <ModalWindow/>
            <button
              onClick={handleClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
            >
              Редактировать профиль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Users;

