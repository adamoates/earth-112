<?php

$configPath = __DIR__ . '/config/inertia.php';
$envPath = __DIR__ . '/.env';

// Update inertia.php config
$inertiaConfig = file_get_contents($configPath);
$inertiaConfig = preg_replace(
    "/('ssr'\s*=>\s*\[\s*'enabled'\s*=>\s*)true/",
    "$1false",
    $inertiaConfig
);
file_put_contents($configPath, $inertiaConfig);

// Update .env file
$env = file_get_contents($envPath);
$env = preg_replace("/INERTIA_SSR=true/", "INERTIA_SSR=false", $env);
$env = preg_replace("/SSR_URL=.*\n/", "", $env);
$env = preg_replace("/INERTIA_SSR_PORT=.*\n/", "", $env);
file_put_contents($envPath, $env);

echo "Inertia SSR configuration updated!\n";
