import 'preline'
import '../css/app.css'

import { createInertiaApp, Head, Link } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createPinia } from 'pinia'
import { HSStaticMethods } from 'preline'
import { createApp, h } from 'vue'
import VueLazyload from 'vue-lazyload'

const appName = (import.meta as any).env.VITE_APP_NAME || 'Soystreams'
const pinia = createPinia()

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name =>
        resolvePageComponent(`./Pages/${name}.vue`, (import.meta as any).glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const vueApp = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .component('Head', Head)
            .component('Link', Link)
            .use(VueLazyload, {
                preLoad: 1.3,
                error: '/images/soy-square.png',
                loading: '/images/soy-square.png',
                attempt: 1,
            })
        vueApp.mixin({
            mounted() {
                if (typeof HSStaticMethods !== 'undefined' && HSStaticMethods.autoInit) {
                    HSStaticMethods.autoInit()
                }
            },
        })
        vueApp.mount(el)
    },
    progress: {
        color: '#50c878',
    },
})
