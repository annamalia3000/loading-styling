import { precacheAndRoute } from 'workbox-precaching'; //предварительное кэширование
import { registerRoute } from 'workbox-routing';//правила для перехвата
import { StaleWhileRevalidate } from 'workbox-strategies';//стратегия кэширования - сначала возвращает кэшированную версию ресурса, если она есть, и параллельно обновляет кэш свежей версией ресурса с сервера

precacheAndRoute(self.__WB_MANIFEST);//автоматически кэширует ресурсы, перечисленные в self.__WB_MANIFEST

registerRoute( //правило для перехвата запросов, путь которых начинается с /api.
    ({url}) => url.pathname.startsWith('/api'),
    new StaleWhileRevalidate({ //сначала возвращается кэшированная версия ответа, если она существует, а затем идет запрос на сервер для получения свежих данных и обновления кэша
        cacheName: 'api-cache',
    })
);
  
self.addEventListener('install', () => {
    console.log('Service Worker установлен');
    self.skipWaiting(); 
  
    caches.open('me-cache')
        .then((cache) => {
            return cache.addAll([
                './', 
                './index.html',
                './css/style.css',
                './img/back-paper.png' 
            ]);
        });
});

self.addEventListener('activate', () =>{
    console.log('Service Worker активирован');
});

self.addEventListener('fetch', (evt) => {
    const url = new URL(evt.request.url);
    if (url.pathname.startsWith('/api')) {
        const cacheFirst = new strategies.NetworkFirst();
        evt.respondWith(cacheFirst.makeRequest({ request: evt.request }));
    }
});
