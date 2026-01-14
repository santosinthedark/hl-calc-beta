// Service Worker для PWA
// Минимальная версия — только установка и активация

self.addEventListener('install', (event) => {
    // Пропустить ожидание и сразу активировать новый воркер
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Взять контроль над всеми клиентами сразу
    event.waitUntil(clients.claim());
});

// Обработчик fetch — пропускаем внешние запросы, не перехватываем CDN
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Пропускаем внешние запросы (CDN, API и т.д.) напрямую в сеть
    if (url.origin !== location.origin) {
        // Не вызываем event.respondWith — браузер обработает сам
        return;
    }

    // Для локальных запросов — сетевой fetch с обработкой ошибок
    event.respondWith(
        fetch(event.request).catch((error) => {
            console.log('SW: Ошибка сети', error);
            // Возвращаем пустой ответ с ошибкой
            return new Response('Сеть недоступна', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        })
    );
});
