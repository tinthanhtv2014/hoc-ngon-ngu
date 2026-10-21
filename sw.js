// Đổi VERSION mỗi khi cập nhật app để máy người dùng tải bản mới.
const VERSION = 'v1';
const CORE = `core-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

// Tải sẵn ngay lần mở đầu tiên (nhẹ). Model 3D monster.glb (~4.6MB) chỉ được
// cache khi người dùng vào game Backroom lần đầu, để lần mở đầu không bị nặng.
const PRECACHE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'assets/backroom-corridor.webp',
  'assets/backroom-monster.webp',
  'vendor/three.min.js',
  'vendor/GLTFLoader.js',
];

const CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CORE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE && k !== RUNTIME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Trang chính: ưu tiên mạng để luôn có bản mới, mất mạng thì dùng bản đã lưu.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CORE).then((c) => c.put('index.html', copy));
          return res;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Font Google / CDN: dùng bản đã lưu ngay, cập nhật ngầm khi có mạng.
  if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(RUNTIME).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req)
            .then((res) => {
              if (res.ok || res.type === 'opaque') c.put(req, res.clone());
              return res;
            })
            .catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  // File trong app (ảnh, model, thư viện): lấy từ cache trước, chưa có thì tải rồi lưu.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(RUNTIME).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
