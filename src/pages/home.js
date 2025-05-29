const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/images/back.png')" }}
    >
      <div className="p-10 rounded-lg text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Добро пожаловать!</h1>
        <p className="text-lg md:text-xl max-w-xl">
          Это обложка сайта. Здесь может быть слоган, кнопка действия или краткое описание проекта.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
