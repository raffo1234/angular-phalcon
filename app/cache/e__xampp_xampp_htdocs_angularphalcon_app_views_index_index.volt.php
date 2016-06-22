<div class="wrapper_home height_100" ng-controller="homeCtrl">
    <header class="header">
        <div class="header_left height_100">
            <a href="javascript:void(0);" title="Menú" class="btn_menu display-inline" ng-click="clickMenu($event)" ng-mouseenter="mouseenterMenu($event)" ng-mouseleave="mouseleaveMenu($event)" >
                <div class="helper"></div><!--
                --><svg width="30" height="30" class="display-inline">
                <rect id="bar_1" x="0" y="8" width="30" height="2" fill="#000000"  ></rect>
                <rect id="bar_2" x="0" y="14" width="30" height="2" fill="#000000" ></rect>
                <rect id="bar_3" x="0" y="20" width="30" height="2" fill="#000000" ></rect>
                </svg>
            </a>
        </div>
    </header>
    
    <div id="cover_menu_js" class="cover_menu ">
        <div class="w_menu_list height_100 align_center">
            <div class="helper"></div><!--
            --><div class="display-inline ">
                <div class="w_logo cover display-inline cover_logo_js">
                    <div class="helper"></div><!--
                    --><a href="/" class="display-inline" ng-click="clickMenuList($event)">
                        <img ng-src="assets/images/logo.png" width="100" class="display-inline logo" alt="Rafael Meza" logoonload />
                    </a>
                </div>
                <ul id="menu_list_js" class="menu_list cover_menu_list_js" >
                    <li class="cover_menu_list_1_js">
                        <a href="/" title="Inicio" ng-click="clickMenuList($event)">Inicio <span class="line"></span></a>
                    </li>
                    <li  class="cover_menu_list_2_js">
                        <a href="/proyectos" title="Proyectos"  ng-click="clickMenuList($event)" >Proyectos <span class="line"></span></a>
                    </li>
                    <li class="cover_menu_list_3_js">
                        <a href="/contacto" title="Contacto"  ng-click="clickMenuList($event)" >Contacto <span class="line"></span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="align_center height_100">
            <div class="height_100" ng-view></div>
        </div>
    </div>    
</div>


