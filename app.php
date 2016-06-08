<?php
/**
 * Silex application
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

$app['debug'] = false;

$database = __DIR__ . '/database.json';

$app->get('/', function(){
    return file_get_contents(__DIR__ . '/index.html');
});

// Save basket
$app->post('/basket', function( Request $request ) use ( $database ) {
    file_put_contents( $database, $request->getContent() );
    return new JsonResponse(['message' => 'Save successfully']);
});

// Load basket
$app->get('/basket', function() use ( $database ) {
    $data = file_exists( $database )
        ? json_decode(file_get_contents( $database ), true)
        : [];
    return new JsonResponse($data);
});

$app->run();
