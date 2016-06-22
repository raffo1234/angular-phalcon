<?php

return new \Phalcon\Config(array(
    'database' => array(
//        'adapter'     => 'Mysql',
//        'host'        => 'rafael.mysql.eu1.frbit.com',
//        'username'    => 'rafael',
//        'password'    => 'u1TPMJyo9wVUrVrhJOS1XNOL',
//        'dbname'      => 'rafael',
//        'charset'     => 'utf8',
        'adapter'     => 'Mysql',
        'host'        => 'localhost',
        'username'    => 'root',
        'password'    => '',
        'dbname'      => 'angularphalcon',
        'charset'     => 'utf8',
    ),
    'application' => array(
        'controllersDir' => __DIR__ . '/../../app/controllers/',
        'modelsDir'      => __DIR__ . '/../../app/models/',
        'migrationsDir'  => __DIR__ . '/../../app/migrations/',
        'viewsDir'       => __DIR__ . '/../../app/views/',
        'pluginsDir'     => __DIR__ . '/../../app/plugins/',
        'libraryDir'     => __DIR__ . '/../../app/library/',
        'cacheDir'       => __DIR__ . '/../../app/cache/',
        'baseUri'        => '/',
    )
));
