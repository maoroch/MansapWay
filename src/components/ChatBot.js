import { useState, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Системный промт для AI
  const systemPrompt = `
    MansapWay — интеллектуальный сервис, который помогает студентам колледжей найти своё профессиональное направление. 

    Ты - AI-ассистент MansapWay. Твоя задача:
    1. Приветствовать пользователя и кратко представлять сервис
    2. Отвечать на вопросы о профориентации
    3. Давать рекомендации по профессиям в Казахстане
    4. Рассказывать о возможностях сервиса
    5. Быть дружелюбным и поддерживающим

    Информация о сервисе:
    - Анализируем навыки, интересы и тренды рынка труда РК
    - Предлагаем тестирование и анкетирование
    - Рекомендуем профессии с высоким спросом
    - Подбираем программы обучения и стажировки
    - Уже помогли 7000+ студентов
    - Сайт: mansapway.kz

    Важно:
    - Будь кратким (1-2 предложения в ответе)
    - Предлагай конкретные варианты
    - Поддерживай диалог вопросами
  `;
// 1. Восстановление сообщений при загрузке страницы

  useEffect(() => {
  const savedMessages = localStorage.getItem('chatMessages');
  if (savedMessages) {
    setMessages(JSON.parse(savedMessages));
  }
}, []);

// 2. Сохранение сообщений при каждом изменении

useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }
}, [messages]);


  useEffect(() => {
    // Автоматическое приветствие при открытии чата
    if (isOpen && messages.length === 0) {
      const greeting = {
        role: 'assistant',
        content: 'Привет! Я AI-ассистент MansapWay. Помогу найти подходящую профессию. Расскажи, какие направления тебя интересуют?'
      };
      setMessages([greeting]);
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    // Добавляем сообщение пользователя
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          systemPrompt: systemPrompt // Передаем системный промт
        }),
      });

      const data = await res.json();
      const botMessage = { 
        role: 'assistant', 
        content: data.reply || 'Извините, произошла ошибка. Попробуйте позже.' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Ошибка:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Произошла ошибка соединения. Пожалуйста, попробуйте еще раз.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Предопределенные быстрые вопросы
  const quickQuestions = [
    'Какие профессии востребованы?',
    'Как проходит тестирование?',
    'Какие колледжи сотрудничают?'
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50 flex items-center"
      >
        {isOpen ? (
          <span className="text-xl">✕</span>
        ) : (
          <>
            <span className="text-xl mr-2">🤖</span>
            <span className="text-sm font-medium text-white">Профориентация</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
{/* Header */}
<div className="bg-indigo-600 p-4 text-white font-semibold flex justify-between items-center relative">
  <div className="flex items-center">
    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
      <span className="text-indigo-600 text-lg">MW</span>
    </div>
    <div>
      <div>MansapWay Assistant</div>
      <div className="text-xs font-normal opacity-80">
        {isTyping ? 'Печатает...' : 'Онлайн'}
      </div>
    </div>
  </div>

  {/* Очистка чата */}
<button
  onClick={() => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  }}
  className="text-white hover:text-red-300 text-lg ml-2 transition"
  title="Очистить чат"
>
  🗑
</button>

</div>

          {/* Messages */}
          <div className="p-4 flex-1 overflow-y-auto max-h-96 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-indigo-100 text-gray-800 rounded-tr-none text-start'
                      : 'bg-white border text-black border-gray-200 rounded-tl-none text-start shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2">Можете спросить:</div>
                <div className="flex flex-wrap gap-2 text-gray-500">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q);
                        setTimeout(sendMessage, 100);
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 outline-none text-black bg-gray-50 rounded-l-lg border border-r-0 border-gray-300 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Напишите сообщение..."
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={isTyping}
                className="px-4 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {isTyping ? '...' : 'Отпр'}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              MansapWay © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}