'use strict';

var app = angular.module("app", ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
                .when("/", {
                    templateUrl: "templates/home.html",
                    controller: "homeCtrl"
                })
                .when("/proyectos", {
                    templateUrl: "templates/proyectos.html",
                    controller: "proyectosCtrl"
                })
                .when("/proyectos/:slug?", {
                    templateUrl: "templates/proyecto_detalle.html",
                    controller: "proyectoDetalleCtrl"
                })
                .when("/contacto", {
                    templateUrl: "templates/contacto.html",
                    controller: "contactoCtrl"
                })
                .otherwise({redirectTo: "/"});

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode(true);
        }
        else {
            //window.location.hash = '/'  // IE 9 FIX            
            $locationProvider.html5Mode(true);
        }
    }
]);



app.controller("homeCtrl", ['$scope', function ($scope) {

        // close menu popup if is opened
        var btn_menu = angular.element(document.querySelector(".btn_menu"));

        if (btn_menu.hasClass("active")) {
            var bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3")),
                    coverMenu = angular.element(document.querySelector("#cover_menu_js")),
                    coverLogo = angular.element(document.querySelector(".cover_logo_js")),
                    coverMenuList = angular.element(document.querySelector(".cover_menu_list_js")),
                    coverMenuList1 = angular.element(document.querySelector(".cover_menu_list_1_js")),
                    coverMenuList2 = angular.element(document.querySelector(".cover_menu_list_2_js")),
                    coverMenuList3 = angular.element(document.querySelector(".cover_menu_list_3_js"));

            btn_menu.removeClass("active");
            TweenLite.to(bar_1, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});
            TweenLite.to(bar_2, 0.55, {opacity: 1, x: 0, ease: Circ.easeOut});
            TweenLite.to(bar_3, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});

            TweenLite.to(coverMenu, 0.55, {autoAlpha: 0, ease: Circ.easeOut});
            TweenLite.to(coverLogo, 0.55, {top: "-250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList, 0.55, {top: "250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList1, 0.55, {top: "50px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList2, 0.55, {top: "100px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList3, 0.55, {top: "150px", ease: Circ.easeOut});
        }



        // click menu
        $scope.clickMenu = function (e) {
            var currTarget = e.currentTarget,
                    self = angular.element(currTarget),
                    bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3")),
                    coverMenu = angular.element(document.querySelector("#cover_menu_js")),
                    coverLogo = angular.element(document.querySelector(".cover_logo_js")),
                    coverMenuList = angular.element(document.querySelector(".cover_menu_list_js")),
                    coverMenuList1 = angular.element(document.querySelector(".cover_menu_list_1_js")),
                    coverMenuList2 = angular.element(document.querySelector(".cover_menu_list_2_js")),
                    coverMenuList3 = angular.element(document.querySelector(".cover_menu_list_3_js"));

            if (!self.hasClass("active")) {
                self.addClass("active");

                TweenLite.to(bar_1, 0.55, {rotation: 45, x: 5.5, y: -4.2, ease: Circ.easeOut});
                TweenLite.to(bar_2, 0.55, {opacity: 0, ease: Circ.easeOut});
                TweenLite.to(bar_3, 0.55, {rotation: -45, x: 3.2, y: 4.2, ease: Circ.easeOut});

                TweenLite.to(coverMenu, 0.55, {autoAlpha: 1, ease: Circ.easeOut});
                TweenLite.to(coverLogo, 0.55, {top: 0});
                TweenLite.to(coverMenuList, 0.55, {top: 0});
                TweenLite.to(coverMenuList1, 0.35, {delay: 0.1, top: 0, ease: Circ.easeOut});
                TweenLite.to(coverMenuList2, 0.35, {delay: 0.2, top: 0, ease: Circ.easeOut});
                TweenLite.to(coverMenuList3, 0.35, {delay: 0.3, top: 0, ease: Circ.easeOut});

            } else {
                self.removeClass("active");

                TweenLite.to(bar_1, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});
                TweenLite.to(bar_2, 0.55, {opacity: 1, x: 0, ease: Circ.easeOut});
                TweenLite.to(bar_3, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});

                TweenLite.to(coverMenu, 0.55, {autoAlpha: 0, ease: Circ.easeOut});
                TweenLite.to(coverLogo, 0.55, {top: "-250px", ease: Circ.easeOut});
                TweenLite.to(coverMenuList, 0.55, {top: "250px", ease: Circ.easeOut});
                TweenLite.to(coverMenuList1, 0.55, {top: "50px", ease: Circ.easeOut});
                TweenLite.to(coverMenuList2, 0.55, {top: "100px", ease: Circ.easeOut});
                TweenLite.to(coverMenuList3, 0.55, {top: "150px", ease: Circ.easeOut});
            }
        };

        $scope.clickMenuList = function (e) {
            var currTarget = e.currentTarget,
                    self = angular.element(currTarget),
                    btn_menu = angular.element(document.querySelector(".btn_menu")),
                    bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3")),
                    coverMenu = angular.element(document.querySelector("#cover_menu_js")),
                    coverLogo = angular.element(document.querySelector(".cover_logo_js")),
                    coverMenuList = angular.element(document.querySelector(".cover_menu_list_js")),
                    coverMenuList1 = angular.element(document.querySelector(".cover_menu_list_1_js")),
                    coverMenuList2 = angular.element(document.querySelector(".cover_menu_list_2_js")),
                    coverMenuList3 = angular.element(document.querySelector(".cover_menu_list_3_js"));

            var cover_loading = angular.element(document.querySelector(".cover_loading_js"));

            btn_menu.removeClass("active");
            TweenLite.to(bar_1, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});
            TweenLite.to(bar_2, 0.55, {opacity: 1, x: 0, ease: Circ.easeOut});
            TweenLite.to(bar_3, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});

            TweenLite.to(cover_loading, 0.6, {autoAlpha: 1, ease: Circ.easeOut});
            TweenLite.to(coverMenu, 0.55, {delay: 0.4, autoAlpha: 0, ease: Circ.easeOut});
            TweenLite.to(coverLogo, 0.55, {top: "-250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList, 0.55, {top: "250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList1, 0.55, {top: "50px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList2, 0.55, {top: "100px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList3, 0.55, {top: "150px", ease: Circ.easeOut});




        };

        $scope.mouseenterMenu = function (e) {
            var currTarget = e.currentTarget,
                    self = angular.element(currTarget),
                    bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3"));

            if (!self.hasClass("active")) {
                TweenLite.to(bar_1, 0.25, {x: 2, ease: Circ.easeOut});
                TweenLite.to(bar_2, 0.25, {x: -2, ease: Circ.easeOut});
                TweenLite.to(bar_3, 0.25, {x: 2, ease: Circ.easeOut});
            }
        };
        $scope.mouseleaveMenu = function (e) {
            var currTarget = e.currentTarget,
                    self = angular.element(currTarget),
                    bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3"));

            if (!self.hasClass("active")) {
                TweenLite.to(bar_1, 0.25, {x: 0, ease: Circ.easeOut});
                TweenLite.to(bar_2, 0.25, {x: 0, ease: Circ.easeOut});
                TweenLite.to(bar_3, 0.25, {x: 0, ease: Circ.easeOut});
            }
        };

    }]);


