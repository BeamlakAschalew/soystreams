<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800,900&display=swap" rel="stylesheet" />

    <!-- Primary Meta Tags -->
    <title>{{ $page['props']['pageInfo']['title'] }}</title>
    <meta name="title" content="{{ $page['props']['pageInfo']['title'] }}" />
    <meta
        name="description"
        content="{{ $page['props']['pageInfo']['description'] }}"
    />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />

    <meta property="og:logo" content="https://soystreams.beamlak.dev/images/soy-square.png" />

    <meta
        property="og:url" content="{{ $page['props']['pageInfo']['url'] }}"
    />
    <meta property="og:title" content="{{ $page['props']['pageInfo']['title'] }}" />
    <meta
        property="og:description"
        content="{{ $page['props']['pageInfo']['description'] }}"
    />
    <meta property="og:image" content="{{ $page['props']['pageInfo']['image'] }}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta
        property="twitter:url"
        content="{{ $page['props']['pageInfo']['url'] }}"
    />
    <meta property="twitter:title" content="{{ $page['props']['pageInfo']['title'] }}" />
    <meta
        property="twitter:description"
        content="{{ $page['props']['pageInfo']['description'] }}"
    />
    <meta property="twitter:image" content="{{ $page['props']['pageInfo']['image'] }}" />

    <!-- Scripts -->
    @vite(['resources/js/app.ts', 'resources/css/app.css', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead

    <!-- favicon -->
    <link rel="icon" href="/images/soy-square-fav.png">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
        const html = document.querySelector('html');
        const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') ===
            'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
        const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
        else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
        else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
        else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
    </script>
</head>

<body class="font-sans antialiased bg-gray-100 dark:bg-black">
    @inertia
</body>

</html>
