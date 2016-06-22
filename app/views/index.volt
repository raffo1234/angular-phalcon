<!doctype html>
<html lang="es" class="active" ng-app="app">
    <head>
        <title>Rafael Meza</title>
        
        <base href="/" />
        
        <meta charset="utf-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="format-detection" content="telephone=no">
        <meta name="author" content="">
        <meta name="description" content="">
        <meta name="robots" content="all, index, follow">
        <meta name="googlebot" content="all, index, follow">
        <meta name="google-site-verification" content="" />
        <link rel="canonical" href="" />

        <link rel="stylesheet" href="assets/css/iconmoon.css" />
        <link rel="stylesheet" href="assets/css/styles.css" />

        <link rel="icon" href="assets/icons/favicon.png" />
        <link rel="icon" href="assets/icons/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="assets/icons/favicon.ico" type="image/x-icon" />

        <!--[if lt IE 9]>
                <script src="assests/js/html5shiv.js"></script>
                <script src="assets/js/respond.min.js"></script>
                <style type="text/css">
                   .gradient {
                      filter: none;
                   }
                 </style>   
        <![endif]-->
    </head>
    <body class="active">
        {{ content() }}
    
        {{ assets.outputJs() }}
        
    </body>

</html>