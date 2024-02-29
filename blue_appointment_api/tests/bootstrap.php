<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__) . '/vendor/autoload.php';

if (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->bootEnv(dirname(__DIR__) . '/.env');
}

passthru(sprintf(
    'APP_ENV=test php "%s/../bin/console" doctrine:database:drop --force --no-interaction',
    __DIR__
));

passthru(sprintf(
    'APP_ENV=test php "%s/../bin/console" doctrine:database:create --if-not-exists',
    __DIR__
));

passthru(sprintf(
    'APP_ENV=test php "%s/../bin/console" doctrine:schema:create',
    __DIR__
));

passthru(sprintf(
    'APP_ENV=test php "%s/../bin/console" doctrine:fixtures:load --no-interaction',
    __DIR__
));

if (isset($_ENV['BOOTSTRAP_CLEAR_CACHE_ENV'])) {
    passthru(sprintf(
        'APP_ENV=%s php "%s/../bin/console" cache:clear --no-warmup',
        $_ENV['BOOTSTRAP_CLEAR_CACHE_ENV'],
        __DIR__
    ));
}

if ($_SERVER['APP_DEBUG']) {
    umask(0000);
}
