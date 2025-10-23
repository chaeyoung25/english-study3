const CACHE_NAME = 'sentence-memorizer-cache-v1';
// 캐싱할 파일 목록 (아이콘 포함)
const urlsToCache = [
  './암기_영어.html', // HTML 파일 이름
  './icon-192.png',
  './icon-512.png'
  // 만약 CSS나 다른 JS 파일이 있다면 여기에 추가
];

// 서비스 워커 설치 시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 요청이 있을 때 캐시된 자원 사용
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시된 응답 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      })
  );
});

// 이전 캐시 정리 (앱 업데이트 시)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});