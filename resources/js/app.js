import 'preline'
import '../css/app.css'

import { createInertiaApp, Head } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createPinia } from 'pinia'
import { createApp, h } from 'vue'
import VueLazyload from 'vue-lazyload'

const appName = import.meta.env.VITE_APP_NAME || 'Soystreams'
const pinia = createPinia()

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name =>
        resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .component('Head', Head)
            .use(VueLazyload, {
                preLoad: 1.3,
                error: '/images/soy-square.png',
                loading: '/images/soy-square.png',
                attempt: 1,
            })
            .mount(el)
    },
    progress: {
        color: '#50c878',
    },
})
