const self = this;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}

self.addEventListener('fetch', (event) => {
    event.respondWith((async function respond() {
        /*
        if (event.request.headers.get('X-Requested-With') === 'XMLHttpRequest') {
            const url = new URL(event.request.url);
            url.pathname = `/api${url.pathname}`;
            const request = new Request(url);
            request.headers.set('Accept', 'application/json');
            return fetch(request);
        }
        */
        return fetch(event.request);
    })());
});