app.controller("proyectosCtrl", ['$scope', '$location', '$routeParams', 'ServiceProyectos', function ($scope, $location, $routeParams, ServiceProyectos) {

        // close menu popup if is opened
        var btn_menu = angular.element(document.querySelector(".btn_menu"));

        if (btn_menu.hasClass("active")) {
            var bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3")),
                    coverMenu = angular.element(document.querySelector("#cover_menu_js")),
                    coverLogo = angular.element(document.querySelector(".cover_logo_js")),
                    coverMenuList = angular.element(document.querySelector(".cover_menu_list_js")),
                    coverMenuList1 = angular.element(document.querySelector(".cover_menu_list_1_js")),
                    coverMenuList2 = angular.element(document.querySelector(".cover_menu_list_2_js")),
                    coverMenuList3 = angular.element(document.querySelector(".cover_menu_list_3_js"));

            btn_menu.removeClass("active");
            TweenLite.to(bar_1, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});
            TweenLite.to(bar_2, 0.55, {opacity: 1, x: 0, ease: Circ.easeOut});
            TweenLite.to(bar_3, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});

            TweenLite.to(coverMenu, 0.55, {autoAlpha: 0, ease: Circ.easeOut});
            TweenLite.to(coverLogo, 0.55, {top: "-250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList, 0.55, {top: "250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList1, 0.55, {top: "50px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList2, 0.55, {top: "100px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList3, 0.55, {top: "150px", ease: Circ.easeOut});
        }


        // get project slug
        $scope.slug = $routeParams.slug;
        var promesa = ServiceProyectos.getProyectos($scope.slug, $location);

        promesa.then(function (data) {
            $scope.proyectos = data.proyectos;
            var $proyectos = angular.element(document.querySelector('.proyectos_js'));

            $proyectos.css({
                opacity: 1
            });
            TweenLite.set($proyectos, {scale: 0.9});
            TweenLite.to($proyectos, 1, {scale: 1, ease: Circ.easeOut});

        }, function (error) {
            alert("Error: " + error);
        });

    }]);

