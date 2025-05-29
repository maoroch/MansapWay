import { useEffect } from 'react';

const AimyBot = () => {
  useEffect(() => {
    // Проверка, чтобы не подключать дважды
    const scriptId = 'aimylogic-widget-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://bot.jaicp.com/chatwidget/BEKMTByl:272687699a82d078a96e63928d0a7fb913ebca68/justwidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Очистка: удалить скрипт и возможный iframe
      script.remove();
      const widget = document.querySelector('iframe[src*="justwidget"]');
      if (widget) widget.remove();
    };
  }, []);

  return null; // Компонент ничего не рендерит в DOM
};

export default AimyBot;
