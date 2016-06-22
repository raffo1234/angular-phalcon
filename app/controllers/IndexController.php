<?php

class IndexController extends ControllerBase {

    public function indexAction() {

        $this->assets->addCss("assets/css/iconmoon.css");
        $this->assets->addCss("assets/css/styles.css");

        $this->assets->addJs("assets/js/jquery-1.11.3.min.js");
        $this->assets->addJs("assets/js/TweenMax.min.js");
        $this->assets->addJs("bower_components/angular/angular.min.js");
        $this->assets->addJs("bower_components/angular-route/angular-route.min.js");
        $this->assets->addJs("bower_components/angular-animate/angular-animate.min.js");
        $this->assets->addJs("assets/js/app.js");
    }

}
