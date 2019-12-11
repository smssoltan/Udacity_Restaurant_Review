//Sultan code
//service worker registration for cache files.
console.log("hello");

if ('serviceWorker' in navigator){
  console.log("supported");

  window.addEventListener('load', ()=>{

      navigator.serviceWorker
      .register('../sw_cacheFiles.js')
      .then(reg=>console.log('server Worker: Registered'))
      .catch(err=>console(`Server Worker: Error: ${err}`))
  })
}