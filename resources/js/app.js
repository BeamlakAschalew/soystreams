import 'preline';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { HSStaticMethods } from 'preline';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/src/js';

HSStaticMethods.autoInit();

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        HSStaticMethods.autoInit();
    }
});

observer.observe(document.body, {
    attributes: true,
    subtree: true,
    childList: true,
    characterData: true,
});

const appName = import.meta.env.VITE_APP_NAME || 'Soystreams';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#50c878',
    },
});
