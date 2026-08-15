<?php
$userAgent = strtolower($_SERVER['HTTP_USER_AGENT'] ?? '');

$bots = [
    'bot', 'crawler', 'spider', 'facebookexternalhit',
    'twitterbot', 'whatsapp', 'linkedinbot', 'googlebot',
    'bingbot', 'slackbot', 'telegrambot',
];

$isBot = false;
foreach ($bots as $bot) {
    if (strpos($userAgent, $bot) !== false) {
        $isBot = true;
        break;
    }
}

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);

if ($isBot) {
    $seoOrigin = rtrim(getenv('SEO_ORIGIN') ?: 'https://api.dater.social', '/');
    $apiUrl = $seoOrigin . $requestUri;
    if ($query) {
        $apiUrl .= '?' . $query;
    }

    $options = [
        'http' => [
            'header' => "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? '') . "\r\n",
        ],
    ];
    $context = stream_context_create($options);

    $html = @file_get_contents($apiUrl, false, $context);

    if ($html !== false) {
        header('Content-Type: text/html; charset=UTF-8');
        echo $html;
        exit;
    }
}

// Fallback to the static Vite SPA for normal users (or when API proxy fails).
include __DIR__ . '/index-spa.html';
