<?php

$router = new Phalcon\Mvc\Router(false);

//ruta base
$router->add("/", array(
    'action' => 'index'
));


//$router->add("/:controller/:action/:params", array(
//    "controller" => 1,
//    "action" => 2,
//    "params" => 3
//));
//
//
// ajax
$router->add("/proyectosajax/getproyectos/:params", array(
    'controller' => 'proyectosajax',
    'action' => 'getproyectos',
    "params" => 1
));

$router->add("/proyectosajax/insertar", array(
    'controller' => 'proyectosajax',
    'action' => 'insertarproyecto'
));
$router->add("/proyectosajax/eliminar/:params", array(
    'controller' => 'proyectosajax',
    'action' => 'eliminarproyecto',
    'params' => 1
));



return $router;
