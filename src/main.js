import { createApp } from 'vue'
import VueCryptojs from 'vue-cryptojs'
import './style.scss'
import App from './App.vue'

console.log('qualcosa sta andando bene');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('ServiceWorker registered with scope:', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}


createApp(App).use(VueCryptojs).mount('#app')
