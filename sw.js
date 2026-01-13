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

// Обработчик fetch — просто пропускаем запросы в сеть
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
