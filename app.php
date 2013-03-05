<?php
/**
 * Silex application
 * @author: Nikolay Ermin <keltanas@gmail.com>
 */
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

//$app['debug'] = true;

$database = 'database.json';

// Save basket
$app->post('/basket', function( Request $request ) use ( $database ) {
    file_put_contents( 'database.json', $request->getContent() );
    return new Response( 'Save successfully'/*, 401*/ );
});

// Load basket
$app->get('/basket', function() use ( $database ) {
    $data = file_exists('database.json')
        ? file_get_contents( $database )
        : json_encode(array());
    return new Response( $data/*, 404*/ );
});

$app->run();
