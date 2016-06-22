function addSpinner(e) {
    for (var t = $("<div/>", {
            "class": "spinner"
        }), o = 1; 4 > o; o++) $("<div/>", {
        "class": "bounce" + o
    }).appendTo(t);
    t.appendTo($(e))
}

function removeSpinner(e) {
    var t = $(e).find(".spinner");
    t.remove(), t = void 0
}

function resetCustomInputs() {
    $('input[type="checkbox"]').iCheck({
        checkboxClass: "icheck"
    }), $("input.radio").iCheck({
        radioClass: "iradio"
    })
}

function clearCart() {
    localStorage.removeItem("etq.amsterdam.cart.items")
}
var boApp = angular.module("etq-backoffice", ["etqGlobal", "ui.router"]);
boApp.run(["jkURLService", function(e) {
    e.loadUrls()
}]), boApp.controller("BackofficePageController", ["$scope", "$controller", "HoverService", function(e, t, o) {
    t("AbstractPageController", {
        $scope: e,
        $controller: t
    }), e.abstractInitBackOffice = function() {
        e.abstractPageInit()
    }, e.addBackofficeGlobalEvents = function() {
        $("input.checkbox").each(function() {
            n($(this))
        }), $(".inline").find('input[type="checkbox"]').each(function() {
            n($(this))
        }), setTimeout(function() {
            $("select").on("change", function() {
                $(this).addClass("entered")
            }), $(".cleaninput.error").on("focus", function() {
                var e = $(this);
                e.on("keyup", function() {
                    e.off("keyup");
                    var t = e.next("label.error");
                    e.removeClass("error"), t.addClass("ng-hide"), setTimeout(function() {
                        t.remove()
                    }, 500)
                })
            }), $(".container").find("button").each(function() {
                var e = $(this);
                e.find("span.hover").remove();
                var t = e.text();
                e.find("span").remove(), o.setHTML(e, t)
            })
        }, 500)
    };
    var n = function(e) {
            var t = e.parent(),
                o = $("<input/>", {
                    type: "hidden",
                    name: "hidden_" + e.attr("name")
                }).appendTo(t);
            o.val(e.prop("checked") === !0 ? 1 : 0), e.iCheck({
                checkboxClass: "icheck"
            }), _.delay(i, 500)
        },
        i = function() {
            $("input.checkbox").on("ifToggled", function() {
                var e = $(this).attr("name"),
                    t = $('input[name="hidden_' + e + '"]');
                t.val($(this).prop("checked") === !0 ? 1 : 0)
            })
        };
    e.$on("$destroy", function() {
        $("select").off(), $(".cleaninput.error").off()
    })
}]);
var etqGlobal = angular.module("etqGlobal", ["ngTouch", "jkURLManager", "jkBroadcastCenter", "jkDeviceDetector", "ui.router"]);
angular.module("ScrollMagicJS", []).factory("ScrollMagic", function() {
    return {
        ScrollMagic: window.ScrollMagic,
        ScrollScene: window.ScrollScene
    }
}), angular.module("underscore", []).factory("_", function() {
    return window._
});
var app = angular.module("etq", ["etqGlobal", "ScrollMagicJS"]);
app.run(["$rootScope", "$state", "$stateParams", function(e, t, o) {
    e.$state = t, e.$stateParams = o
}]), app.config(["$locationProvider", function(e) {
    e.html5Mode({
        enabled: !0,
        rewriteLinks: !1
    })
}]), app.config(["$stateProvider", "$urlRouterProvider", "States", function(e, t, o) {
    t.when("/products", "/collection"), t.when("/catalog", "/collection"), t.when("/product/:id", "/collection/:id"), t.when("/servicedesk", "/service-desk"), t.when("/servicedesk/:id", "/service-desk/:id"), t.when("/servicedesk/:id/:qid", "/service-desk/:id/:qid"), t.otherwise("/404-not-found"), e.state(o.INTRO, {
        url: "/",
        controller: "CollectionPageController",
        templateUrl: "templates/index/page-collection.html",
        resolve: {
            skipIntro: ["IntroStateService", function(e) {
                return e.skipIntro = !1, e.skipIntro
            }],
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }],
            productData: ["ProductsService", function(e) {
                return e.loadAllProducts()
            }]
        }
    }).state(o.COLLECTION, {
        url: "/collection",
        controller: "CollectionPageController",
        templateUrl: "templates/index/page-collection.html",
        resolve: {
            skipIntro: ["IntroStateService", function(e) {
                return e.skipIntro = !0, e.routeChanged = !0, e.skipIntro
            }],
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }],
            productData: ["ProductsService", function(e) {
                return e.loadAllProducts()
            }]
        }
    }).state(o.LOOKBOOK, {
        url: "/lookbook",
        controller: "LookbookPageController",
        templateUrl: "templates/lookbook/page.html",
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }]
        }
    }).state(o.ABOUT, {
        url: "/about",
        controller: "AboutPageController",
        templateUrl: "templates/about/page.html",
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }]
        }
    }).state(o.PRODUCT, {
        url: "/collection/:id",
        controller: "SingleProductPageController",
        templateUrl: "templates/index/page-single.html",
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }]
        }
    }).state(o.STOCKISTS_LIST, {
        url: "/stockists",
        controller: "StockistsPageController",
        templateUrl: "templates/stockists/page.html",
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }],
            countryData: ["StockistsService", function(e) {
                return e.loadData()
            }]
        }
    }).state(o.STOCKISTS_STORES, {
        url: "/:id",
        parent: o.STOCKISTS_LIST,
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }],
            countryData: ["StockistsService", function(e) {
                return e.loadData()
            }]
        }
    }).state(o.SERVICEDESK_LIST, {
        url: "/service-desk",
        controller: "ServiceDeskPageController",
        templateUrl: "templates/servicedesk/page.html",
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }]
        }
    }).state(o.SERVICEDESK_SUBJECTS, {
        url: "/:id",
        parent: o.SERVICEDESK_LIST,
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }]
        }
    }).state(o.SERVICEDESK_QUESTIONS, {
        url: "/:qid",
        parent: o.SERVICEDESK_SUBJECTS,
        resolve: {
            urlsData: ["jkURLService", function(e) {
                return e.loadUrls()
            }]
        }
    }).state(o.ERROR, {
        url: "/404-not-found",
        controller: "ErrorPageController",
        templateUrl: "templates/errors/404.html"
    })
}]), boApp.controller("AccountPageController", ["$scope", "$controller", "MenuLabels", function(e, t, o) {
    t("BackofficePageController", {
        $scope: e,
        $controller: t
    }), e.init = function() {
        e.menuLabel = o.LOGIN, e.abstractInitBackOffice(), e.addBackofficeGlobalEvents()
    }, e.togglePassword = function() {
        var e = $("#cb-change-password"),
            t = $("#change-password");
        n(e, e, t, !0)
    };
    var n = function(e, t, o, n) {
        var i = n === !0 ? !0 : !1;
        e.on("change", function() {
            t.prop("checked") === i ? o.removeClass("ng-hide") : o.addClass("ng-hide")
        })
    }
}]), boApp.controller("CheckoutPageController", ["$scope", "$controller", function(e, t) {
    t("BackofficePageController", {
        $scope: e,
        $controller: t
    });
    var o = !1,
        n = !1;
    e.init = function() {
        $(".cartcount").remove(), e.abstractInitBackOffice()
    }, e.initBillingInfo = function() {
        $(".cartcount").remove(), c()
    }, e.initPaymentInfo = function() {
        $(".cartcount").remove(), l()
    }, e.initYourOrder = function() {
        setTimeout(function() {
            $(".cartcount").remove(), o || $("#newbillingaddressform").find(".required").each(function() {
                $(this).prop("required", !0)
            }), n || $("#newshippingaddressform").find(".required").each(function() {
                $(this).prop("required", !0)
            })
        }, 500);
        var t = $("#check-couponcode");
        u(t, t, $(".couponcode"), !0), $("#check-couponcode").on("change", function() {}), e.addBackofficeGlobalEvents()
    }, e.handleClickNewBillingsAddress = function() {
        i($("#choose-billing-address"), $("#newbillingaddressform"))
    }, e.initSelectBillingForm = function() {
        a(), o = !0
    }, e.initSelectShippingForm = function() {
        r(), n = !0, $("input.checkbox").iCheck({
            checkboxClass: "icheck"
        }), $(".inline").iCheck({
            checkboxClass: "icheck"
        })
    }, e.handleClickNewShippingAddress = function() {
        i($("#choose-shipping-address"), $("#newshippingaddressform"))
    };
    var i = function(e, t) {
            e.val(""), setTimeout(function() {
                t.find(".required").each(function() {
                    $(this).prop("required", !0)
                })
            }, 500), t.removeClass("ng-hide")
        },
        a = function() {
            s($("#choose-billing-address"), $("#newbillingaddressform"))
        },
        r = function() {
            s($("#choose-shipping-address"), $("#newshippingaddressform"))
        },
        s = function(e, t) {
            e.on("change", function() {
                t.find(".required").each(function() {
                    $(this).removeAttr("required")
                }), t.addClass("ng-hide")
            })
        },
        c = function() {
            var e = $("#check-account"),
                t = $("#section-account"),
                o = $("#check-ship-address"),
                n = $("#section-ship-address");
            u(e, e, t, !0), u(o, o, n, !1)
        },
        l = function() {
            var e = !1;
            $("input.radio").each(function() {
                var t = $(this);
                if (!e) {
                    var o = t.parent(),
                        n = $("<input/>", {
                            type: "hidden",
                            name: "hidden_" + t.attr("name")
                        }).appendTo(o);
                    n.val("ideal"), e = !0
                }
                t.iCheck({
                    radioClass: "iradio"
                })
            }), _.delay(d, 500)
        },
        d = function() {
            var e = $(".payment.radio"),
                t = $(".select-ideal");
            e.on("ifChanged", function() {
                var e = $(this);
                if (e.prop("checked") === !0) {
                    var o = e.closest("label").text().replace(/\s/g, "").toLowerCase(),
                        n = e.attr("name"),
                        i = $('input[name="hidden_' + n + '"]');
                    i.val(o), "ideal" === o ? t.removeClass("ng-hide") : t.addClass("ng-hide")
                }
            });
            var o = $("#select-ideal");
            t.each(function() {
                var e = $(this);
                e.on("change", function() {
                    var n = e.val();
                    t.addClass("entered"), t.val(n).select(), o.val(n)
                })
            })
        },
        u = function(e, t, o, n) {
            var i = n === !0 ? !0 : !1;
            e.on("ifChanged", function() {
                t.prop("checked") === i ? o.removeClass("ng-hide") : o.addClass("ng-hide")
            })
        }
}]), etqGlobal.constant("AppConfig", {
    DEBUG: !1,
    DEBUG_INFO: !1,
    DEBUG_WARN: !1,
    DEBUG_ERROR: !1
}), etqGlobal.constant("Currencies", {
    EURO: "euro",
    DOLLAR: "dollar",
    POUNDS: "pounds"
}), etqGlobal.constant("EventNames", {
    SHOW_MENU: "ETQ.Global.Menu.show",
    HIDE_MENU: "ETQ.Global.Menu.hide",
    SHOW_CART: "ETQ.Global.Cart.show",
    HIDE_CART: "ETQ.Global.Cart.hide",
    CART_UPDATE: "ETQ.Global.Cart.update",
    ASIDE_DATA_READY: "ETQ.Global.PageAside.data.ready",
    ASIDE_UPDATE_HEIGHT: "ETQ.Global.PageAside.list.height.update",
    SHOW_INTRO: "ETQ.Index.Intro.show",
    HIDE_INTRO: "ETQ.Index.Intro.hide",
    HIDE_LOGO: "ETQ.Navbar.Logo.hide",
    SHOW_FILTER: "ETQ.Index.Filter.show",
    HIDE_FILTER: "ETQ.Index.Filter.hide",
    CHANGE_CATALOG_VIEW: "ETQ.Index.Catalog.changeView",
    SNAP_PRODUCT_TO_GRID: "ETQ.Index.Catalog.snapProduct",
    SNAP_ACTIVE_PRODUCT: "ETQ.Index.Catalog.snapToActiveProduct",
    COLLECTION_FILTER: "ETQ.Index.Catalog.filter",
    FILTER_COMPLETE: "ETQ.Index.Catalog.filter.ready",
    PAGE_INIT: "ETQ.Index.Page.init",
    PAGE_READY: "ETQ.Index.Page.ready",
    SINGLE_PRODUCT_PREV: "ETQ.Index.Single.prev",
    SINGLE_PRODUCT_NEXT: "ETQ.Index.Single.next",
    SINGLE_PRODUCT_ZOOM: "ETQ.Index.Single.zoom",
    SINGLE_PRODUCT_UNZOOM: "ETQ.Index.Single.unzoom",
    BACK_TO_CATALOG: "ETQ.Index.Single.backToCatalog",
    SINGLE_DISABLE_DOWN: "ETQ.Index.Single.disable.down",
    SINGLE_ENABLE_DOWN: "ETQ.Index.Single.enable.down",
    SINGLE_DISABLE_UP: "ETQ.Index.Single.disable.up",
    SINGLE_ENABLE_UP: "ETQ.Index.Single.enable.up",
    SINGLE_SHOW_ZOOM: "ETQ.Index.Single.show.zoom",
    SINGLE_HIDE_ZOOM: "ETQ.Index.Single.hide.zoom",
    SINGLE_SCROLL: "ETQ.Index.Single.scroll",
    SINGLE_RESIZE: "ETQ.Index.Single.resize",
    SINGLE_SHOW_FOOTER_NAV: "ETQ.Index.Single.show.footer",
    SINGLE_HIDE_FOOTER_NAV: "ETQ.Index.Single.hide.footer",
    CHANGE_MAPS: "ETQ.Stockists.changeMaps",
    SHOW_MAPS_FOR_COUNTRY: "ETQ.Stockists.showCountryMaps",
    CURRENCY_CHANGED: "ETQ.User.currency.changed",
    PRODUCT_ADDED_TO_CART: "ETQ.Cart.product.added_to_cart",
    PRODUCTS_READY: "ETQ.Index.products.ready",
    PRODUCT_READY: "ETQ.Index.product.ready",
    UPSELL_CHANGE: "ETQ.Index.product.upsellswitch",
    MENU_NAV_TRANSITION: "ETQ.Index.menu.navigateout",
    CHANGE_MENU_ITEM: "ETQ.Global.change_menu_item"
}), etqGlobal.constant("LocalStorageKeys", {
    INTRO_INITIALIZED: "index.introReady",
    CATALOG_STATE: "catalog.state",
    SELECTED_CURRENCY: "user.currency",
    CART_ITEMS: "cart.items",
    CART_LAST_UPDATE: "cart.lastupdate"
}), etqGlobal.constant("MenuLabels", {
    ABOUT: "about",
    COLLECTION: "collection",
    STOCKISTS: "stockists",
    LOOKBOOK: "lookbook",
    LOGIN: "login",
    SERVICE_DESK: "service"
}), etqGlobal.constant("ScrollDirections", {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
}), etqGlobal.constant("UrlNames", {
    BASE_URL: "baseurl",
    APP_URL: "appurl",
    JSON_PRODUCTS: "json_products",
    JSON_SINGLE_PRODUCT: "json_single_product",
    COLLECTION: "catalog",
    LOOKBOOK: "lookbook",
    ABOUT: "about",
    STOCKISTS: "stockists",
    SERVICE_DESK: "servicedesk",
    CHECKOUT: "checkout",
    CART_API_ADD: "cart_add_api",
    CART_API_REMOVE: "cart_remove_api",
    CHANGE_CURRENCY_API: "change_currency_api",
    MAPS_MARKER: "marker_image",
    MAPS_MARKER_HD: "marker_image_hd",
    LOGIN: "login",
    FACEBOOK: "facebook",
    INSTAGRAM: "instagram",
    TWITTER: "twitter",
    JSON_COUNTRIES: "stockists_json",
    SIZEGUIDE: "sizeguide",
    CART_HAS_ITEMS: "cart_has_items"
}), etqGlobal.directive("cycle", ["jkDetectionService", "ResizeService", function(e, t) {
    return {
        restrict: "A",
        link: function(o, n, i) {
            var a = n.children("figure").first(),
                r = a.find("img"),
                s = r.attr("src"),
                c = s;
            if (e.touch && t.isMedium()) {
                var l = r.attr("data-medium");
                void 0 !== l && (c = l), $("body").css({
                    "background-image": "url(" + c + ")"
                }), n.remove()
            } else if (e.touch && t.isSmall()) {
                var d = n.parent(),
                    u = $("<figure/>", {
                        "class": "mobile-image"
                    }),
                    f = r.attr("data-small");
                void 0 !== f && (c = f), u.css({
                    "background-image": "url(" + c + ")"
                }), n.remove(), u.prependTo(d)
            } else {
                n.addClass("cycle");
                for (var v = i.cycle.split(","), p = {}, m = 0; m < v.length; m++) {
                    var h = v[m].split(":"),
                        S = h[1],
                        g = parseInt(S);
                    p[h[0]] = isNaN(g) ? "true" === S.toLowerCase() ? !0 : "false" === S.toLowerCase() ? !1 : S : g
                }
                n.cycle(p)
            }
        }
    }
}]), etqGlobal.directive("imageonload", function() {
    return {
        restrict: "A",
        link: function(e, t) {
            t.bind("load", function() {
                t.parent().addClass("ready")
            })
        }
    }
}), etqGlobal.directive("lookbookload", function() {
    return {
        restrict: "A",
        link: function(e, t) {
            var o = $("<img/>");
            o.attr({
                src: t.attr("data-large")
            }), o.bind("load", function() {
                t.parent().addClass("ready")
            })
        }
    }
}), etqGlobal.filter("uri_segments", ["$location", "jkURLService", "UrlNames", function(e, t, o) {
    return function(n) {
        var i = e.absUrl().replace(t.getUrlByName(o.APP_URL), ""),
            a = i.split("/");
        return a[n - 1] ? a[n - 1] : !1
    }
}]), etqGlobal.factory("CartService", ["$http", "LocalStorageService", "LocalStorageKeys", "_", "jkBroadcastService", "EventNames", "jkURLService", "UrlNames", "$q", function(e, t, o, n, i, a, r, s, c) {
    function l() {
        return t.setItem(o.CART_ITEMS, JSON.stringify(d)), i.broadcast(a.CART_UPDATE, [d]), !0
    }
    var d = [],
        u = 1,
        f = !1,
        v = function(t, o, n) {
            e.post(r.getUrlByName(s.CART_API_ADD), {
                productid: o,
                count: 1
            }).success(function(e) {
                "true" === e.success.toString().toLowerCase() ? (d.push({
                    product: n,
                    size: o
                }), l() && (i.broadcast(a.SHOW_CART), i.broadcast(a.PRODUCT_ADDED_TO_CART)), u = 1) : 4 > u && (v(t, o, n), u++)
            }).error(function() {
                4 > u && (v(t, o, n), u++)
            })
        },
        p = function(t) {
            e.post(r.getUrlByName(s.CHANGE_CURRENCY_API), {
                currency: t
            }).success(function() {
                u = 1
            }).error(function() {
                4 > u && (p(t), u++)
            })
        },
        m = function() {
            var t = c.defer();
            return e.get(r.getUrlByName(s.CART_HAS_ITEMS)).success(function(e) {
                f = e.hasitems, t.resolve()
            }).error(function() {
                return f = !1, t.reject()
            }), t.promise
        };
    return {
        addItem: function(e, t, o) {
            u = 1, v(e, t, o)
        },
        removeItem: function(t, o) {
            var i = !1;
            n.each(d, function(e, n) {
                i || e.product.item_id === t && e.size === o && (d.splice(n, 1), i = !0)
            }), e.post(r.getUrlByName(s.CART_API_REMOVE), {
                productid: o,
                count: 1
            }).success(function() {}).error(function() {}), l()
        },
        getItems: function() {
            return d
        },
        setItems: function(e) {
            d = e, l()
        },
        clear: function() {
            d = [], l()
        },
        checkMagentoCart: function() {
            return m()
        },
        hasItemsInMagentoCart: function() {
            return f
        },
        changeCurrency: function(e) {
            u = 1, p(e)
        }
    }
}]), etqGlobal.factory("FilterService", [function() {
    var e = [],
        t = !1;
    return {
        isRevealed: !1,
        initialized: !1,
        genders: [],
        productTypes: [],
        colours: [],
        styles: [],
        sizes: ["EU 36 | US 03 | UK 02", "EU 37 | US 04 | UK 03", "EU 38 | US 05 | UK 04", "EU 39 | US 06 | UK 05", "EU 40 | US 07 | UK 06", "EU 41 | US 08 | UK 07", "EU 42 | US 09 | UK 08", "EU 43 | US 10 | UK 09", "EU 44 | US 11 | UK 10", "EU 45 | US 12 | UK 11", "EU 46 | US 13 | UK 12", "EU 47 | US 14 | UK 13"],
        hasFilters: function() {
            return e.length > 0
        },
        getFilters: function() {
            return e
        },
        hasChanged: function() {
            return t
        },
        getGroupedFilters: function() {
            return t = !1, _.groupBy(e, "type")
        },
        addFilter: function(o, n) {
            e.push({
                type: o,
                value: n
            }), t = !0
        },
        removeFilter: function(o, n) {
            var i = _.reject(e, function(e) {
                return e.type === o && e.value === n
            });
            e = i, t = !0
        },
        clearFilters: function() {
            t = e.length > 0 ? !0 : !1, e = []
        }
    }
}]), etqGlobal.factory("HoverService", ["jkDetectionService", function(e) {
    return {
        setHTML: function(e, t) {
            e.html("<span>" + t + '</span><span class="hover">' + t + "</span>")
        },
        setHTMLWithIcon: function(e, t, o) {
            e.html(o + "<span>" + t + '</span><span class="hover">' + t + "</span>")
        },
        setLabel: function(t, o) {
            if (!e.touch) {
                var n = t.html();
                t.html(n + '<span class="label">' + o + "</span>")
            }
        }
    }
}]), etqGlobal.factory("IntroStateService", function() {
    return {
        isRevealed: !1,
        isAnimating: !0,
        isReady: !1,
        skipIntro: !1,
        blockIntro: !1,
        triggeredToShow: 0,
        valueToShow: 110,
        routeChanged: !1,
        addTriggerToShow: function() {
            this.triggeredToShow++
        }
    }
}), etqGlobal.factory("LocalStorageService", function() {
    var e = "etq.amsterdam";
    return {
        introPlayed: !1,
        getItem: function(t) {
            return localStorage.getItem(e + "." + t)
        },
        hasItem: function(t) {
            var o = localStorage.getItem(e + "." + t);
            return null === o ? !1 : !0
        },
        setItem: function(t, o) {
            localStorage.setItem(e + "." + t, o)
        },
        removeItem: function(t) {
            localStorage.removeItem(e + "." + t)
        },
        clear: function() {
            localStorage.clear()
        }
    }
}), etqGlobal.factory("MenuStateService", function() {
    return {
        isOpen: !1,
        menuLabel: "",
        menuWidth: 281
    }
}), etqGlobal.factory("ResizeService", [function() {
    return {
        isSmall: function() {
            return $(window).width() < 700
        },
        isMedium: function() {
            return $(window).width() >= 700 && $(window).width() <= 1024
        },
        isiPadLandscapeUp: function() {
            return $(window).width() > 1020
        },
        isiPadLandscapeDown: function() {
            return $(window).width() <= 1020
        },
        isLarge: function() {
            return $(window).width() > 1024
        },
        isLaptop: function() {
            return $(window).width() > 1280
        },
        isXLarge: function() {
            return $(window).width() > 1680
        },
        isMediumDown: function() {
            return $(window).width() <= 1024
        },
        isMediumUp: function() {
            return $(window).width() >= 700
        }
    }
}]), etqGlobal.factory("ScrollService", ["ScrollDirections", "MenuStateService", "FilterService", "ResizeService", function(e, t, o, n) {
    return {
        scrollDirection: e.DOWN,
        enableScroll: function() {
            t.isOpen || o.isRevealed || $("body").removeClass("no-scroll"), o.isRevealed && n.isSmall() && $("body").removeClass("no-scroll")
        },
        disableScroll: function() {
            o.isRevealed && n.isSmall() || $("body").addClass("no-scroll")
        }
    }
}]), etqGlobal.factory("ViewPortService", ["ResizeService", function() {
    return {
        vwToPx: function(e) {
            var t = $(window).width();
            return t * (e / 100)
        },
        vhToPX: function(e) {
            var t = $(window).height();
            return t * (e / 100)
        },
        getautovw: function() {}
    }
}]), app.constant("States", {
    INTRO: "intro",
    COLLECTION: "collection",
    PRODUCT: "product",
    LOOKBOOK: "lookbook",
    ABOUT: "about",
    STOCKISTS_LIST: "stockists-list",
    STOCKISTS_STORES: "stockists-store",
    SERVICEDESK_LIST: "servicedesk-list",
    SERVICEDESK_SUBJECTS: "servicedesk-subjects",
    SERVICEDESK_QUESTIONS: "servicedesk-questions",
    ERROR: "error"
}), app.constant("StockistsDefaults", {
    ZOOM: 15,
    STYLES_ARRAY: [{
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{
            color: "#4c4c4c"
        }]
    }, {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{
            color: "#0e0e0e"
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [{
            color: "#0e0e0e"
        }]
    }, {
        featureType: "administrative.country",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.province",
        elementType: "geometry",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.province",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.locality",
        elementType: "geometry",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.locality",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.neighborhood",
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "administrative.land_parcel",
        elementType: "geometry",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative.land_parcel",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [{
            visibility: "off"
        }, {
            color: "#292929"
        }]
    }, {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.attraction",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.business",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.government",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.medical",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.place_of_worship",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.school",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "poi.sports_complex",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }, {
            lightness: "-50"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }, {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.highway",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
            visibility: "simplified"
        }]
    }, {
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
            color: "#292929"
        }, {
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            visibility: "on"
        }, {
            color: "#0e0e0e"
        }]
    }, {
        featureType: "water",
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }]
}), app.constant("ViewTypes", {
    ROWS: 1,
    THUMBNAILS: 2,
    SMALL_THUMBNAILS: 3
}), app.factory("CollectionStateService", ["ViewTypes", function(e) {
    var t = null;
    return {
        currentState: e.THUMBNAILS,
        transition: !1,
        transitionOutReady: !0,
        setSelectedItem: function(e) {
            t = e
        },
        getSelectedItem: function() {
            return t
        }
    }
}]), app.factory("ProductsService", ["$q", "$rootScope", "$timeout", "$http", "jkURLService", "jkBroadcastService", "UrlNames", "EventNames", "_", function(e, t, o, n, i, a, r, s, c) {
    function l() {
        return E = e.defer(), n.get(productsData).then(function(e) {
            I = 1, v = e.data, E.resolve(v)
        }, function() {
            return 5 > I ? (I++, l()) : void E.reject()
        }), a.addListener(s.COLLECTION_FILTER, t, u), E.promise
    }

    function d(t) {
        E = e.defer();
        var o = t.split("/")[2];
        if (!i.isLoaded()) return c.delay(d, 10, t);
        var a = i.getUrlByName(r.JSON_SINGLE_PRODUCT);
        return n.get(a + o).then(function(e) {
            I = 1, p = e.data, E.resolve(p)
        }, function() {
            return 5 > I ? (I++, d(t)) : (E.reject(), E.promise)
        }), E.promise
    }

    function u(e) {
        var t = [];
        if (void 0 !== e) {
            T = !0;
            var o = [],
                n = [],
                i = [],
                r = [],
                l = [];
            c.each(v, function(t) {
                var a = t.gender;
                c.isArray(a) ? c.each(a, function(n) {
                    c.contains(c.pluck(e.gender, "value"), n) && o.push(t)
                }) : c.contains(c.pluck(e.gender, "value"), t.gender) && "" !== t && o.push(t), c.contains(c.pluck(e.product, "value"), t.product_category) && "" !== t && n.push(t), c.contains(c.pluck(e.color, "value"), t.color) && "" !== t && i.push(t); {
                    var s = t.product_type;
                    c.pluck(e.style, "value")
                }
                c.isArray(s) && (s = s[s.length - 1]), c.contains(c.pluck(e.style, "value"), s) && "" !== t && r.push(t), c.each(t.associated, function(o) {
                    if (o.qty > 0) {
                        var n = c.pluck(e.size, "value").toString().split("|")[0],
                            i = o.size.split("|")[0].toString(),
                            a = parseInt(i.replace("EU ", "")),
                            r = parseInt(n.replace("EU ", ""));
                        r === a && l.push(t)
                    }
                })
            }), o.length > 0 && t.push(o), n.length > 0 && t.push(n), i.length > 0 && t.push(i), r.length > 0 && t.push(r), l.length > 0 && t.push(l)
        }
        if (0 === t.length) return T = !1, void a.broadcast(s.FILTER_COMPLETE, [v]);
        var d = c.intersection.apply(this, t);
        m = d, a.broadcast(s.FILTER_COMPLETE, [m])
    }

    function f(e) {
        return 0 === w.length && c.each(e, function(e) {
            {
                var t = $("<div/>", {
                    "class": "product small-6 columns",
                    "data-id": e.item_id,
                    "data-type": e.product_type,
                    "data-cat": e.product_category,
                    "data-gender": e.gender,
                    "data-color": e.color
                });
                $("<a/>", {
                    "data-path": e.url_path,
                    href: "collection/" + e.url_path,
                    text: e.product_name
                }).appendTo(t), $("<img />", {
                    src: "/assets/img/empty.gif",
                    "data-small": "/" + e.product_small,
                    "data-medium": "/" + e.product_thumbnail,
                    "data-large": "/" + e.product_image
                }).appendTo(t), $("<label/>", {
                    text: e.stock_label
                }).appendTo(t), $("<span/>", {
                    "class": "hover",
                    html: "<strong>" + e.product_title_1 + "</strong>" + e.product_title_2
                }).appendTo(t)
            }
            w.push(t)
        }), w
    }
    var v, p, m, h, S, g, C, w = [],
        T = !1,
        E = e.defer(),
        I = 1;
    return {
        loadAllProducts: function() {
            return l()
        },
        loadSingleProduct: function(e) {
            return d(e)
        },
        parseProducts: function(e) {
            return f(e)
        },
        getGenders: function() {
            if (void 0 === h) {
                var e = c.pluck(v, "gender"),
                    t = [];
                c.each(e, function(e) {
                    c.isArray(e) && c.each(e, function(e) {
                        t.push(e)
                    }), c.isString(e) && t.push(e)
                }), h = c.sortBy(c.uniq(t))
            }
            return h
        },
        getTypes: function() {
            return void 0 === g && (g = c.sortBy(c.uniq(c.pluck(v, "product_category")))), g
        },
        getColours: function() {
            return void 0 === C && (C = c.sortBy(c.uniq(c.pluck(v, "color")))), C
        },
        getStyles: function() {
            if (void 0 === S) {
                var e = c.pluck(v, "product_type"),
                    t = [];
                c.each(e, function(e) {
                    c.isArray(e) && t.push(c.last(e)), c.isString(e) && t.push(e)
                }), S = c.sortBy(c.uniq(t))
            }
            return S
        }
    }
}]), app.factory("SingleProductService", function() {
    return {
        isZoomed: !1,
        blockZoom: !1,
        imageIndex: 0,
        product: null,
        sideInfoRightOffset: 92
    }
}), etqGlobal.factory("StockistsService", ["$q", "$http", "$timeout", "UrlNames", "jkURLService", "_", function(e, t, o, n, i, a) {
    function r() {
        return c = i.getUrlByName(n.JSON_COUNTRIES), t.get(c).then(function(e) {
            l = e.data, d.resolve(l)
        }, function() {
            d.reject()
        }), d.promise
    }

    function s() {
        return i.isLoaded() ? r() : void o(function() {
            return s()
        }, 50)
    }
    var c, l, d = e.defer();
    return {
        loadData: function() {
            return s()
        },
        getCountry: function(e) {
            if (void 0 !== l) {
                var t = e.toLowerCase().split(" ").join(""),
                    o = a.find(l, function(e) {
                        return e.name.toLowerCase().replace(" ", "") === t
                    });
                return o
            }
        }
    }
}]);
var broadcastCenter = angular.module("jkBroadcastCenter", ["underscore"]),
    detector = angular.module("jkDeviceDetector", ["underscore"]),
    urlManager = angular.module("jkURLManager", ["underscore"]);
