const cacheName = 'v1';

const cacheAssets = [

    '/js/main.js',
    '/js/reg.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    'index.html',
    'restaurant.html',
    '/css/styles.css'
]
//call install event 

self.addEventListener('install', e=>{
    console.log("Service Worker Installed");
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets)
            
        })
        .then(() => self.skipWaiting())
    )
    
})

//call activate
self.addEventListener('activate', e=>{
    console.log("Service Worker Activated");
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(cacheNames.map(cache => {
                if (cache !== cacheName) {
                    console.log('Service Worker clearing old cache');
                    return caches.delete(cache)
                    
                } 
            }))
        })
    )
})

// call Fetch Event

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
    
})