app.controller("proyectoDetalleCtrl", ['$scope', '$location', '$routeParams', 'ServiceProyectos', function ($scope, $location, $routeParams, ServiceProyectos) {

        // close menu popup if is opened
        var btn_menu = angular.element(document.querySelector(".btn_menu"));

        if (btn_menu.hasClass("active")) {
            var bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3")),
                    coverMenu = angular.element(document.querySelector("#cover_menu_js")),
                    coverLogo = angular.element(document.querySelector(".cover_logo_js")),
                    coverMenuList = angular.element(document.querySelector(".cover_menu_list_js")),
                    coverMenuList1 = angular.element(document.querySelector(".cover_menu_list_1_js")),
                    coverMenuList2 = angular.element(document.querySelector(".cover_menu_list_2_js")),
                    coverMenuList3 = angular.element(document.querySelector(".cover_menu_list_3_js"));

            btn_menu.removeClass("active");
            TweenLite.to(bar_1, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});
            TweenLite.to(bar_2, 0.55, {opacity: 1, x: 0, ease: Circ.easeOut});
            TweenLite.to(bar_3, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});

            TweenLite.to(coverMenu, 0.55, {autoAlpha: 0, ease: Circ.easeOut});
            TweenLite.to(coverLogo, 0.55, {top: "-250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList, 0.55, {top: "250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList1, 0.55, {top: "50px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList2, 0.55, {top: "100px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList3, 0.55, {top: "150px", ease: Circ.easeOut});
        }

        // get project slug
        $scope.slug = $routeParams.slug;
        var promesa = ServiceProyectos.getProyectos($scope.slug, $location);

        promesa.then(function (data) {
            $scope.proyectos = data.proyectos;
            var $proyectos = angular.element(document.querySelector('.proyecto_in'));

            $proyectos.css({
                opacity: 1
            });

            // animate scale to 1 info wrapper
            var proyecto = angular.element(document.querySelector('.proyecto_detalle_js'));
            TweenLite.set(proyecto, {scale: 0.9});
            TweenLite.to(proyecto, 1, {scale: 1, ease: Circ.easeOut});


        }, function (error) {
            alert("Error: " + error);
        });




    }]);

app.controller("contactoCtrl", ['$scope', function ($scope) {

        // close menu popup if is opened
        var btn_menu = angular.element(document.querySelector(".btn_menu"));

        if (btn_menu.hasClass("active")) {
            var bar_1 = angular.element(document.querySelector("#bar_1")),
                    bar_2 = angular.element(document.querySelector("#bar_2")),
                    bar_3 = angular.element(document.querySelector("#bar_3")),
                    coverMenu = angular.element(document.querySelector("#cover_menu_js")),
                    coverLogo = angular.element(document.querySelector(".cover_logo_js")),
                    coverMenuList = angular.element(document.querySelector(".cover_menu_list_js")),
                    coverMenuList1 = angular.element(document.querySelector(".cover_menu_list_1_js")),
                    coverMenuList2 = angular.element(document.querySelector(".cover_menu_list_2_js")),
                    coverMenuList3 = angular.element(document.querySelector(".cover_menu_list_3_js"));

            btn_menu.removeClass("active");
            TweenLite.to(bar_1, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});
            TweenLite.to(bar_2, 0.55, {opacity: 1, x: 0, ease: Circ.easeOut});
            TweenLite.to(bar_3, 0.55, {rotation: 0, x: 0, y: 0, ease: Circ.easeOut});

            TweenLite.to(coverMenu, 0.55, {autoAlpha: 0, ease: Circ.easeOut});
            TweenLite.to(coverLogo, 0.55, {top: "-250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList, 0.55, {top: "250px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList1, 0.55, {top: "50px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList2, 0.55, {top: "100px", ease: Circ.easeOut});
            TweenLite.to(coverMenuList3, 0.55, {top: "150px", ease: Circ.easeOut});
        }

        // animate scale to 1 info wrapper
        var contacto = angular.element(document.querySelector('.contacto_js'));
        TweenLite.set(contacto, {scale: 0.8});
        TweenLite.to(contacto, 1, {scale: 1, ease: Circ.easeOut});

    }]);

app.service("ServiceProyectos", ["$http", "$q", function ($http, $q) {
        this.getProyectos = function (slug, $location) {
            var slug = slug || '';
            var defer = $q.defer();
            $http.get('proyectosajax/getproyectos/' + slug)
                    .success(function (data) {
                        if (data === 'false') {
                            alert("El proyecto que buscas no existe! :D");
                            $location.path('proyectos');
                        }
                        defer.resolve(data);



                    })
                    .error(function (data) {
                        defer.reject(data);
                    });

            return defer.promise;
        };
    }
]);


app.directive("logoonload", function ($compile) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            element.bind("load", function () {
                scope.$apply(attrs.imageonload);

                TweenLite.to(element, 0.6, {delay: 0.8, opacity: 1, ease: Power4.easeInOut});

            });
        }
    };
});

app.directive("homeimageonload", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            element.bind("load", function () {
                //scope.$apply(attrs.homeimageonload);

                var home_lft = angular.element(document.querySelector(".home_content_lft")),
                        home_lft_in = angular.element(document.querySelector(".home_content_lft_in")),
                        home_rgt = angular.element(document.querySelector(".home_content_rgt"));

                TweenLite.to(home_lft, 0.8, {delay: 1, height: "30%", ease: Circ.easeOut});
                TweenLite.to(home_rgt, 0.8, {delay: 1, height: "70%", ease: Circ.easeOut, onComplete: function () {
                        TweenLite.to(home_lft_in, 0.8, {opacity: 1, scale: 1});
                    }
                });
            });
        }
    };
});