etqGlobal.controller("AbstractController", ["$scope", "$interval", "jkBroadcastService", "jkURLService", "UrlNames", "EventNames", "AppConfig", "LocalStorageService", "_", function(e, t, o, n, i, a, r, s) {
    e.view = null, e.baseUrl = null, e.abstractInit = function() {
        l()
    }, e.getStorageItem = function(t) {
        return s.hasItem(t) ? s.getItem(t) : (e.log("StorageItem not available"), null)
    }, e.setStorageItem = function(e, t) {
        s.setItem(e, t)
    }, e.log = function(e, t) {
        r.DEBUG === !0 && window.console && (void 0 === t ? console.log(e) : console.log(e, t))
    }, e.info = function(e, t) {
        r.DEBUG_INFO === !0 && window.console && (void 0 === t ? console.info(e) : console.info(e, t))
    }, e.warn = function(e, t) {
        r.DEBUG_WARN === !0 && window.console && (void 0 === t ? console.warn(e) : console.warn(e, t))
    }, e.error = function(e, t) {
        r.DEBUG_ERROR === !0 && window.console && (void 0 === t ? console.error(e) : console.error(e, t))
    };
    var c = function() {
            TweenMax.killAll(), o.cleanScope(e), null !== e.view && (e.view.off(), e.view.children().each(function() {
                $(this).off(), $(this).triggerHandler("$destroy")
            }), e.view.triggerHandler("$destroy"))
        },
        l = function() {
            if (n.isLoaded()) e.baseUrl = n.getUrlByName(i.BASE_URL);
            else var o = t(function() {
                e.baseUrl = n.getUrlByName(i.BASE_URL), t.cancel(o)
            }, 50)
        };
    e.$on("$destroy", function() {
        c()
    })
}]), etqGlobal.controller("AbstractPageController", ["$scope", "$rootScope", "$state", "$timeout", "$interval", "$controller", "MenuStateService", "MenuLabels", "EventNames", "ScrollService", "jkBroadcastService", "LocalStorageKeys", "CartService", "Currencies", function(e, t, o, n, i, a, r, s, c, l, d, u, f, v) {
    function p() {
        var e = "test";
        try {
            return localStorage.setItem(e, e), localStorage.removeItem(e), !0
        } catch (t) {
            return !1
        }
    }
    a("AbstractController", {
        $scope: e
    }), e.menuLabel = "";
    var m, h = 0;
    e.abstractPageInit = function() {
        m = $("body"), m.removeClass("cart-open").removeClass("menu-open"), w(), e.validateCart(), h = i(function() {
            e.validateCart()
        }, 901e3), d.broadcast(c.CHANGE_MENU_ITEM), e.abstractInit(), t.$on("$stateChangeStart", S)
    };
    var S = function() {
        $(window).scrollTop(0)
    };
    e.getMenuLabel = function() {
        return e.menuLabel
    }, e.validateCart = function() {
        if (p() === !0) {
            var t = !1,
                o = !1;
            f.checkMagentoCart().then(function() {
                t = f.hasItemsInMagentoCart(), o = !0
            }, function() {
                t = !1, o = !0
            });
            var n = i(function() {
                if (o) {
                    i.cancel(n);
                    var a = e.getStorageItem(u.CART_LAST_UPDATE);
                    if (t === !1) f.clear();
                    else if (a === !1) f.clear();
                    else {
                        var r = Date.now() - 9e5;
                        r > a && f.clear()
                    }
                    e.setStorageItem(u.CART_LAST_UPDATE, Date.now()), g()
                }
            }, 100)
        } else alert("ETQ. uses cookies to store products in your cart. Please disable private mode to continue.")
    };
    var g = function() {
            var t = e.getStorageItem(u.SELECTED_CURRENCY),
                o = null == t ? v.EURO : t;
            C(o)
        },
        C = function(t) {
            e.setStorageItem(u.SELECTED_CURRENCY, t), d.broadcast(c.CURRENCY_CHANGED, [t])
        },
        w = function() {
            d.addListener(c.SHOW_MENU, e, L), d.addListener(c.HIDE_MENU, e, _), d.addListener(c.SHOW_CART, e, L), d.addListener(c.HIDE_CART, e, _), d.addListener(c.HIDE_CART, e, I), d.addListener(c.SHOW_MENU, e, T), d.addListener(c.SHOW_CART, e, E)
        },
        T = function() {
            m.addClass("menu-open")
        },
        E = function() {
            m.addClass("cart-open")
        },
        I = function() {
            m.removeClass("cart-open")
        },
        _ = function() {
            l.enableScroll(), document.body.removeEventListener("touchmove", O)
        },
        L = function() {
            l.disableScroll(), document.body.addEventListener("touchmove", O)
        },
        O = function(e) {
            return e.preventDefault(), !1
        },
        b = function() {
            _(), i.cancel(h), d.cleanScope(e), d.getAllListenersForScope(e)
        };
    e.$watch(e.menuLabel, function() {
        r.menuLabel = e.menuLabel
    }), e.$on("$destroy", function() {
        b()
    })
}]), etqGlobal.controller("NavBarController", ["$scope", "$rootScope", "$injector", "$controller", "$location", "EventNames", "jkBroadcastService", "LocalStorageKeys", "jkURLService", "UrlNames", "HoverService", "IntroStateService", "_", function(e, t, o, n, i, a, r, s, c, l, d, u, f) {
    n("AbstractController", {
        $scope: e
    });
    var v, p, m, h, S = !1;
    e.init = function() {
        e.view = $(".navBar").last(), o.has("States") && (S = o.get("States"), h = o.get("$state")), S !== !1 && t.$state.current.name === S.INTRO && e.view.removeClass("ready"), v = e.view.find(".cartcount"), p = e.view.find(".logo"), m = e.view.find(".menu"), d.setLabel(m, "MENU"), C(), g(), e.abstractInit()
    }, e.showMenu = function() {
        r.broadcast(a.SHOW_MENU)
    }, e.showCart = function() {
        r.broadcast(a.SHOW_CART)
    };
    var g = function() {
            r.addListener(a.HIDE_LOGO, e, T), r.addListener(a.HIDE_INTRO, e, E), r.addListener(a.HIDE_INTRO, e, I), r.addListener(a.SHOW_INTRO, e, T), p.on("click", function() {
                S !== !1 ? h.go(S.COLLECTION) : (c.openUrlByName(l.COLLECTION), i.replace())
            })
        },
        C = function() {
            var t = $("<span/>", {
                "class": "hitarea"
            });
            t.prependTo(v);
            var o = JSON.parse(e.getStorageItem(s.CART_ITEMS));
            L(null !== o ? o : []), r.addListener(a.CART_UPDATE, e, L)
        },
        w = function(e) {
            v.text(e), v.find(".hitarea").remove();
            var t = $("<span/>", {
                "class": "hitarea"
            });
            t.prependTo(v), d.setLabel(v, "BAG")
        },
        T = function() {
            v.removeClass("show"), m.addClass("hide")
        },
        E = function() {
            f.delay(_, 1e3)
        },
        I = function() {
            e.view.addClass("ready")
        },
        _ = function() {
            v.addClass("show"), p.removeClass("hide"), m.removeClass("hide")
        },
        L = function(e) {
            var t = e.length;
            v.removeClass("active"), t > 0 ? v.addClass("active") : r.broadcast(a.HIDE_CART), w(t)
        }
}]), etqGlobal.controller("CartController", ["$scope", "$controller", "LocalStorageKeys", "jkBroadcastService", "EventNames", "_", "CartService", "Currencies", "jkURLService", "UrlNames", "HoverService", "ScrollService", "MenuStateService", function(e, t, o, n, i, a, r, s, c, l, d, u, f) {
    t("AbstractController", {
        $scope: e
    });
    var v, p, m, h, S, g, C = [],
        w = {};
    e.init = function() {
        e.view = $(".shoppingcart").last(), m = $(".cart-products"), S = e.view.find("footer span"), p = e.view.find(".cartcount"), g = e.view.find(".checkout"), v = e.view.find("#cart-scroll"), p.on("click", function() {
            u.enableScroll(), f.isOpen = !1, n.broadcast(i.HIDE_CART)
        }), void 0 !== v && v.jScrollPane({
            autoReinitialise: !0
        }), d.setHTML(g, g.html()), E(), T(), e.abstractInit()
    }, e.gotoCheckout = function() {
        addSpinner(g), g.attr("disabled", !0), c.openUrlByName(l.CHECKOUT)
    };
    var T = function() {
            n.addListener(i.CURRENCY_CHANGED, e, R)
        },
        E = function() {
            h = e.getStorageItem(o.SELECTED_CURRENCY);
            var t = JSON.parse(e.getStorageItem(o.CART_ITEMS));
            null !== t ? (r.setItems(t), I(t)) : (r.setItems([]), I([])), n.addListener(i.CART_UPDATE, e, I)
        },
        I = function(e) {
            y(), k(e.length), _(e)
        },
        _ = function(e) {
            C = [];
            var t = [];
            w = D(), a.each(e, function(e) {
                var o = $("<li/>"),
                    n = $("<figure/>").appendTo(o),
                    i = $("<img/>").appendTo(n),
                    r = $("<div/>").appendTo(o),
                    s = $("<h3/>").appendTo(r),
                    c = $("<p/>").appendTo(r),
                    l = $("<h4/>").appendTo(r),
                    d = $("<button/>").appendTo(r);
                o.attr("data-id", e.product.item_id), o.attr("data-size", e.size), i.attr("src", e.product.product_small), s.text(e.product.product_name), c.html(b(e) + ' QTY: <span class="count">1</span>'), w.euro += parseFloat(e.product.item_price_euro), w.pounds += parseFloat(e.product.item_price_pounds), w.dollar += parseFloat(e.product.item_price_dollar), l.attr("data-euro", e.product.item_price_euro), l.attr("data-pounds", e.product.item_price_pounds), l.attr("data-dollar", e.product.item_price_dollar), l.text(N(e.product)), C.push(l), d.text("x"), d.on("click", function() {
                    var e = o.find("div").attr("data-count");
                    if (parseInt(e) > 1) {
                        var t = parseInt(e) - 1;
                        o.find("div").attr("data-count", t);
                        var n = c.find("span.count");
                        n.addClass("hilight"), n.text(t.toString()), a.delay(O, 400, n, o)
                    } else o.addClass("slideout"), a.delay(L, 610, o)
                }), t.push({
                    id: o.attr("data-id"),
                    size: e.size,
                    item: o
                })
            }), S.text(A());
            var o = a.groupBy(t, "size");
            a.each(o, function(e) {
                var t = e.length,
                    o = e[0].item,
                    n = o.find("p");
                n.parent("div").attr("data-count", t);
                var i = n.find("span.count");
                i.text(t);
                var a = o.find("h4");
                a.text(U(a)), m.append(o)
            })
        },
        L = function(e) {
            r.removeItem(e.attr("data-id"), e.attr("data-size")), e.remove()
        },
        O = function(e, t) {
            e.removeClass("hilight"), r.removeItem(t.attr("data-id"), t.attr("data-size"))
        },
        b = function(e) {
            var t = e.size,
                o = "",
                n = e.product.associated;
            return a.each(n, function(e) {
                e.id === t && (o = e.size)
            }), o
        },
        y = function() {
            m.children("li").remove()
        },
        k = function(e) {
            p.removeClass("active"), e > 0 && p.addClass("active"), p.text(e), d.setLabel(p, "CLOSE"), e > 0 ? g.removeAttr("disabled") : (u.enableScroll(), g.attr("disabled", !0))
        },
        R = function(e) {
            h = e, a.each(C, function(e) {
                e.text(U(e))
            }), S.text(A())
        },
        N = function(e) {
            switch (h) {
                case s.DOLLAR:
                    return "$ " + parseFloat(e.item_price_dollar).toFixed(2);
                case s.EURO:
                    return "â‚¬ " + parseFloat(e.item_price_euro).toFixed(2);
                case s.POUNDS:
                    return "Â£ " + parseFloat(e.item_price_pounds).toFixed(2)
            }
        },
        A = function() {
            var e = 0,
                t = 0;
            switch (h) {
                case s.DOLLAR:
                    return t = parseFloat(w.dollar).toFixed(2), e = isNaN(t) ? "0.00" : t, "$ " + e;
                case s.EURO:
                    return t = parseFloat(w.euro).toFixed(2), e = isNaN(t) ? "0.00" : t, "â‚¬ " + e;
                case s.POUNDS:
                    return t = parseFloat(w.pounds).toFixed(2), e = isNaN(t) ? "0.00" : t, "Â£ " + e
            }
        },
        U = function(e) {
            var t = parseInt(e.parent("div").attr("data-count"));
            switch (h) {
                case s.DOLLAR:
                    return "$ " + parseFloat(t * e.attr("data-dollar")).toFixed(2);
                case s.EURO:
                    return "â‚¬ " + parseFloat(t * e.attr("data-euro")).toFixed(2);
                case s.POUNDS:
                    return "Â£ " + parseFloat(t * e.attr("data-pounds")).toFixed(2)
            }
        },
        D = function() {
            var e = {
                euro: 0,
                dollar: 0,
                pounds: 0
            };
            return e
        }
}]), etqGlobal.controller("MenuController", ["$scope", "$rootScope", "$controller", "$timeout", "$state", "EventNames", "MenuStateService", "jkURLService", "UrlNames", "HoverService", "jkURLTargets", "jkBroadcastService", function(e, t, o, n, i, a, r, s, c, l, d, u) {
    o("AbstractController", {
        $scope: e
    }), e.init = function() {
        e.view = $(".sidemenu"), f(), m(), S(), e.abstractInit()
    }, e.goSocial = function(e) {
        switch (e) {
            case c.FACEBOOK:
            case c.INSTAGRAM:
            case c.TWITTER:
                s.openUrlByName(e, d._BLANK)
        }
    };
    var f = function() {
            p();
            var t = e.view.find("a");
            t.off("click", v), t.on("click", v)
        },
        v = function(e) {
            e.preventDefault(), u.broadcast(a.HIDE_MENU);
            var o = $(this),
                r = o.attr("data-state");
            if (void 0 === o.attr("ng-href")) r !== t.$state.current.name && (u.broadcast(a.MENU_NAV_TRANSITION, [r]), n(function() {
                i.go(r)
            }, 600));
            else {
                var s = o.attr("ng-href");
                u.broadcast(a.MENU_NAV_TRANSITION, [r]), _.delay(h, 600, s)
            }
        },
        p = function() {
            e.collectionURL = s.getUrlByName(c.COLLECTION), e.lookbookURL = s.getUrlByName(c.LOOKBOOK), e.aboutURL = s.getUrlByName(c.ABOUT), e.stockistsURL = s.getUrlByName(c.STOCKISTS), e.serviceDeskURL = s.getUrlByName(c.SERVICE_DESK), e.loginURL = s.getUrlByName(c.LOGIN), u.addListener(a.CHANGE_MENU_ITEM, e, S)
        },
        m = function() {
            var t = e.view.find("footer"),
                o = t.find("button.facebook"),
                n = t.find("button.instagram"),
                i = t.find("button.twitter");
            l.setHTML(o, '<i class="fa fa-facebook"></i>'), l.setHTML(i, '<i class="fa fa-twitter"></i>'), l.setHTML(n, '<i class="fa fa-instagram"></i>')
        },
        h = function(e) {
            window.location.href = e
        },
        S = function() {
            $('a[data-item="' + r.menuLabel + '"]').parent("li").addClass("selected")
        },
        g = function() {};
    e.$on("$destroy", function() {
        g()
    })
}]), etqGlobal.controller("OverlayController", ["$scope", "$controller", "EventNames", "MenuStateService", "jkBroadcastService", function(e, t, o, n, i) {
    t("AbstractController", {
        $scope: e
    }), e.init = function() {
        e.view = $(".overlay").last(), a(), e.abstractInit()
    };
    var a = function() {
            i.addListener(o.SHOW_MENU, e, r), i.addListener(o.HIDE_MENU, e, s), i.addListener(o.SHOW_CART, e, r), i.addListener(o.HIDE_CART, e, s)
        },
        r = function() {
            n.isOpen = !0
        },
        s = function() {
            $("body").removeClass("menu-open").removeClass("cart-open"), n.isOpen = !1
        };
    e.closeOverlay = function() {
        i.broadcast(o.HIDE_MENU), i.broadcast(o.HIDE_CART)
    }
}]), app.controller("AsideContentController", ["$scope", "$controller", "EventNames", "jkBroadcastService", "ResizeService", "_", function(e, t, o, n, i, a) {
    t("AbstractController", {
        $scope: e
    }), e.offsetValue = 0, e.initAbstractAsideContent = function() {
        e.nav = $(".page-aside").first(), n.addListener(o.ASIDE_DATA_READY, e, e.activateResizes), a.delay(r, 100), e.abstractInit()
    }, e.activateResizes = function() {
        e.nav = $(".page-aside").first(), $(window).on("resize", e.handleResizeChanges), e.handleResizeChanges()
    }, e.handleResizeChanges = function() {
        i.isSmall() ? e.view.css({
            left: 0
        }) : (e.offsetValue = e.nav.width() - 100, e.view.css({
            left: e.offsetValue
        }))
    };
    var r = function() {
            e.view.addClass("introduce")
        },
        s = function() {
            e.view.removeClass("introduce")
        };
    e.$on("$destroy", function() {
        s()
    })
}]), app.controller("AsideListController", ["$scope", "$rootScope", "$controller", "$state", "$timeout", "EventNames", "jkBroadcastService", "jkDetectionService", "ResizeService", "States", function(e, t, o, n, i, a, r, s, c, l) {
    o("AbstractController", {
        $scope: e
    });
    var d, u, f = [];
    e.abstractListInit = function() {
        e.abstractInit(), e.view = $(".page-aside"), e.nav = e.view.find("#step1"), f = e.view.children(".detail-step"), v(), p(), m(), i(function() {
            C(), m()
        }, 500), i(function() {
            r.broadcast(a.ASIDE_DATA_READY)
        }, 300), r.addListener(a.ASIDE_UPDATE_HEIGHT, e, m)
    };
    var v = function() {
            $(window).on("resize", g)
        },
        p = function() {
            d = t.$on("$stateChangeStart", h), u = t.$on("$stateChangeSuccess", S)
        },
        m = function() {
            i(function() {
                var o = e.view.find(".scroll-container.active:not(.prev)"),
                    n = o.find(".detail-content:not(.ng-hide)");
                e.active = 0 === n.length ? o : n;
                var i = e.active.outerHeight(!0);
                if (c.isMediumUp() && t.$state.current.name === l.SERVICEDESK_QUESTIONS) {
                    var a = $("#service-desk-detail").find(".content:not(.ng-hide)"),
                        r = a.outerHeight(!0);
                    r > i ? i = r + 90 : i += 52
                }
                e.view.css({
                    height: i
                })
            }, 500)
        },
        h = function(e, t, o, n) {
            $(window).scrollTop(0);
            var i = $(".first");
            (n.name === l.SERVICEDESK_LIST || n.name === l.STOCKISTS_LIST) && ($("span.key").removeClass("active"), i.addClass(".prev")), t.name === l.SERVICEDESK_QUESTIONS ? g() : i.removeClass(".prev")
        },
        S = function() {
            m()
        },
        g = function() {
            f.each(function() {
                var t = $(this);
                t.offset().left > 0 && t.css({
                    left: e.nav.width()
                })
            }), m()
        },
        C = function() {
            e.view.addClass("show"), $(".scroll-container").addClass("animate")
        },
        w = function() {
            e.view.removeClass("show")
        },
        T = function() {
            w(), u(), d()
        };
    e.$on("$destroy", function() {
        T()
    })
}]), app.controller("CollectionController", ["$scope", "$rootScope", "$controller", "$interval", "$timeout", "$state", "States", "jkBroadcastService", "IntroStateService", "EventNames", "ViewTypes", "LocalStorageKeys", "ResizeService", "jkDetectionService", "CollectionStateService", "ProductsService", "ScrollService", "FilterService", "_", function(e, t, o, n, i, a, r, s, c, l, d, u, f, v, p, m, h, S, g) {
    o("AbstractController", {
        $scope: e
    });
    var C = null,
        w = null,
        T = null,
        E = [],
        I = [],
        _ = [],
        L = 0,
        O = null,
        b = v.retina || v.retinahd || v.superhd,
        y = f.isSmall(),
        k = f.isMedium(),
        R = f.isXLarge(),
        N = $(window).height(),
        A = 0,
        U = "",
        D = !1,
        P = [],
        M = !1,
        x = 0,
        H = 0;
    e.init = function() {
        e.view = $(".collectionview").last(), O = null, B(), G()
    };
    var G = function() {
            var t = e.getStorageItem(u.CATALOG_STATE),
                o = null === t ? d.THUMBNAILS : t;
            p.currentState = parseInt(o), i(function() {
                $("#collection-footer").removeClass("slidedown")
            }, 500)
        },
        B = function() {
            s.addListener(l.SHOW_INTRO, e, W), s.addListener(l.SHOW_INTRO, e, Q), s.addListener(l.HIDE_INTRO, e, j), s.addListener(l.HIDE_INTRO, e, Y), s.addListener(l.HIDE_FILTER, e, ct), s.addListener(l.SHOW_FILTER, e, lt), s.addListener(l.PRODUCTS_READY, e, Z), s.addListener(l.CHANGE_CATALOG_VIEW, e, it), s.addListener(l.COLLECTION_FILTER, e, J), s.addListener(l.FILTER_COMPLETE, e, X), s.addListener(l.MENU_NAV_TRANSITION, e, z)
        },
        F = function() {
            e.view.removeClass("show"), p.transitionOutReady = !0, C = g.throttle(et, 20), w = g.throttle(tt, 100), T = g.debounce(q, 500), v.touch || $(window).on("scroll", C), $(window).on("resize", T);
            var t = n(function() {
                p.transitionOutReady && (n.cancel(t), i(function() {
                    ft(0, 0), i(function() {
                        V()
                    }, 150)
                }, 600))
            }, 10)
        },
        j = function() {
            p.transitionOutReady = !0, C = g.throttle(et, 20), w = g.throttle(tt, 200), T = g.debounce(q, 500), v.touch || $(window).on("scroll", C), $(window).on("resize", T), g.delay(V, 10)
        },
        z = function() {
            t.$state.current.name === r.COLLECTION && (e.view.removeClass("show"), $("#legalfooter").removeClass("introduce"))
        },
        K = function() {
            nt(), v.touch || et(), tt()
        },
        V = function() {
            i(function() {
                e.view.addClass("show"), S.hasFilters() || $("#legalfooter").addClass("introduce"), D = !0
            }, 500)
        },
        W = function() {
            O = null, e.view.removeClass("show"), v.touch || $(window).off("scroll", C), $(window).off("resize", T), C = null, w = null, T = null
        },
        Q = function() {
            TweenLite.fromTo(e.view, 1, {
                y: 0
            }, {
                y: $(window).height(),
                ease: Quart.easeInOut,
                clearProps: "all"
            }), p.setSelectedItem(null)
        },
        q = function() {
            b = v.retina || v.retinahd || v.superhd, y = f.isSmall(), k = f.isMedium(), R = f.isXLarge(), K()
        },
        Y = function() {
            TweenLite.fromTo(e.view, 1.2, {
                y: $(window).height()
            }, {
                y: 0,
                ease: Quart.easeInOut,
                clearProps: "all",
                onUpdate: g.throttle(function() {
                    v.touch || $(window).trigger("scroll")
                }, 100)
            })
        },
        Z = function(t) {
            I = t, E = m.parseProducts(t);
            var o = $("<div/>");
            g.each(E, function(e) {
                e.appendTo(o)
            }), e.view.html(o.html()), _ = e.view.find(".product"), L = _.length, _.each(function(e) {
                var t = $(this);
                I[e].imageElement = t.find("img");
                var o = t.find("a");
                o.off("click"), o.on("click", function(e) {
                    e.preventDefault()
                }), t.on("click", function(e) {
                    e.preventDefault(), t.addClass("remove-for-transition"), $("#collection-footer").addClass("slidedown"), g.delay(W, 300);
                    var n = i(function() {
                        i.cancel(n);
                        var e = o.attr("data-path");
                        p.setSelectedItem(e), a.go(r.PRODUCT, {
                            id: e
                        })
                    }, 800)
                })
            });
            var n = S.getGroupedFilters();
            s.broadcast(l.COLLECTION_FILTER, [n]), at(p.currentState), c.skipIntro && F()
        },
        J = function() {
            e.view.removeClass("show")
        },
        X = function(t) {
            if ($(".no-filter-txt").remove(), S.hasFilters() && t.length <= 0) {
                var o = $("<p/>", {
                        id: "no-filter-text",
                        "class": "no-filter-txt",
                        text: "Please update your filters"
                    }).prependTo(e.view.parent()),
                    n = $("<h1/>", {
                        id: "no-filter-title",
                        "class": "no-filter-txt",
                        text: "Nothing found"
                    }).prependTo(e.view.parent());
                i(function() {
                    n.addClass("introduce"), o.addClass("introduce")
                }, 100)
            } else t.length > 0 && (_.addClass("filtered"), i(function() {
                g.each(t, function(e) {
                    var t = e.item_id;
                    $('.product[data-id="' + t + '"]').removeClass("filtered")
                }), D && ($(window).scrollTop(0), K(), e.view.addClass("show"))
            }, 500))
        },
        et = function() {
            A = $(window).scrollTop();
            var e = A + N,
                t = 0;
            for (t; L > t; t++) {
                var o = $(_[t]);
                if (!(o.offset().top < e)) break;
                o.addClass("onscreen")
            }
            for (t; L > t; t++) $(_[t]).removeClass("onscreen");
            return !0
        },
        tt = function() {
            for (var e = 0, t = 0; L > t; t++) {
                var o = I[t],
                    n = "";
                switch (U) {
                    case "s":
                        n = "/" + I[t].product_small;
                        break;
                    case "m":
                        n = "/" + I[t].product_thumbnail;
                        break;
                    case "l":
                        n = "/" + I[t].product_image
                }
                if (n !== o.currentImageSrc) {
                    var i = $(_[t]),
                        a = o.imageElement;
                    o.currentImageSrc = n, t > 0 && t % 2 === 0 && (e += 100), t > 0 && a.attr({
                        width: x,
                        height: H
                    }), P.push({
                        img: a,
                        item: i,
                        index: t,
                        src: n
                    })
                }
            }
            return P.length > 0 && !M ? ot(P.shift()) : $(_).addClass("ready"), !0
        },
        ot = function(e) {
            M = !0, e.img.on("load", function() {
                e.item.addClass("ready"), e.img.off("load"), P.length > 0 ? 4 === e.index ? g.delay(ot, 500, P.shift()) : ot(P.shift()) : (P = [], M = !1)
            }).attr("src", e.src)
        },
        nt = function() {
            var e = p.currentState;
            if (v.touch) U = y ? "s" : e === d.ROWS ? "m" : "s";
            else if (y) U = "s";
            else if (k) U = e === d.SMALL_THUMBNAILS ? "s" : b ? "m" : "s";
            else switch (e) {
                default:
                    case d.THUMBNAILS:
                    U = "m";
                break;
                case d.SMALL_THUMBNAILS:
                        U = b ? "m" : "s";
                    break;
                case d.ROWS:
                        U = b || R ? "l" : "m"
            }
            x = H = Math.round(I[0].imageElement.width())
        },
        it = function(e) {
            ut(), i(function() {
                at(e), ft(0, 0)
            }, 500)
        },
        at = function(e) {
            switch (p.currentState = parseInt(e), p.currentState) {
                case d.ROWS:
                    rt("rows"), st("large-12", "medium-12", "small-12");
                    break;
                case d.SMALL_THUMBNAILS:
                    rt("small-thumbs"), st("large-3", "medium-4", "small-6");
                    break;
                default:
                case d.THUMBNAILS:
                    rt("thumbs"), st("large-6", "medium-6", "small-6")
            }
        },
        rt = function(t) {
            e.view.removeClass("small-thumbs rows thumbs"), e.view.addClass(t)
        },
        st = function(e, t, o) {
            _.removeClass("large-12 medium-12 small-12 large-6 medium-6 small-6 large-3 medium-4 onscreen ready"), _.addClass(e + " " + t + " " + o), K(), g.delay(dt, 100)
        },
        ct = function() {
            h.enableScroll(), O = null, ut(!1), g.delay(dt, 300)
        },
        lt = function() {
            h.disableScroll()
        },
        dt = function() {
            e.view.removeClass("view-change transition")
        },
        ut = function(t) {
            var o = t === !1 ? !1 : !0;
            e.view.addClass(o ? "view-change transition" : "view-change")
        },
        ft = function(e, t) {
            var o = p.getSelectedItem(),
                n = 0,
                i = 0;
            if (!O && !o) return $(window).scrollTop(0), !0;
            var a = 2 * $("#navBar").height();
            null !== O ? (n = O.position().top - a, i = n / O.height() * t) : null !== o && _.each(function() {
                var e = $(this);
                e.find("a").attr("data-path") === o && (n = e.position().top - a, i = n / e.height() * t)
            }), i = Math.min(i, 2), isNaN(i) && (i = 0);
            var r = {
                x: 0,
                y: n
            };
            TweenLite.to(window, i, {
                scrollTo: r,
                ease: Quart.easeOut,
                delay: e
            })
        }
}]), app.controller("FilterOverlayController", ["$scope", "$controller", "jkBroadcastService", "EventNames", "FilterService", "ResizeService", "ProductsService", "HoverService", "ScrollService", function(e, t, o, n, i, a, r, s, c) {
    t("AbstractController", {
        $scope: e
    }), e.genders = i.genders, e.types = i.productTypes, e.colours = i.colours, e.styles = i.styles;
    var l, d, u, f, v, p, m, h, S, g, C, w, T = 0;
    e.init = function() {
        o.addListener(n.COLLECTION_FILTER, e, O), e.view = $("#filters"), d = $("#filterLists"), f = $(".filterList").find("h3"), u = $(".filterList").find("ul").children("li"), u.remove(), l = e.view.find("nav"), w = $(l.children("button")[1]), w.addClass("disabled"), p = $('ul[data-type="gender"]'), m = $('ul[data-type="product"]'), h = $('ul[data-type="color"]'), S = $('ul[data-type="style"]'), g = $('ul[data-type="size"]'), C = $(".closeFilters"), v = [], P(), E(), I(), e.abstractInit(), o.broadcast(n.PAGE_READY)
    }, e.clearFilters = function() {
        i.clearFilters(), i.hasChanged() && (o.broadcast(n.COLLECTION_FILTER, []), T = 0), w.addClass("disabled"), u.removeClass("selected"), y()
    }, e.submitFilters = function() {
        if (i.hasChanged()) {
            var e = i.getGroupedFilters();
            o.broadcast(n.COLLECTION_FILTER, [e])
        }
        y()
    }, e.closeFilters = function() {
        y()
    };
    var E = function() {
            o.addListener(n.SHOW_FILTER, e, b)
        },
        I = function() {
            f.on("click", function(e) {
                e.preventDefault(), $(e.target).parent().toggleClass("show")
            })
        },
        L = function() {
            a.isSmall() ? (N(), c.enableScroll()) : (R(), c.disableScroll())
        },
        O = function() {
            i.getFilters().length > 0 ? w.removeClass("disabled") : w.addClass("disabled")
        },
        b = function() {
            i.isRevealed = !0, k(), e.view.addClass("show"), l.addClass("show"), c.disableScroll(), a.isSmall() ? N() : R(), $(window).on("resize", L)
        },
        y = function() {
            e.view.removeClass("show"), l.removeClass("show"), u.off("click"), $(window).off("resize", L), i.isRevealed = !1, c.enableScroll(), N(), o.broadcast(n.HIDE_FILTER)
        },
        k = function() {
            e.genders = r.getGenders(), e.types = r.getTypes(), e.colours = r.getColours(), e.styles = r.getStyles(), e.sizes = i.sizes, i.initialized = !0, A()
        },
        R = function() {
            var t = e.view.find(".scrollpane");
            t.each(function() {
                var e = $(this),
                    t = e.jScrollPane({
                        autoReinitialise: !0
                    });
                v.push(t)
            })
        },
        N = function() {
            _.each(v, function(e) {
                void 0 !== e.data().jsp && (e.data().jsp.destroy(), e = null)
            }), v = []
        },
        A = function() {
            p.children("li").remove(), _.each(e.genders, function(e) {
                if ("" !== e) {
                    $("<li/>", {
                        text: e
                    }).appendTo(p)
                }
            }), m.children("li").remove(), _.each(e.types, function(e) {
                if ("" !== e) {
                    $("<li/>", {
                        text: e
                    }).appendTo(m)
                }
            }), h.children("li").remove(), _.each(e.colours, function(e) {
                if ("" !== e) {
                    $("<li/>", {
                        text: e
                    }).appendTo(h)
                }
            }), S.children("li").remove(), _.each(e.styles, function(e) {
                if ("" !== e) {
                    $("<li/>", {
                        text: e
                    }).appendTo(S)
                }
            }), g.children("li").remove();
            $("<li/>", {
                text: "EU | US | UK",
                "class": "key"
            }).appendTo(g);
            _.each(e.sizes, function(e) {
                $("<li/>", {
                    "data-size": e,
                    text: e.replace("EU ", "").replace("US ", "").replace("UK ", "")
                }).appendTo(g)
            }), a.isSmall() || R(), D()
        },
        U = function() {
            u = $(".filterList").find("ul").children("li"), u.each(function() {
                var e = $(this);
                e.on("click", function() {
                    var t = e.parent("ul").attr("data-type");
                    e.toggleClass("selected");
                    var o = e.text();
                    "size" === t && (o = e.attr("data-size")), e.hasClass("selected") ? (T++, w.removeClass("disabled"), i.addFilter(t, o)) : (T--, i.removeFilter(t, o)), 0 >= T && (T = 0, w.addClass("disabled"))
                })
            })
        },
        D = function() {
            var e = i.getFilters();
            u = $(".filterList").find("ul").children("li"), u.each(function() {
                var t = $(this),
                    o = _.find(e, function(e) {
                        return e.value === t.text() || "size" === e.type && e.value === t.attr("data-size")
                    });
                void 0 !== o && t.addClass("selected")
            }), U()
        },
        P = function() {
            s.setLabel(C, "CLOSE");
            var e = l.find("button");
            e.each(function() {
                var e = $(this),
                    t = e.html();
                s.setHTML(e, t)
            })
        },
        M = function() {
            y()
        };
    e.$on("$destroy", function() {
        M()
    }), e.$watch(e.genders, function() {
        i.genders = e.genders
    }), e.$watch(e.types, function() {
        i.productTypes = e.types
    }), e.$watch(e.colours, function() {
        i.colours = e.colours
    }), e.$watch(e.styles, function() {
        i.styles = e.styles
    })
}]), app.controller("FooterController", ["$scope", "$controller", "jkBroadcastService", "IntroStateService", "EventNames", "ViewTypes", "LocalStorageKeys", "ResizeService", "HoverService", "CollectionStateService", function(e, t, o, n, i, a, r, s, c, l) {
    t("AbstractController", {
        $scope: e
    });
    var d, u, f, v, p;
    e.init = function() {
        g(), e.view = $("#collection-footer"), d = e.view.find(".items"), u = e.view.find(".items.row1"), f = e.view.find(".items.row2"), v = e.view.find(".items.row4"), p = e.view.find("#filterBtn"), c.setHTML(u, u.html()), c.setHTML(f, f.html()), c.setHTML(v, v.html()), c.setHTML(p, p.html()), C(), n.skipIntro && h(), e.abstractInit()
    };
    var m = function() {
            var e = new TimelineLite;
            e.delay(2.5), e.add(h), e.play()
        },
        h = function() {
            e.view.removeClass("ng-hide")
        },
        S = function() {
            e.view.addClass("ng-hide")
        },
        g = function() {
            o.addListener(i.SHOW_INTRO, e, S), o.addListener(i.HIDE_INTRO, e, m), o.addListener(i.CHANGE_CATALOG_VIEW, e, T), $(window).on("resize", I)
        },
        C = function() {
            switch (l.currentState) {
                case a.SMALL_THUMBNAILS:
                    E(v);
                    break;
                case a.THUMBNAILS:
                    E(f);
                    break;
                case a.ROWS:
                    E(u)
            }
        },
        w = function(t, n) {
            l.currentState !== n && (E(t), l.currentState = n, e.setStorageItem(r.CATALOG_STATE, n), o.broadcast(i.CHANGE_CATALOG_VIEW, [n]))
        },
        T = function(e) {
            switch (l.currentState = parseInt(e), l.currentState) {
                case a.ROWS:
                    E(u);
                    break;
                case a.SMALL_THUMBNAILS:
                    E(v);
                    break;
                default:
                case a.THUMBNAILS:
                    l.currentState = a.THUMBNAILS, E(f)
            }
            I()
        },
        E = function(e) {
            d.removeClass("active"), e.addClass("active")
        },
        I = function() {
            l.currentState === a.SMALL_THUMBNAILS && E(s.isSmall() ? f : v)
        };
    e.showFilter = function() {
        o.broadcast(i.SHOW_FILTER)
    }, e.catalogAsRows = function() {
        w(u, a.ROWS)
    }, e.catalogAsThumbs = function() {
        w(f, a.THUMBNAILS)
    }, e.catalogAsSmallThumbs = function() {
        w(v, a.SMALL_THUMBNAILS)
    }
}]), app.controller("IntroController", ["$scope", "$controller", "jkBroadcastService", "jkDetectionService", "IntroStateService", "EventNames", "ScrollDirections", "ScrollService", "ResizeService", "$state", "States", "_", function(e, t, o, n, i, a, r, s, c, l, d, u) {
    t("AbstractController", {
        $scope: e
    });
    var f, v, p, m, h, S = 0,
        g = 0;
    e.init = function() {
        if (H(), e.view = $("#intro"), f = e.view.find("header"), v = e.view.find("h1"), p = e.view.find("figure"), U(), i.skipIntro) O(), D(), k();
        else {
            var t = p.attr("data-large");
            c.isSmall() ? t = p.attr("data-small") : c.isMedium() && (t = p.attr("data-medium"));
            var r = $("<img/>", {
                src: t
            });
            r.on("load", function() {
                n.touch || (p.css({
                    opacity: 0
                }), TweenLite.to(p, 1, {
                    opacity: 1,
                    delay: .5,
                    ease: Quad.easeInOut
                })), D(), u.delay(P, 0), u.delay(C, 1e3), n.touch && u.delay(function() {
                    o.broadcast(a.HIDE_INTRO)
                }, 2500)
            })
        }
        e.abstractInit()
    };
    var C = function() {
            e.log("IntroController: introReady()", ""), i.isAnimating = !1, i.isRevealed = !0, i.isReady = !0, i.routeChanged = !1, k(), n.touch ? e.view.swipe({
                swipe: function(e, t) {
                    t === r.UP && o.broadcast(a.HIDE_INTRO)
                },
                allowPageScroll: "none"
            }) : (R(), o.broadcast(a.HIDE_LOGO), e.log(e.view), e.view.on("click", function() {
                o.broadcast(a.HIDE_INTRO)
            }), w())
        },
        w = function() {
            e.view.find(".cursor").remove(), m = $("<div/>", {
                "class": "cursor transparent"
            }).appendTo(e.view), n.touch || $(document).on("mousemove", I), T()
        },
        T = function() {
            m.css({
                top: g,
                left: S
            }), u.delay(function() {
                m.removeClass("transparent")
            }, 10)
        },
        E = function() {
            e.view.off("mousemove", I), void 0 !== m && (m.remove(), S = 0, g = 0)
        },
        I = function(e) {
            e && (S = e.pageX, g = e.pageY, TweenLite.to(m, .05, {
                top: g,
                left: S
            }))
        },
        _ = function() {
            N(), e.view.removeClass("ready"), D(), P(), i.isAnimating = !0, i.triggeredToShow = 0;
            var t = window.innerHeight ? window.innerHeight : $(window).height();
            TweenLite.to(e.view, .2, {
                autoAlpha: 1
            }), TweenLite.fromTo(e.view, 1.2, {
                y: 51 - t,
                delay: .2
            }, {
                y: 0,
                ease: Quart.easeInOut,
                onComplete: b
            }), TweenLite.to(p, 1, {
                opacity: 1,
                delay: .6,
                ease: Quad.easeOut
            })
        },
        L = function() {
            n.touch ? e.view.swipe("disable") : E(), N(), i.isAnimating = !0, M();
            var t = window.innerHeight ? window.innerHeight : $(window).height();
            TweenLite.to(e.view, 1.2, {
                y: 51 - t,
                ease: Quart.easeInOut,
                onComplete: function() {
                    y(), TweenLite.to(e.view, .5, {
                        autoAlpha: 0
                    })
                }
            }), TweenLite.to(p, .4, {
                opacity: 0,
                ease: Quad.easeOut
            })
        },
        O = function() {
            N(), M(), TweenLite.set(e.view, {
                y: 51 - $(window).height(),
                ease: Quart.easeInOut,
                onComplete: function() {
                    y(), TweenLite.set(e.view, {
                        visibility: "hidden",
                        opacity: 0
                    })
                }
            }), TweenLite.set(p, {
                opacity: 0,
                ease: Quart.easeInOut
            })
        },
        b = function() {
            i.isAnimating = !1, i.isRevealed = !0, R(), n.touch ? e.view.swipe({
                swipe: function(e, t) {
                    t === r.UP && o.broadcast(a.HIDE_INTRO)
                },
                allowPageScroll: "none"
            }) : w(!0)
        },
        y = function() {
            i.isAnimating = !1, i.isRevealed = !1, R(), s.enableScroll(), G()
        },
        k = function() {
            o.addListener(a.SHOW_INTRO, e, _), o.addListener(a.HIDE_INTRO, e, L), o.addListener(a.SHOW_FILTER, e, H), o.addListener(a.HIDE_FILTER, e, x), o.addListener(a.SHOW_MENU, e, H), o.addListener(a.HIDE_MENU, e, x), o.addListener(a.SHOW_CART, e, H), o.addListener(a.HIDE_CART, e, x)
        },
        R = function() {
            x(), $("html, body").on("scroll", B), $("body").mousewheel(B)
        },
        N = function() {
            $("html, body").off("scroll", B), $("body").unmousewheel(B), H()
        },
        A = function() {
            N(), $(window).off("resize", h)
        },
        U = function() {
            h = u.debounce(F, 250), $(window).on("resize", h), F()
        },
        D = function() {
            p.addClass("show"), e.view.addClass("white"), f.addClass("dissapear")
        },
        P = function() {
            v.addClass("show").removeClass("out")
        },
        M = function() {
            v.addClass("show out")
        },
        x = function() {
            s.enableScroll(), i.blockIntro = !1
        },
        H = function() {
            s.disableScroll(), i.blockIntro = !0
        },
        G = function() {
            i.routeChanged || (i.routeChanged = !0, i.skipIntro = !0)
        },
        B = function(t) {
            if (i.isAnimating || i.blockIntro) return t.preventDefault(), !1;
            var n = t.deltaY;
            s.scrollDirection = 0 > n ? r.DOWN : r.UP;
            var c = $(window).scrollTop() + e.view.offset().top;
            s.scrollDirection === r.DOWN && i.isRevealed && o.broadcast(a.HIDE_INTRO), s.scrollDirection === r.UP && (i.isRevealed || 0 >= c && (i.triggeredToShow >= i.valueToShow && o.broadcast(a.SHOW_INTRO), i.addTriggerToShow()))
        },
        F = function() {
            c.isSmall() ? p.css({
                "background-image": "url('" + p.attr("data-small") + "')"
            }) : c.isMedium() ? p.css({
                "background-image": "url('" + p.attr("data-medium") + "')"
            }) : c.isLarge() && p.css({
                "background-image": "url('" + p.attr("data-large") + "')"
            })
        };
    e.$on("$destroy", function() {
        A(), e.view.swipe("destroy"), $(document).off()
    })
}]), app.controller("LegalFooterController", ["$scope", "$controller", "jkURLService", "UrlNames", "jkURLTargets", "jkBroadcastService", "EventNames", "FilterService", "$timeout", "HoverService", function(e, t, o, n, i, a, r, s, c, l) {
    t("AbstractController", {
        $scope: e
    }), e.init = function() {
        e.view = $("#legalfooter"), e.view.find("button").each(function() {
            l.setHTML($(this), $(this).html())
        })
    }, e.handleFooterVisibility = function() {
        var e = s.hasFilters();
        e ? $("#legalfooter").removeClass("introduce") : c(function() {
            $("#legalfooter").addClass("introduce")
        }, 1e3)
    }, a.addListener(r.FILTER_COMPLETE, e, e.handleFooterVisibility), e.goSocial = function(e) {
        switch (e) {
            case n.FACEBOOK:
            case n.INSTAGRAM:
            case n.TWITTER:
                o.openUrlByName(e, i._BLANK)
        }
    }
}]), app.controller("AboutPageController", ["$scope", "$rootScope", "$timeout", "$controller", "MenuLabels", "ScrollMagic", "jkDetectionService", "jkBroadcastService", "EventNames", "States", "_", function(e, t, o, n, i, a, r, s, c, l, d) {
    n("AbstractPageController", {
        $scope: e,
        $controller: n
    }), e.pageclass = "";
    var u = [],
        f = r.touch,
        v = r.ios8,
        p = r.ipad;
    e.init = function() {
        s.addListener(c.MENU_NAV_TRANSITION, e, m), o(function() {
            S()
        }, 300), e.menuLabel = i.ABOUT, e.abstractPageInit()
    };
    var m = function() {
            t.$state.current.name === l.ABOUT && ($("#about-page").removeClass("ready"), d.delay(function() {
                h()
            }, 500))
        },
        h = function() {
            $(".about-template").removeClass("introduce"), $(".view").removeClass("about")
        },
        S = function() {
            $(".view").addClass("about"), o(function() {
                (v && p || !f) && $(".about-template").each(function() {
                    var e = $(this),
                        t = e.find(".scroll-item"),
                        o = new a.ScrollMagic,
                        n = 1e3 * parseFloat(e.attr("data-scrollduration")),
                        i = [];
                    i.push(e), t.length > 0 && i.push(t), d.each(i, function(e) {
                        var t = $(e),
                            i = null;
                        if (t.attr("data-start-params")) {
                            var r = JSON.parse(t.attr("data-start-params"));
                            t.css(r)
                        }
                        if ("true" === t.attr("data-tween")) {
                            var s = JSON.parse(t.attr("data-tween-params")),
                                c = parseFloat(t.attr("data-tween-duration"));
                            i = TweenLite.to(t, c, s)
                        }
                        var l = new a.ScrollScene({
                            triggerElement: t,
                            duration: n
                        }).addTo(o);
                        null !== i && l.setTween(i), u.push(o)
                    })
                }), $(window).on("scroll", w), $(window).on("resize", w), C(), d.delay(g, 200)
            }, 200)
        },
        g = function() {
            $(window).scrollTop(0), $("#about-page").addClass("ready"), $(".about-template").addClass("introduce")
        },
        C = function() {
            var e = 0,
                t = $(window).height(),
                o = 700,
                n = t,
                i = 52;
            o > t && (n = o);
            var a = $("#aboutintro");
            500 > t && (a.css({
                height: "500px"
            }), a.addClass("small")), $(".about-template").each(function() {
                var o = $(this);
                e > 0 && (i += 1 === e && a.height() <= 500 ? 500 : e > 1 && 700 > t ? 700 : n), o.css({
                    top: i.toString() + "px"
                }), e++
            }), 500 > n && $("#aboutintro").css({
                height: "500px"
            })
        },
        w = d.throttle(C, 500);
    e.$on("$destroy", function() {
        $(".view").removeClass("about introduce"), $(window).off("scroll", w), $(window).off("resize", w), d.each(u, function(e) {
            e.destroy(!0)
        })
    })
}]), etqGlobal.controller("AsidePageController", ["$scope", "$controller", "jkDetectionService", "ScrollService", "ResizeService", function(e, t, o, n, i) {
    t("AbstractPageController", {
        $scope: e,
        $controller: t
    }), e.asidePageInit = function() {
        $("html").addClass("aside"), e.view = $(".aside-page-main").first(), e.abstractPageInit(), (o.ipad || i.isMedium() && o.touch) && (n.disableScroll(), $(document).on("touchmove", ".scroll-container li", function(e) {
            e.stopPropagation()
        }), $("html, body").off("scroll"), $(window).off("mousewheel"), $(window).off("DOMMouseScroll"))
    }
}]), app.controller("CollectionPageController", ["$scope", "$rootScope", "$controller", "$state", "States", "productData", "skipIntro", "IntroStateService", "MenuLabels", "ProductsService", "EventNames", "ScrollService", "jkBroadcastService", function(e, t, o, n, i, a, r, s, c, l, d, u, f) {
    o("AbstractPageController", {
        $scope: e,
        $controller: o
    }), e.init = function() {
        e.view = $("#home"), e.menuLabel = c.COLLECTION, e.abstractPageInit(), f.addListener(d.PAGE_READY, e, p), r ? (u.enableScroll(), s.skipIntro = !0, e.pageclass = "collection transition-in", _.delay(h, 1500)) : (_.delay(u.disableScroll, 200), $("html").addClass("intro"), e.pageclass = "intro transition-in"), v()
    };
    var v = function() {
            f.addListener(d.SHOW_INTRO, e, m), f.addListener(d.HIDE_INTRO, e, h)
        },
        p = function() {
            f.broadcast(d.PRODUCTS_READY, [a])
        },
        m = function() {
            t.$state.current.name === i.COLLECTION && (n.go(i.INTRO, {}, {
                reload: !0,
                notify: !1
            }), S("intro", "collection", !0))
        },
        h = function() {
            t.$state.current.name === i.INTRO && (n.go(i.COLLECTION, {}, {
                reload: !0,
                notify: !1
            }), S("collection", "intro", !1))
        },
        S = function(e, t, o) {
            o ? $("html").addClass("intro") : $("html").removeClass("intro");
            var n = $(".view");
            n.removeClass("transition-in"), n.removeClass(t), n.addClass(e)
        }
}]), app.controller("ErrorPageController", ["$scope", "$controller", function(e, t) {
    t("AbstractPageController", {
        $scope: e,
        $controller: t
    }), e.pageclass = "error", e.abstractPageInit()
}]), app.controller("LookbookPageController", ["$scope", "$rootScope", "$timeout", "$state", "States", "$controller", "MenuLabels", "HoverService", "ScrollService", "jkDetectionService", "jkBroadcastService", "EventNames", function(e, t, o, n, i, a, r, s, c, l, d, u) {
    a("AbstractPageController", {
        $scope: e,
        $controller: a
    });
    var f, v, p, m;
    e.imageIndex = 0, e.images = [], e.pageclass = "lookbook", e.menuLabel = r.LOOKBOOK;
    var h = 0;
    e.init = function() {
        e.view = $("#lookbook"), e.menuLabel = r.LOOKBOOK, e.abstractPageInit();
        var t = screen.availWidth,
            n = screen.availHeight,
            i = t > n ? t : n;
        $(".lookbook-image").each(function() {
            var e = $(this),
                t = e.find("img"),
                o = t.attr("data-large");
            1200 > i && (o = t.attr("data-medium"), 700 > i && (o = t.attr("data-small"))), t.attr("src", o), e.css({
                "background-image": "url(" + o + ")"
            }), t.on("load", function() {
                e.addClass("introduce")
            })
        }), o(function() {
            g()
        }, 100)
    }, e.initFooter = function() {
        m = $("#lookbook-footer"), f = m.find(".items.prev"), v = m.find(".items.next"), p = m.find("#viewBtn"), s.setHTML(f, f.html()), s.setHTML(v, v.html()), s.setHTML(p, "View")
    }, e.clickPrev = function() {
        if (f.hasClass("disabled")) return !1;
        var t = e.imageIndex - 1;
        v.removeClass("disabled"), 0 >= t ? (f.addClass("disabled"), e.imageIndex = 0) : e.imageIndex = t, T(t)
    }, e.clickNext = function() {
        if (v.hasClass("disabled")) return !1;
        var t = e.imageIndex + 1;
        f.removeClass("disabled"), t >= e.images.length - 1 ? (v.addClass("disabled"), e.imageIndex = e.images.length - 1) : e.imageIndex = t, T(t)
    }, e.viewProduct = function() {
        var t = $(e.images[e.imageIndex]).attr("data-url");
        S(), o(function() {
            n.transitionTo(i.PRODUCT, {
                id: t
            })
        }, 600)
    };
    var S = function() {
            t.$state.current.name === i.LOOKBOOK && (m.addClass("slidedown"), $(".lookbook-image").removeClass("ready"))
        },
        g = function() {
            var t = 0;
            d.addListener(u.MENU_NAV_TRANSITION, e, S), $(window).on("scroll", w), e.images = [], $(".lookbook-image").each(function() {
                var o = $(this);
                e.images.push(o), h = t, $(window).scrollTop(0), o.on("click", function() {
                    e.viewProduct(t)
                }), t++
            }), m.removeClass("slidedown")
        },
        C = function() {
            _.each(e.images, function(t, o) {
                var n = $(t),
                    i = n.height(),
                    a = n.position().top,
                    r = $(window).scrollTop();
                l.touch || (r + i >= a ? n.removeClass("scroll-item") : a + i >= r && n.addClass("scroll-item")), r >= a && (e.imageIndex = o), 0 >= r ? f.addClass("disabled") : f.removeClass("disabled"), e.imageIndex === h ? v.addClass("disabled") : v.removeClass("disabled")
            })
        },
        w = function() {
            C()
        },
        T = function(t) {
            if (0 > t && (t = 0), e.images.length > 0) {
                var o = t * $(window).height();
                TweenLite.to($(window), 1, {
                    scrollTo: o,
                    ease: Quart.easeOut,
                    onComplete: function() {
                        $("html, body").scrollTop(o), $(window).scrollTop(o)
                    }
                })
            } else g(), _.delay(T, 100, t)
        };
    e.$on("$destroy", function() {
        $(window).off("scroll", w)
    })
}]), app.controller("ServiceDeskPageController", ["$scope", "$controller", "MenuLabels", function(e, t, o) {
    t("AsidePageController", {
        $scope: e,
        $controller: t
    }), e.init = function() {
        e.menuLabel = o.SERVICE_DESK, e.asidePageInit()
    }
}]), app.controller("SingleProductPageController", ["$scope", "$rootScope", "$controller", "$location", "$timeout", "jkURLService", "jkBroadcastService", "EventNames", "ScrollService", "MenuLabels", "ProductsService", "SingleProductService", "ResizeService", "jkDetectionService", "ScrollDirections", "CollectionStateService", "$state", "States", function(e, t, o, n, i, a, r, s, c, l, d, u, f, v, p, m, h, S) {
    o("AbstractPageController", {
        $scope: e,
        $controller: o
    }), e.product = null, e.pageclass = "detail", e.images = [], e.imgDOMs = [], e.isReady = !1, e.imageIndex = 0, e.isZoomed = !1, e.lastImage = null, e.imageContainer = null, e.lastProductImage = null, e.cursor = null, e.productContainer = null, e.hasFitImage = !1, e.menuLabel = l.COLLECTION;
    var g = 0;
    e.init = function() {
        e.menuLabel = l.COLLECTION, e.view = $(".product-page").first(), m.transitionOutReady = !1, at(), g = 0, r.addListener(s.PRODUCT_READY, e, E), C()
    };
    var C = function() {
            if (a.isLoaded()) {
                var e = d.loadSingleProduct(n.path());
                e.then(function(e) {
                    T(e)
                })
            } else i(function() {
                C()
            }, 10)
        },
        w = function() {
            r.addListener(s.SINGLE_PRODUCT_ZOOM, e, ot), r.addListener(s.SINGLE_PRODUCT_UNZOOM, e, nt), r.addListener(s.BACK_TO_CATALOG, e, F), r.addListener(s.SINGLE_PRODUCT_PREV, e, G), r.addListener(s.SINGLE_PRODUCT_NEXT, e, B), r.addListener(s.UPSELL_CHANGE, e, it), r.addListener(s.MENU_NAV_TRANSITION, e, it)
        },
        T = function(t) {
            return null === t ? void(g > 5 ? h.go(S.ERROR) : i(function() {
                C(), g++
            }, 10)) : (g = 0, w(), e.abstractPageInit(), e.product = t[0], r.broadcast(s.PRODUCT_READY, [t[0]]), void(u.product = t[0]))
        },
        E = function() {
            e.imageContainer = $(".image-container").last(), e.productContainer = $(".product-container").last(), I(), x()
        },
        I = function() {
            e.imageContainer.children().remove();
            var t = O();
            e.cursor = $("<div/>", {
                "class": "cursor fixed"
            }).appendTo("body"), e.images = [], e.imgDOMs = [];
            var o = e.product.product_image,
                n = e.product.detail_images;
            e.images.push(o), _.each(n, function(t) {
                e.images.push(t.src)
            }), _.each(e.images, function(o, n) {
                var i = $("<figure/>");
                i.css({
                    "background-image": "url(" + o + ")"
                });
                var a = $("<img/>", {
                    src: o,
                    width: "1000",
                    height: "1000"
                }).appendTo(i);
                a.on("load", function() {
                    i.addClass("ready")
                }), y(i), 0 === n && i.addClass("current"), e.imgDOMs.push(i), i.appendTo(e.imageContainer), k(t, n), e.lastImage = i
            }), t.appendTo(e.imageContainer), e.lastProductImage = e.lastImage, L()
        },
        L = function() {
            var t = $("#fitImages"),
                o = e.product.fit_image;
            0 === o.length ? (t.remove(), e.hasFitImage = !1) : (_.each(o, function(o) {
                var n = $("<figure/>", {
                    "class": "fitImage"
                }).appendTo(t);
                n.css({
                    "background-image": "url(" + o.src + ")"
                }), e.images.push(o), e.lastImage = n, e.hasFitImage = !0;
                var i = $("<img/>", {
                    src: o.src,
                    width: "1000",
                    height: "1000"
                }).appendTo(n);
                i.on("load", function() {
                    n.addClass("ready")
                })
            }), e.imgDOMs.push(t)), _.delay(q, 50), _.delay(b, 500), e.isReady = !0
        },
        O = function() {
            return $("<ul/>", {
                "class": "images-dot-nav"
            })
        },
        b = function() {
            e.imageContainer.addClass("show"), Z()
        },
        y = function(t) {
            var o = $("html"),
                n = o.hasClass("android safari");
            if (!n) {
                var i = $("<div/>", {
                    "class": "hover"
                }).appendTo(t);
                i.on("mouseenter", function() {
                    e.cursor && e.cursor.addClass("show"), i.on("mousemove", U)
                }).on("mouseleave", function() {
                    e.cursor && i.off("mousemove", U), e.cursor.removeClass("show")
                })
            }
        },
        k = function(t, o) {
            var n = $("<li/>", {
                "class": "images-dot",
                text: o,
                "data-index": o
            }).appendTo(t);
            0 === o && n.addClass("active"), n.on("click", function() {
                e.imageIndex = parseInt(n.attr("data-index")), $("li.images-dot").removeClass("active"), n.addClass("active"), R()
            })
        },
        R = function() {
            var t = $("html"),
                o = t.hasClass("android safari");
            _.each(e.imgDOMs, function(t, n) {
                var i = "0",
                    a = $(t);
                a.addClass("current"), a.addClass("animate"), n < e.imageIndex && (i = o ? -$(window).width() : "-100vw", a.removeClass("current")), n > e.imageIndex && (i = o ? $(window).width() : "100vw", a.removeClass("current")), a.css({
                    left: i
                })
            });
            var n = 0;
            $(".images-dot").each(function() {
                var t = $(this);
                t.removeClass("active"), n === e.imageIndex && t.addClass("active"), n++
            })
        },
        N = function() {
            if (f.isiPadLandscapeDown()) {
                var t = e.imageIndex,
                    o = e.images.length,
                    n = $(".images-dot"),
                    i = 0,
                    a = !1;
                n.each(function() {
                    if (!a) {
                        var e = $(this);
                        e.hasClass("active") && (t = i, a = !0), i++
                    }
                }), t >= 0 && o - 1 > t && (e.imageIndex = t + 1, R())
            }
        },
        A = function() {
            if (f.isiPadLandscapeDown()) {
                var t = e.imageIndex,
                    o = e.images.length,
                    n = $(".images-dot"),
                    i = 0,
                    a = !1;
                n.each(function() {
                    if (!a) {
                        var e = $(this);
                        e.hasClass("active") && (t = i, a = !0), i++
                    }
                }), o - 1 >= t && t > 0 && (e.imageIndex = t - 1, R())
            }
        },
        U = function(t) {
            var o = t.clientX,
                n = t.clientY;
            null !== e.cursor && e.cursor.css({
                top: n,
                left: o
            })
        },
        D = function(t) {
            e.imageIndex = t, Y()
        },
        P = function(t) {
            e.pageclass = "detail";
            var o = $(e.imgDOMs[t]),
                n = o.height(),
                i = .5 * (n - $(window).height()),
                a = t * n + i;
            o.hasClass("fitImage") && (a = o.offset().top), TweenLite.to(window, .8, {
                scrollTo: {
                    x: 0,
                    y: Math.max(a, 0)
                },
                ease: Quart.easeOut,
                onUpdate: Y,
                onComplete: D,
                onCompleteParams: [t]
            })
        },
        M = function(e) {
            var t = $(".view").height() - $(window).height();
            TweenLite.to(window, .8, {
                scrollTo: {
                    x: 0,
                    y: t
                },
                ease: Quart.easeOut,
                onUpdate: Y,
                onComplete: D,
                onCompleteParams: [e]
            })
        },
        x = function() {
            c.enableScroll(), $(window).on("scroll", Y), $(window).on("scroll", X), $(window).on("resize", et), v.touch && ($("html").hasClass("android safari") || f.isiPadLandscapeDown()) && e.imageContainer.swipe({
                swipe: function(e, t) {
                    t === p.LEFT && N(), t === p.RIGHT && A()
                },
                allowPageScroll: "auto",
                threshold: 25
            }), _.delay(J, 50)
        },
        H = function() {
            c.disableScroll(), $(window).off("scroll", Y), $(window).off("scroll", X), $(window).off("resize", et), v.touch && ($("html").hasClass("android safari") || f.isiPadLandscapeDown()) && e.imageContainer.swipe("disable")
        },
        G = function() {
            var t = e.imageIndex - 1;
            Q(), Y(), t >= 0 ? (e.imageIndex = t, P(t)) : (e.imageIndex = 0, P(0), K())
        },
        B = function() {
            var t = e.imageIndex + 1;
            V(), Y(), t < e.images.length ? (e.imageIndex = t, P(t)) : (M(t), W())
        },
        F = function() {
            at(), e.imageContainer.removeClass("show"), m.transitionOutReady = !0, i(function() {
                h.transitionTo(S.COLLECTION)
            }, 700)
        },
        j = function() {
            r.broadcast(s.SINGLE_HIDE_ZOOM)
        },
        z = function() {
            r.broadcast(s.SINGLE_SHOW_ZOOM)
        },
        K = function() {
            r.broadcast(s.SINGLE_DISABLE_UP)
        },
        V = function() {
            r.broadcast(s.SINGLE_ENABLE_UP)
        },
        W = function() {
            r.broadcast(s.SINGLE_DISABLE_DOWN)
        },
        Q = function() {
            r.broadcast(s.SINGLE_ENABLE_DOWN)
        },
        q = function() {
            if (f.isiPadLandscapeUp()) {
                var t = .5 * +$(window).height(),
                    o = $(window).scrollTop();
                _.each(e.imgDOMs, function(n, i) {
                    var a = $(n).height(),
                        r = 0;
                    return void 0 !== $(n).offset() && (r = $(n).offset().top), o + t > r && r + a > o + t ? void(e.imageIndex = i) : void 0
                })
            }
        },
        Y = function() {
            tt(), r.broadcast(s.SINGLE_SCROLL);
            var t = $(window).scrollTop(),
                o = $(window).height(),
                n = $(".view").height(),
                i = e.productContainer.height();
            if (null !== e.lastImage && (t >= i - o ? (r.broadcast(s.SINGLE_HIDE_FOOTER_NAV), e.hasFitImage || j()) : (r.broadcast(s.SINGLE_SHOW_FOOTER_NAV), e.hasFitImage || z()), e.hasFitImage)) {
                var a = $("#fitImages").offset().top;
                t >= a - o ? j() : z()
            }
            t >= 200 ? V() : K(), t + o >= n - .75 * o ? (e.imageIndex = e.images.length, W()) : Q()
        },
        Z = function() {
            var t = $(window).scrollTop(),
                o = t + .7 * $(window).height(),
                n = e.imgDOMs.length,
                i = 0;
            for (i; n > i; i++) {
                var a = $(e.imgDOMs[i]);
                if (!(a.offset().top < o)) break;
                a.addClass("onscreen")
            }
            for (i; n > i; i++) $(e.imgDOMs[i]).removeClass("onscreen");
            return !0
        },
        J = function() {
            var t = Math.ceil($(e.imgDOMs[0]).height());
            e.imageContainer.css({
                height: t
            }), Y(), f.isiPadLandscapeUp() && (v.ios7 || v.android || _.each(e.imgDOMs, function(t, o) {
                var n = $(t);
                n.off("click"), n.on("click", function() {
                    u.blockZoom || (u.blockZoom = !0, i(function() {
                        u.blockZoom = !1
                    }, 700), e.isZoomed ? r.broadcast(s.SINGLE_PRODUCT_UNZOOM) : (e.imageIndex = o, r.broadcast(s.SINGLE_PRODUCT_ZOOM)))
                })
            }))
        },
        X = _.throttle(Z, 20),
        et = _.throttle(J, 100),
        tt = _.throttle(q, 100),
        ot = function() {
            e.cursor.addClass("zoomed"), $(e.imgDOMs).addClass("zoom");
            var t = e.imageIndex,
                o = $(window).height(),
                n = $(e.imgDOMs[0]).height(),
                i = 48;
            f.isXLarge() && (i = 50);
            var a = n * (80 / i),
                r = t * a + .5 * (a - o),
                s = .6,
                c = Cubic.easeOut;
            TweenLite.to(window, s, {
                scrollTo: {
                    x: 0,
                    y: r
                },
                ease: c
            }), f.isLaptop() && $(e.imgDOMs).each(function() {
                $(this).css({
                    "z-index": 4
                })
            }), TweenLite.to($(e.imgDOMs), s, {
                width: "100vw",
                height: "80vw",
                ease: c
            }), TweenLite.to(e.imageContainer, s, {
                marginTop: 0,
                marginLeft: 0,
                ease: c
            }), e.isZoomed = !0
        },
        nt = function() {
            e.cursor.removeClass("zoomed"), $(e.imgDOMs).removeClass("zoom");
            var t = e.imageIndex,
                o = $(window).height(),
                n = $(e.imgDOMs[0]).height(),
                i = "",
                a = "48vw",
                r = "10vh",
                s = "1vw",
                c = 48;
            f.isXLarge() ? (i = "70vw", a = "50vw", r = "9vh", s = "4vw", c = 50) : f.isLarge() ? (i = "60vw", r = "10vh", s = "1vw", f.isLaptop() && (s = "2vw", i = "66vw")) : (i = "60vw", r = "16vh", s = "2vw");
            var l = n * (c / 80),
                d = t * l + .5 * (l - o),
                u = .6,
                v = Cubic.easeOut;
            TweenLite.to(window, u, {
                scrollTo: {
                    x: 0,
                    y: Math.max(d, 0)
                },
                ease: v
            }), TweenLite.to($(e.imgDOMs), u, {
                width: i,
                height: a,
                ease: v,
                clearProps: "width, height, z-index"
            }), TweenLite.to(e.imageContainer, u, {
                marginTop: r,
                marginLeft: s,
                ease: v,
                clearProps: "margin-top, margin-left"
            }), e.isZoomed = !1
        },
        it = function() {
            t.$state.current.name === S.PRODUCT && e.imageContainer.removeClass("show")
        },
        at = function() {
            $(".cursor").remove()
        };
    e.$watch("isZoomed", function() {
        u.isZoomed = e.isZoomed
    }), e.$watch("imageIndex", function() {
        u.imageIndex = e.imageIndex
    }), e.$watch("product", function() {
        u.product = e.product
    }), e.$watch("imageContainer", function() {
        e.log("imageContainer added")
    }), e.$on("$destroy", function() {
        H(), e.imageContainer.swipe("destroy"), e.product = {}, e.pageclass = "detail", e.images = [], e.imgDOMs = [], e.isReady = !1, e.imageIndex = 0, e.isZoomed = !1, e.lastImage = null, e.imageContainer = null, e.lastProductImage = null, e.cursor = null, e.productContainer = null, e.hasFitImage = !1
    })
}]), app.controller("StockistsPageController", ["$scope", "$controller", "MenuLabels", function(e, t, o) {
    t("AsidePageController", {
        $scope: e,
        $controller: t
    }), e.init = function() {
        e.menuLabel = o.STOCKISTS, e.asidePageInit()
    }
}]), app.controller("ServiceDeskAsideController", ["$scope", "$rootScope", "$timeout", "$controller", "$location", "$state", "States", "ResizeService", "EventNames", "jkBroadcastService", function(e, t, o, n, i, a, r, s, c, l) {
    n("AsideListController", {
        $scope: e,
        $controller: n
    });
    var d;
    e.init = function() {
        e.view = $(".page-aside");
        var n = t.$state;
        if (l.addListener(c.MENU_NAV_TRANSITION, e, f), n.current.name === r.SERVICEDESK_QUESTIONS) {
            var i = $('.content[data-qid="' + n.params.qid + '"]'),
                v = i.find("h1");
            v.on("click", function() {
                a.go(r.SERVICEDESK_SUBJECTS, {
                    id: t.$stateParams.id
                })
            }), $("#service-desk-detail").removeClass("ng-hide"), s.isSmall() && o(function() {
                $("#service-desk-detail").height(i.height()), $("#servicedesk").height(i.height())
            }, 400)
        } else $("#service-desk-detail").addClass("ng-hide");
        o(function() {
            $("#service-desk-detail").addClass("animate")
        }, 500), d = t.$on("$stateChangeSuccess", u), e.abstractListInit()
    };
    var u = function(e, n, i) {
            if (n.name === r.SERVICEDESK_QUESTIONS) {
                $(".content").find("h1").off();
                var d = $('.content[data-qid="' + i.qid + '"]'),
                    u = d.find("h1");
                l.broadcast(c.ASIDE_UPDATE_HEIGHT), u.on("click", function() {
                    a.go(r.SERVICEDESK_SUBJECTS, {
                        id: t.$stateParams.id
                    })
                }), $("#service-desk-detail").removeClass("ng-hide"), s.isSmall() && o(function() {
                    $("#service-desk-detail").height(d.height()), $("#servicedesk").height(d.height())
                }, 400)
            } else $("#service-desk-detail").addClass("ng-hide")
        },
        f = function() {
            var o = t.$state.current.name,
                n = r.SERVICEDESK_LIST,
                i = r.SERVICEDESK_SUBJECTS,
                a = r.SERVICEDESK_QUESTIONS;
            (o === n || o === i || o === a) && e.view.removeClass("show")
        };
    e.$on("$destroy", function() {
        d()
    })
}]), app.controller("ServiceDeskGalleryController", ["$scope", "$controller", "jkDetectionService", "ResizeService", "jkBroadcastService", "EventNames", "States", "$rootScope", function(e, t, o, n, i, a, r, s) {
    t("AsideContentController", {
        $scope: e
    }), e.initGallery = function() {
        e.view = $(".asidepage-content"), e.initAbstractAsideContent(), i.addListener(a.MENU_NAV_TRANSITION, e, c), o.touch && n.isSmall() && e.view.remove()
    };
    var c = function() {
        var t = s.$state.current.name,
            o = r.SERVICEDESK_LIST,
            n = r.SERVICEDESK_SUBJECTS,
            i = r.SERVICEDESK_QUESTIONS;
        (t === o || t === n || t === i) && (e.view.removeClass("introduce"), e.view.css({
            left: 0
        }))
    }
}]), app.controller("AbstractInfoBoxController", ["$scope", "$controller", "$timeout", "jkURLService", "UrlNames", "jkURLTargets", "HoverService", "EventNames", "jkBroadcastService", function(e, t, o, n, i, a, r, s, c) {
    t("AbstractController", {
        $scope: e
    }), e.init = function() {
        c.addListener(s.PRODUCT_READY, e, l), c.addListener(s.BACK_TO_CATALOG, e, d), e.initInfoButtons(), e.abstractInit()
    }, e.initInfoButtons = function() {
        c.broadcast(s.PAGE_READY), e.showFit()
    }, e.showFit = function() {
        $("p.delivery").addClass("hide"), $("li.fit").find("button").addClass("active"), $("li.delivery").find("button").removeClass("active"), $("p.fit").removeClass("hide"), $("p.fit").off("click"), $("p.fit").on("click", function() {
            n.openUrlByName(i.SIZEGUIDE, a._BLANK)
        })
    }, e.showDelivery = function() {
        $("p.fit").addClass("hide"), $("li.fit").find("button").removeClass("active"), $("li.delivery").find("button").addClass("active"), $("p.delivery").removeClass("hide"), $("p.fit").off("click")
    };
    var l = function() {
            $(".info").addClass("ready"), o(function() {
                $(".info").addClass("show")
            }, 100)
        },
        d = function() {
            $(".info").removeClass("ready show")
        }
}]), app.controller("CurrencySwitchController", ["$scope", "$controller", "EventNames", "MenuStateService", "SingleProductService", "LocalStorageKeys", "Currencies", "ResizeService", "jkBroadcastService", "jkDetectionService", "CartService", function(e, t, o, n, i, a, r, s, c, l, d) {
    t("AbstractController", {
        $scope: e
    });
    var u, f;
    e.product = {}, e.init = function() {
        e.view = $(".currencyswitch"), u = $(".currency"), f = parseInt(e.view.css("right")), e.abstractInit(), v(), m(), $("<div/>", {
            "class": "hover"
        }).appendTo(e.view), l.touch || e.view.on("mouseenter", function() {
            e.view.addClass("open"), u.removeClass("hide")
        }).on("mouseleave", function() {
            e.view.removeClass("open"), u.each(function() {
                var e = $(this);
                e.hasClass("selected") || e.addClass("hide")
            })
        })
    }, e.toggleCurrencySwitch = function(t) {
        return e.view.toggleClass("open"), e.view.hasClass("open") ? u.removeClass("hide") : p(t), !1
    };
    var v = function(t) {
            e.product = t;
            var o = e.getStorageItem(a.SELECTED_CURRENCY),
                n = null == o ? r.EURO : o;
            p(n)
        },
        p = function(t) {
            u.addClass("hide").removeClass("selected"), $(".currency." + t).removeClass("hide").addClass("selected"), e.setStorageItem(a.SELECTED_CURRENCY, t), c.broadcast(o.CURRENCY_CHANGED, [t]), d.changeCurrency(t)
        },
        m = function() {
            c.addListener(o.PRODUCT_READY, e, h), c.addListener(o.SINGLE_SCROLL, e, S)
        },
        h = function() {
            e.view.removeClass("hide")
        },
        S = function() {
            s.isMediumUp() && ($(window).scrollTop() + $(window).height() >= $(".content").height() + 252 ? e.view.addClass("hide") : e.view.removeClass("hide"))
        },
        g = function() {
            i.selectedPrice = ""
        };
    e.$on("$destroy", function() {
        g()
    })
}]), app.controller("SideInfoBoxController", ["$scope", "$rootScope", "$timeout", "jkBroadcastService", "$controller", "EventNames", "jkDetectionService", "States", function(e, t, o, n, i, a, r, s) {
    i("AbstractInfoBoxController", {
        $scope: e,
        $controller: i
    }), e.initSide = function() {
        e.init(), e.view = $("aside.info").last(), r.touch && f(), c()
    };
    var c = function() {
            n.addListener(a.SINGLE_SCROLL, e, l), n.addListener(a.SINGLE_PRODUCT_ZOOM, e, d), n.addListener(a.SINGLE_PRODUCT_UNZOOM, e, u), n.addListener(a.MENU_NAV_TRANSITION, e, v), _.delay(l, 50)
        },
        l = function() {
            e.contentHeight = $(".content").height();
            var t = $(window).scrollTop(),
                o = $(window).height(),
                n = e.view.height();
            t + o / 2 >= e.contentHeight - n / 2 - 73 ? e.view.hasClass("fixed") && e.view.removeClass("fixed") : e.view.hasClass("fixed") || e.view.addClass("fixed")
        },
        d = function() {
            $("#info").addClass("slide-away")
        },
        u = function() {
            $("#info").removeClass("slide-away")
        },
        f = function() {
            var t = $(window).height(),
                o = e.view.height(),
                n = t / 2 - o / 2 - 120;
            72 >= n && (n = 72), e.view.css({
                top: n
            })
        },
        v = function() {
            t.$state.current.name === s.PRODUCT && e.view.removeClass("ready show")
        };
    e.$on("$destroy", function() {
        n.cleanScope(e)
    })
}]), app.controller("SingleProductFooterController", ["$scope", "$controller", "$rootScope", "$timeout", "IntroStateService", "EventNames", "MenuStateService", "SingleProductService", "Currencies", "LocalStorageKeys", "ScrollService", "jkBroadcastService", "CartService", "_", "HoverService", "jkDetectionService", "States", function(e, t, o, n, i, a, r, s, c, l, d, u, f, v, p, m, h) {
    t("AbstractController", {
        $scope: e
    });
    var S, g, C, w, T, E, I, _, L, O, b, y, k, R = -1,
        N = 0,
        A = !1;
    e.isReady = !1, e.price = 0;
    var U = o.$on("$stateChangeSuccess", function(t, o, n, i) {
        i.name === h.PRODUCT && ($(".cursor").remove(), nt(), e.view.removeClass("show"), U())
    });
    e.init = function() {
        e.view = $(".single-footer"), s.blockZoom = !1, A = !1, u.addListener(a.PRODUCT_READY, e, D), D(s.product), e.abstractInit()
    };
    var D = function(t) {
            if (null !== t && t !== {}) {
                if (A === !0) return void u.removeListener(a.PRODUCT_READY, e, D);
                A = !0, k = t, P(), M(), R = -1, e.isReady = !0, E = $(".product-sizes").last(), et(), rt(), F(), v.delay(B, 50), $(window).on("resize", G), H()
            }
        },
        P = function() {
            S = e.view.find(".items.back"), g = e.view.find(".items.zoom"), C = e.view.find(".items.prev"), w = e.view.find(".items.next"), T = e.view.find(".footerbuttons"), _ = T.find(".sizeBtn"), I = T.find(".addbtn"), p.setHTML(S, S.html()), p.setHTML(g, g.html()), p.setHTML(C, C.html()), p.setHTML(w, w.html()), p.setHTML(_, "Size"), I.attr("disabled", !0)
        },
        M = function() {
            u.addListener(a.CURRENCY_CHANGED, e, rt), u.addListener(a.SHOW_MENU, e, it), u.addListener(a.HIDE_MENU, e, nt), u.addListener(a.SHOW_CART, e, at), u.addListener(a.HIDE_CART, e, nt), u.addListener(a.SINGLE_HIDE_ZOOM, e, Q), u.addListener(a.SINGLE_SHOW_ZOOM, e, q), u.addListener(a.SINGLE_PRODUCT_ZOOM, e, Y), u.addListener(a.SINGLE_PRODUCT_UNZOOM, e, Y), u.addListener(a.SINGLE_DISABLE_DOWN, e, X), u.addListener(a.SINGLE_ENABLE_DOWN, e, et), u.addListener(a.SINGLE_DISABLE_UP, e, Z), u.addListener(a.SINGLE_ENABLE_UP, e, J), u.addListener(a.SINGLE_SHOW_FOOTER_NAV, e, tt), u.addListener(a.SINGLE_HIDE_FOOTER_NAV, e, ot), u.addListener(a.MENU_NAV_TRANSITION, e, W), u.addListener(a.UPSELL_CHANGE, e, W)
        };
    e.addToCart = function() {
        -1 === R ? e.selectSize(!0) : (u.addListener(a.PRODUCT_ADDED_TO_CART, e, z), j(), f.addItem(k.item_id, R, k))
    }, e.clickClose = function() {
        V()
    }, e.clickNext = function() {
        w.hasClass("disabled") || (J(), e.selectSize(!1), u.broadcast(a.SINGLE_PRODUCT_NEXT))
    }, e.clickPrev = function() {
        C.hasClass("disabled") || (et(), e.selectSize(!1), u.broadcast(a.SINGLE_PRODUCT_PREV))
    }, e.zoomToDetails = function() {
        s.blockZoom || (s.blockZoom = !0, n(function() {
            s.blockZoom = !1
        }, 700), s.isZoomed ? K() : u.broadcast(a.SINGLE_PRODUCT_ZOOM))
    };
    var x = function(e) {
        e.preventDefault()
    };
    e.selectSize = function(t) {
        E = $("#product-sizes");
        var o = e.view.find(".overlay");
        t === !0 ? (_.addClass("open"), E.removeClass("hide"), o.addClass("show")) : t === !1 ? (_.removeClass("open"), E.addClass("hide"), o.removeClass("show")) : (_.toggleClass("open"), E.toggleClass("hide"), o.toggleClass("show")), o.off("click"), o.on("click", function() {
            e.selectSize(!1)
        }), _.hasClass("open") ? (N = parseInt(b.css("height")), L.height() < b.height() && (O = L.jScrollPane({
            autoReinitialise: !0
        })), m.touch && $(document).on("touchmove", x), d.disableScroll()) : (void 0 !== O && O.data().jsp.destroy(), m.touch && $(document).off("touchmove", x), d.enableScroll())
    };
    var H = function() {
            var e = N;
            e > 370 && (e = 370), N = e;
            var t = $(window).height() - 120;
            N > t ? O = L.jScrollPane({
                autoReinitialise: !0
            }) : void 0 !== O && void 0 !== O.data().jsp && (O.data().jsp.destroy(), O = void 0)
        },
        G = v.throttle(H, 100),
        B = function() {
            E = $(".product-sizes").last(), L = E.find(".scrollpane"), b = L.find(".filterList"), e.view.find(".overlay").remove(), $("<div/>", {
                "class": "overlay"
            }).appendTo(e.view);
            var t = k.associated,
                o = E.find("ul");
            if (o.children("li").off(), o.remove(), o = $("<ul/>"), "Shoes" === k.product_category) {
                var n = $("<li/>", {
                    "class": "key",
                    text: "EU | US | UK"
                });
                n.appendTo(o)
            }
            var i = !1;
            v.each(t, function(t) {
                var n = t.size.replace("EU ", "").replace("US ", "").replace("UK ", ""),
                    a = n.split(" | "),
                    r = "";
                v.each(a, function(e) {
                    var t = parseInt(e);
                    10 > t && (e = "0" + e), r += e + " | "
                }), r = r.substr(0, r.length - 3);
                var s = $("<li/>", {
                    "data-id": t.id,
                    "data-size": t.size,
                    "data-qty": t.qty,
                    text: r
                });
                0 === t.qty ? s.addClass("out-of-stock") : i = !0, s.appendTo(o), s.hasClass("out-of-stock") || s.on("click", function() {
                    var n = $(this);
                    o.children("li").removeClass("selected"), n.toggleClass("selected"), n.hasClass("selected") ? (R = t.id, p.setHTML(_, r), I.removeAttr("disabled"), e.selectSize(!1)) : (R = -1, p.setHTML(_, "Size"), I.attr("disabled", !0))
                })
            }), i || I.children("span").text("Sold out"), o.appendTo(b)
        },
        F = function() {
            e.view.addClass("show"), T.addClass("show").removeClass("scrollout")
        },
        j = function() {
            I.addClass("disabled"), y = $("<div/>", {
                "class": "spinner"
            });
            for (var e = 1; 3 > e; e++) $("<div/>", {
                "class": "bounce" + e
            }).appendTo(y);
            y.appendTo(I)
        },
        z = function() {
            y.fadeOut("fast", function() {
                I.removeClass("disabled"), y.remove(), y = null
            })
        },
        K = function() {
            u.broadcast(a.SINGLE_PRODUCT_UNZOOM)
        },
        V = function() {
            e.view.removeClass("show"), u.broadcast(a.BACK_TO_CATALOG)
        },
        W = function() {
            o.$state.current.name === h.PRODUCT && e.view.removeClass("show")
        },
        Q = function() {
            g.parent("li").addClass("hide")
        },
        q = function() {
            g.parent("li").removeClass("hide")
        },
        Y = function() {
            e.selectSize(!1), g.toggleClass("zoom-out")
        },
        Z = function() {
            C.addClass("disabled")
        },
        J = function() {
            C.removeClass("disabled")
        },
        X = function() {
            w.addClass("disabled")
        },
        et = function() {
            w.removeClass("disabled")
        },
        tt = function() {
            T.removeClass("scrollout")
        },
        ot = function() {
            T.addClass("scrollout")
        },
        nt = function() {
            e.view.removeClass("ng-hide"), T && T.removeClass("scrollout")
        },
        it = function() {
            e.view.addClass("ng-hide"), E.addClass("hide")
        },
        at = function() {
            e.view.addClass("ng-hide"), E.addClass("hide")
        },
        rt = function() {
            I.find("i").addClass("hide");
            var t = e.getStorageItem(l.SELECTED_CURRENCY);
            if (I.find("." + t).removeClass("hide"), void 0 !== k) switch (t) {
                case c.DOLLAR:
                    e.price = parseFloat(k.item_price_dollar).toFixed(2);
                    break;
                case c.POUNDS:
                    e.price = parseFloat(k.item_price_pounds).toFixed(2);
                    break;
                default:
                case c.EURO:
                    e.price = parseFloat(k.item_price_euro).toFixed(2)
            }
        };
    e.$on("$destroy", function() {
        R = -1, $(window).off("resize", G)
    })
}]), app.controller("UpsellController", ["$scope", "$state", "$timeout", "$interval", "jkBroadcastService", "$controller", "EventNames", "jkDetectionService", "CollectionStateService", "States", function(e, t, o, n, i, a, r, s, c, l) {
    a("AbstractController", {
        $scope: e
    });
    var d, u, f, v, p, m;
    e.init = function() {
        e.view = $(".upsells").last(), i.addListener(r.PRODUCT_READY, e, h), i.addListener(r.BACK_TO_CATALOG, e, O), i.addListener(r.UPSELL_CHANGE, e, O), i.addListener(r.MENU_NAV_TRANSITION, e, O), u = e.view.find(".scroll-container"), m = e.view.find(".bar"), f = u.find("ul"), f.children("li").remove(), g(), S(), e.abstractInit()
    };
    var h = function(n) {
            _.each(n.related, function(e) {
                var n = $("<li/>").appendTo(f);
                n.css({
                    "background-image": "url(" + e.thumbnail + ")"
                });
                var a = $("<a/>", {
                    "data-path": e.id
                }).appendTo(n);
                a.on("click", function(e) {
                    e.preventDefault();
                    var n = $(this);
                    i.broadcast(r.UPSELL_CHANGE), o(function() {
                        $(window).scrollTop(0);
                        var e = n.attr("data-path");
                        c.setSelectedItem(e), t.go(l.PRODUCT, {
                            id: e
                        })
                    }, 600)
                })
            }), o(function() {
                e.view.addClass("show")
            }, 1e3)
        },
        S = function() {
            var e = $(".product-page").last().height(),
                t = $(window).height();
            d = e - (t + .5 * t), T(), C()
        },
        g = function() {
            i.addListener(r.SINGLE_SCROLL, e, T)
        },
        C = function() {
            s.touch || (u.on("mouseenter", I), u.on("mouseleave", L))
        },
        w = function() {
            s.touch || (u.off("mouseenter", I), u.off("mouseleave", L))
        },
        T = function() {
            var e = $(window).scrollTop();
            e >= d ? (u.addClass("show"), m.addClass("show")) : (u.removeClass("show"), m.removeClass("show")), E()
        },
        E = function() {
            var e = $(window).scrollTop(),
                t = e + .9 * $(window).height(),
                o = u.find("li"),
                n = o.length,
                i = 0;
            for (i; n > i; i++) {
                var a = $(o[i]);
                if (!(a.offset().top < t)) break;
                a.addClass("onscreen")
            }
            for (i; n > i; i++) $(o[i]).removeClass("onscreen");
            return !0
        },
        I = function() {
            var e = u.width(),
                t = u[0].scrollWidth,
                o = t / e - 1,
                i = 10,
                a = 2,
                r = 0,
                s = 0,
                c = 0,
                l = e - 2 * i,
                d = e / l,
                f = _.throttle(function(e) {
                    r = e.pageX, s = Math.min(Math.max(0, r - i), l) * d
                }, 30);
            u.on("mousemove", f), v = n(function() {
                c += (r - c) / a
            }, 20), p = n(function() {
                TweenLite.to(u, 1.5, {
                    scrollTo: {
                        x: c * o,
                        y: 0
                    }
                })
            }, 100)
        },
        L = function() {
            n.cancel(v), n.cancel(p), u.off("mousemove")
        },
        O = function() {
            e.view.addClass("transition-out")
        },
        b = function() {
            u.find("a").off("click"), w(), L()
        };
    e.$on("$destroy", function() {
        b()
    })
}]), app.controller("StockistsAsideController", ["$scope", "$rootScope", "$timeout", "$state", "$controller", "jkBroadcastService", "ResizeService", "StockistsDefaults", "StockistsService", "EventNames", "States", function(e, t, o, n, i, a, r, s, c, l, d) {
    i("AsideListController", {
        $scope: e,
        $controller: i
    });
    var u = [];
    e.init = function() {
        e.view = $(".page-aside"), e.detail = $("#stockists-detail"), e.abstractListInit(), f(), v(), o(function() {
            var e = t.$state;
            if (e.current.name === d.STOCKISTS_STORES)
                for (var o = u.length, n = 0; o > n; n++)
                    if (u[n].id.toString() === e.params.id.toString()) {
                        var i = c.getCountry(u[n].name);
                        return a.broadcast(l.SHOW_MAPS_FOR_COUNTRY, [i]), !0
                    }
        }, 100)
    }, e.showMaps = function(e, t, o) {
        $("span.key").removeClass("active"), $(o.target).addClass("active"), a.broadcast(l.CHANGE_MAPS, [e, t, s.ZOOM]), r.isSmall() && TweenLite.to(window, .45, {
            scrollTo: 0,
            delay: .1,
            ease: Quart.easeOut
        })
    };
    var f = function() {
            a.addListener(l.MENU_NAV_TRANSITION, e, m), t.$on("$stateChangeStart", p)
        },
        v = function() {
            var t = e.nav.find("ul").children("li").find("a");
            t.each(function() {
                var e = $(this).attr("data-id"),
                    t = $(this).text();
                u.push({
                    id: e,
                    name: t
                })
            }), t = null
        },
        p = function(e, t, o) {
            if (t.name === d.STOCKISTS_STORES) {
                for (var i = u.length, r = 0; i > r; r++)
                    if (u[r].id.toString() === o.id.toString()) {
                        var s = c.getCountry(u[r].name);
                        return a.broadcast(l.SHOW_MAPS_FOR_COUNTRY, [s]), !0
                    }
                return e.preventDefault(), n.go(d.STOCKISTS_LIST), !1
            }
        },
        m = function() {
            var o = t.$state.current.name,
                n = d.STOCKISTS_LIST,
                i = d.STOCKISTS_STORES;
            (o === n || o === i) && e.view.removeClass("show")
        }
}]), app.controller("StockistsContentController", ["$scope", "$rootScope", "$controller", "jkBroadcastService", "EventNames", "States", function(e, t, o, n, i, a) {
    o("AsideContentController", {
        $scope: e,
        $controller: o
    }), e.initContent = function() {
        e.view = $(".gallery-image"), n.addListener(i.MENU_NAV_TRANSITION, e, r), e.initAbstractAsideContent()
    };
    var r = function() {
        var o = t.$state.current.name,
            n = a.STOCKISTS_LIST,
            i = a.STOCKISTS_STORES;
        (o === n || o === i) && (e.view.removeClass("introduce"), e.view.css({
            left: 0
        }))
    }
}]), app.controller("StockistsMapsController", ["$scope", "$rootScope", "$timeout", "$controller", "$state", "jkURLService", "jkBroadcastService", "jkDetectionService", "StockistsDefaults", "EventNames", "UrlNames", "HoverService", "ResizeService", "States", function(e, t, o, n, i, a, r, s, c, l, d, u, f, v) {
    var p, m, h, S;
    n("StockistsContentController", {
        $scope: e,
        $controller: n
    }), e.offsetValue = 0, e.init = function() {
        g(), e.initContent(), S = $("#zoomout"), h = $("#zoomin"), u.setHTML(S, S.html()), u.setHTML(h, h.html())
    }, e.zoomIn = function() {
        if (18 > m) {
            var e = m + 1;
            p.setZoom(e), m = e, S.removeClass("disabled")
        } else h.addClass("disabled")
    }, e.zoomOut = function() {
        if (m > 2) {
            var e = m - 1;
            p.setZoom(e), m = e, h.removeClass("disabled")
        } else S.addClass("disabled")
    };
    var g = function() {
            t.$on("$stateChangeStart", L), $(window).on("resize", C), C(), r.addListener(l.CHANGE_MAPS, e, T), r.addListener(l.SHOW_MAPS_FOR_COUNTRY, e, w), r.addListener(l.MENU_NAV_TRANSITION, e, O)
        },
        C = function() {
            f.isSmall() ? ($(".maps").addClass("smallSize"), e.offsetValue = 0) : (e.offsetValue = 200, $(".maps").css({
                left: e.offsetValue
            }), $(".maps").removeClass("smallSize"))
        },
        w = function(t) {
            var o = void 0 === t.zoom ? 4 : t.zoom,
                n = o,
                i = t.lat;
            f.isSmall() ? (n = 1 > o ? 1 : o - 1, e.offsetValue = 0) : e.offsetValue = 200, _.delay(C()), E(i, t["long"], n, !0, t.markers)
        },
        T = function(e, t, o) {
            E(e, t, o, !1)
        },
        E = function(e, t, o, n, i) {
            var r = {
                backgroundColor: "#000000",
                center: {
                    lat: e,
                    lng: t
                },
                zoom: o,
                scrollwheel: !1,
                disableDefaultUI: !0,
                styles: c.STYLES_ARRAY
            };
            m = o, p = new google.maps.Map(document.getElementById("map-canvas"), r), google.maps.event.addListenerOnce(p, "idle", function() {
                $("#gallery-maps").addClass("show"), $("#map-canvas").addClass("show");
                var o = a.getUrlByName(d.MAPS_MARKER);
                if ((s.retina || s.retinahd) && (o = a.getUrlByName(d.MAPS_MARKER_HD)), n) _.each(i, function(e) {
                    var t = new google.maps.LatLng(e.lat, e["long"]),
                        n = new google.maps.MarkerImage(o, null, null, null, new google.maps.Size(100, 50)),
                        i = new google.maps.Marker({
                            position: t,
                            map: p,
                            icon: n
                        });
                    google.maps.event.addListener(i, "click", function() {
                        I(p, i, 15)
                    })
                });
                else {
                    var r = new google.maps.LatLng(e, t),
                        c = new google.maps.MarkerImage(o, null, null, null, new google.maps.Size(100, 50));
                    new google.maps.Marker({
                        position: r,
                        map: p,
                        icon: c
                    })
                }
            })
        },
        I = function(e, t, n) {
            m !== n && ($("#map-canvas").addClass("zoomin"), o(function() {
                e.setZoom(n), m = n, e.setCenter(t.getPosition()), o(function() {
                    $("#map-canvas").removeClass("zoomin")
                }, 700)
            }, 300))
        },
        L = function(e, t) {
            t.name !== v.STOCKISTS_STORES && $("#gallery-maps").removeClass("show")
        },
        O = function() {
            var e = t.$state.current.name,
                n = v.STOCKISTS_LIST,
                i = v.STOCKISTS_STORES;
            (e === n || e === i) && o(function() {
                $("#gallery-maps").removeClass("show")
            }, 200)
        }
}]), broadcastCenter.factory("jkBroadcastService", ["_", function(e) {
    var t = [];
    return {
        addListener: function(e, o, n) {
            t.push({
                name: e,
                scope: o.$id,
                callback: n
            })
        },
        removeListener: function(o, n, i) {
            var a = e.reject(t, function(e) {
                return e.name === o && n.$id === e.scope && e.callback === i
            });
            t = a
        },
        getAllListenersForScope: function() {},
        cleanScope: function(o) {
            var n = e.reject(t, function(e) {
                return e.scope === o.$id
            });
            t = n
        },
        broadcast: function(o, n) {
            e.each(t, function(e) {
                void 0 !== e && e.name === o && e.callback.apply(this, n)
            })
        },
        toString: function() {
            return "jkBroadcastService: " + t.length
        }
    }
}]), etqGlobal.constant("jkIPhoneDiagonals", {
    IPHONE_4: 576,
    IPHONE_5: 651,
    IPHONE_6: 765,
    IPHONE_6_PLUS: 844
}), detector.directive("detectionClasses", ["jkDetectionClassesService", "_", function(e, t) {
    return {
        restrict: "AC",
        link: function(o, n) {
            var i = e.getFunctionalClasses();
            i.push(e.getDeviceClass()), i.push(e.getDensityClass()), i.push(e.getBrowserClass()), i.push(e.getOSClass()), t.each(i, function(e) {
                t.each(e.split(","), function(e) {
                    n.addClass(e)
                })
            })
        }
    }
}]), detector.directive("browserClass", ["jkDetectionClassesService", "_", function(e, t) {
    return {
        restrict: "AC",
        link: function(o, n) {
            var i = e.getBrowserClass().split(",");
            t.each(i, function(e) {
                n.addClass(e)
            })
        }
    }
}]), detector.directive("densityClass", ["jkDetectionClassesService", "_", function(e, t) {
    return {
        restrict: "AC",
        link: function(o, n) {
            var i = e.getDensityClass().split(",");
            t.each(i, function(e) {
                n.addClass(e)
            })
        }
    }
}]), detector.directive("deviceClass", ["jkDetectionClassesService", "_", function(e, t) {
    return {
        restrict: "AC",
        link: function(o, n) {
            var i = e.getDeviceClass().split(",");
            t.each(i, function(e) {
                n.addClass(e)
            })
        }
    }
}]), detector.directive("functionalClasses", ["jkDetectionClassesService", "_", function(e, t) {
    return {
        restrict: "AC",
        link: function(o, n) {
            var i = e.getFunctionalClasses();
            t.each(i, function(e) {
                t.each(e.split(","), function(e) {
                    n.addClass(e)
                })
            })
        }
    }
}]), detector.directive("osClass", ["jkDetectionClassesService", "_", function(e, t) {
    return {
        restrict: "AC",
        link: function(o, n) {
            var i = e.getOSClass().split(",");
            t.each(i, function(e) {
                n.addClass(e)
            })
        }
    }
}]), detector.factory("jkDetectionClassesService", ["jkDetectionService", "_", function(e, t) {
    var o = [{
            classes: "iphone,iphone3g",
            check: e.iphone3g
        }, {
            classes: "iphone,iphone4",
            check: e.iphone4
        }, {
            classes: "iphone,iphone5",
            check: e.iphone5
        }, {
            classes: "iphone,iphone6",
            check: e.iphone6
        }, {
            classes: "iphone,iphone6plus",
            check: e.iphone6plus
        }, {
            classes: "iphone",
            check: e.iphone
        }, {
            classes: "ipod",
            check: e.ipod
        }, {
            classes: "ipad",
            check: e.ipad
        }, {
            classes: "nexus",
            check: e.nexus
        }, {
            classes: "htc",
            check: e.htc
        }, {
            classes: "sony",
            check: e.sony
        }, {
            classes: "acer",
            check: e.acer
        }, {
            classes: "lg",
            check: e.lg
        }, {
            classes: "samsung",
            check: e.samsung
        }, {
            classes: "nokia",
            check: e.nokia
        }, {
            classes: "lenovo",
            check: e.lenovo
        }, {
            classes: "huawei",
            check: e.huawei
        }],
        n = [{
            classes: "webkit,chrome",
            check: e.chrome
        }, {
            classes: "webkit,safari",
            check: e.safari
        }, {
            classes: "mozilla,ff",
            check: e.firefox
        }, {
            classes: "iemobile,iemobile9",
            check: e.iemobile9
        }, {
            classes: "iemobile,iemobile10",
            check: e.iemobile10
        }, {
            classes: "iemobile,iemobile11",
            check: e.iemobile11
        }, {
            classes: "ie,ie8",
            check: e.ie8
        }, {
            classes: "ie,ie9",
            check: e.ie9
        }, {
            classes: "ie,ie10",
            check: e.ie10
        }, {
            classes: "ie,ie11",
            check: e.ie11
        }, {
            classes: "operamini",
            check: e.operamini
        }, {
            classes: "opera",
            check: e.opera
        }],
        i = [{
            classes: "windows,wp,wp7",
            check: e.windowsphone7
        }, {
            classes: "windows,wp,wp8",
            check: e.windowsphone8
        }, {
            classes: "ios,ios5",
            check: e.ios5
        }, {
            classes: "ios,ios6",
            check: e.ios6
        }, {
            classes: "ios,ios7",
            check: e.ios7
        }, {
            classes: "ios,ios8",
            check: e.ios8
        }, {
            classes: "ios",
            check: e.ios
        }, {
            classes: "android,android2",
            check: e.android2
        }, {
            classes: "android,android3",
            check: e.android3
        }, {
            classes: "android,android4",
            check: e.android4
        }, {
            classes: "android,android5",
            check: e.android5
        }, {
            classes: "blackberry,playbook",
            check: e.playbook
        }, {
            classes: "blackberry",
            check: e.blackberry
        }],
        a = [{
            classes: "low-density",
            check: e.lowdensity
        }, {
            classes: "medium-density,half-retina",
            check: e.halfretina
        }, {
            classes: "large-density,retina",
            check: e.retina
        }, {
            classes: "xlarge-density,retina-hd",
            check: e.retinahd
        }, {
            classes: "xxlarge-density,super-hd",
            check: e.superhd
        }],
        r = [{
            classes: "standalone",
            check: e.standalone
        }, {
            classes: "touch",
            check: e.touch
        }, {
            classes: "mobile",
            check: e.mobile
        }, {
            classes: "desktop",
            check: e.desktop
        }],
        s = function(e) {
            var o = t.find(e, function(e) {
                return e.check === !0
            });
            return void 0 === o ? "" : o.classes
        };
    return {
        getDeviceClass: function() {
            return s(o)
        },
        getBrowserClass: function() {
            return s(n)
        },
        getOSClass: function() {
            return s(i)
        },
        getDensityClass: function() {
            return s(a)
        },
        getFunctionalClasses: function() {
            var e = [];
            return t.each(r, function(t) {
                t.check === !0 && e.push(t.classes)
            }), e
        },
        toString: function() {
            return "jkDetectionClassesService"
        }
    }
}]), detector.factory("jkDetectionService", ["jkIPhoneDiagonals", function(e) {
    var t = navigator.userAgent.toLowerCase(),
        o = -1 !== t.indexOf("iphone"),
        n = -1 !== t.indexOf("ipad"),
        i = -1 !== t.indexOf("ipod"),
        a = o || n || i,
        r = Math.floor(Math.sqrt(screen.width * screen.width + screen.height * screen.height));
    return {
        iphone: o,
        iphone3g: o && 1 === window.devicePixelRatio && r === e.IPHONE_4,
        iphone4: o && 2 === window.devicePixelRatio && r === e.IPHONE_4,
        iphone5: o && r === e.IPHONE_5,
        iphone6: o && r === e.IPHONE_6,
        iphone6plus: o && r === e.IPHONE_6_PLUS,
        ipod: i,
        ipad: n,
        nexus: -1 !== t.indexOf("nexus"),
        htc: -1 !== t.indexOf("htc"),
        sony: -1 !== t.indexOf("sony"),
        acer: -1 !== t.indexOf("acer"),
        lg: -1 !== t.indexOf("lg"),
        nokia: -1 !== t.indexOf("nokia"),
        lenovo: -1 !== t.indexOf("lenovo"),
        samsung: -1 !== t.indexOf("gt-") || -1 !== t.indexOf("galaxy") || -1 !== t.indexOf("samsung") || -1 !== t.indexOf("sm-") || -1 !== t.indexOf("sch-"),
        huawei: -1 !== t.indexOf("huawei") || -1 !== t.indexOf("ascend"),
        ie: -1 !== t.indexOf("msie"),
        ie8: -1 !== t.indexOf("msie 8"),
        ie9: -1 !== t.indexOf("msie 9"),
        ie10: -1 !== t.indexOf("msie 10"),
        ie11: -1 !== t.indexOf("rv:11"),
        iemobile: -1 !== t.indexOf("iemobile"),
        iemobile9: -1 !== t.indexOf("iemobile/9"),
        iemobile10: -1 !== t.indexOf("iemobile/10"),
        iemobile11: -1 !== t.indexOf("iemobile/11"),
        chrome: -1 !== t.indexOf("chrome") || -1 !== t.indexOf("crios"),
        firefox: -1 !== t.indexOf("firefox"),
        safari: -1 !== t.indexOf("safari"),
        opera: -1 !== t.indexOf("opera"),
        operamini: -1 !== t.indexOf("opera mini"),
        webkit: -1 !== t.indexOf("webkit"),
        ios: a,
        ios5: a && -1 !== t.indexOf("os 5"),
        ios6: a && -1 !== t.indexOf("os 6"),
        ios7: a && -1 !== t.indexOf("os 7"),
        ios8: a && -1 !== t.indexOf("os 8"),
        android: -1 !== t.indexOf("android"),
        android2: -1 !== t.indexOf("android 2"),
        android3: -1 !== t.indexOf("android 3"),
        android4: -1 !== t.indexOf("android 4"),
        android5: -1 !== t.indexOf("android 5"),
        windowsphone: -1 !== t.indexOf("windows phone"),
        windowsphone7: -1 !== t.indexOf("windows phone os 7"),
        windowsphone8: -1 !== t.indexOf("windows phone 8"),
        blackberry: -1 !== t.indexOf("bb10"),
        playbook: -1 !== t.indexOf("playbook"),
        lowdensity: window.devicePixelRatio < 1,
        halfretina: window.devicePixelRatio > 1 && window.devicePixelRatio < 2,
        retina: 2 === window.devicePixelRatio,
        retinahd: 3 === window.devicePixelRatio,
        superhd: window.devicePixelRatio > 3,
        standalone: "standalone" in window.navigator && window.navigator.standalone === !0,
        touch: !!("ontouchstart" in window),
        portrait: -90 === window.orientation || 90 === window.orientation,
        landscape: 0 === window.orientation || 180 === window.orientation,
        mobile: "undefined" != typeof window.orientation,
        desktop: "undefined" == typeof window.orientation,
        toString: function() {
            return "jkDetectionService"
        }
    }
}]), urlManager.constant("jkURLManagerDefaults", {
    FILE_NAME: "urls.json",
    PATH_NAME: "/json/"
}), urlManager.constant("jkURLTargets", {
    _BLANK: "_blank",
    _SELF: "_self",
    _PARENT: "_parent",
    _TOP: "_top"
}), urlManager.factory("jkURLService", ["jkURLManagerDefaults", "jkURLTargets", "$http", "$q", "_", function(e, t, o, n, i) {
    var a = e.PATH_NAME + e.FILE_NAME,
        r = {},
        s = [],
        c = [],
        l = null,
        d = !1,
        u = !1;
    return {
        loadUrls: function(t, f) {
            var v = void 0 === t ? e.PATH_NAME : t,
                p = void 0 === f ? e.FILE_NAME : f;
            return a = v + p, d || u || (l = n.defer(), d = !0, o.get(a).then(function(e) {
                var t = e.data;
                r = t.currentGroup, s = t.groups;
                var o = i.find(s, function(e) {
                    return e.group === r
                });
                c = o.urls, d = !1, u = !0, l.resolve()
            }, function(e) {
                return console.error("jkURLService.loadUrls Failure", e), l.reject()
            })), l.promise
        },
        getUrlByName: function(e) {
            if (!u) return "";
            var t = i.find(c, function(t) {
                return t.name === e
            });
            return t.url
        },
        openUrlByName: function(e, o) {
            void 0 === o && (o = t._SELF);
            var n = this;
            window.open(n.getUrlByName(e), o)
        },
        isLoading: function() {
            return d
        },
        isLoaded: function() {
            return u
        },
        getGroup: function() {
            return r
        },
        setGroup: function(e) {
            r = e
        },
        toString: function() {
            return "jkURLService url = " + a
        }
    }
}]);