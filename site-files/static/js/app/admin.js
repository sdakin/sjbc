requirejs.config({
    "baseUrl": "/static/js",

    "paths": {
        "jquery": "../xlib/jquery-1.11.3.min",
        "bootstrap": "../xlib/tbs/js/bootstrap.min",
        "eventtarget": "../xlib/EventTarget",
        "appcoreops": "app/appCoreOps"
    },

    // jquery and its plugins are not require modules: this is the way to mimic that.
    // See <https://github.com/requirejs/example-jquery-shim/blob/master/www/js/app.js>
    "shim": {
        "bootstrap": ["jquery"]
    }
});

// every 'script data-main' must include appCoreOps to properly handle the app's
// core operations (e.g., sign up, log in, log out, etc.)
define(["appcoreops"], function() {
    "use strict";

    var curView = "", qBikes = null, $allPanes = $("div.main > div");
    $(".nav-sidebar").find("a").click(function(e) {
        var view = $(e.currentTarget).text();
        if (view != curView) {
            curView = view;
            switch (view) {
                case "Bicycles":
                    showBicycles();
                    break;
                default:
                    $allPanes.hide();
                    break;
            }
        }
    });
    $(".bicycleDetailUI").find("button.close-details").click(function(e) { showBicycles(); });

    function showBicycles() {
        $allPanes.hide();
        $(".bicyclesUI").show();
        if (!qBikes) {
            qBikes = $.Deferred();
            qBikes.then(function(bikeData) {
                loadBicycles(bikeData);
            });
            $.get('/sjbc_admin/browse/bicycles').done(function(data) {
                qBikes.resolve(data);
            });
        }
    }

    function loadBicycles(bikes) {
        if (bikes && Array.isArray(bikes)) {
            var $bikeTable = $(".bicyclesUI").find("tbody");
            bikes.forEach(function(bike) {
                var btn = '<button type="button" class="btn btn-default btn-xs">' + bike.id + '</button>';
                var html = "<tr><td>" + btn + "</td><td>" + bike.sjbc_id +
                    "</td><td>" + bike.manufacturer +"</td><td>" + bike.model + "</td></tr>";
                var $row = $(html);
                $row.find("button").click(function(e) {
                    showBikeDetails(e);
                });
                $bikeTable.append($row);
            });
        }
    }

    function showBikeDetails(e) {
        $allPanes.hide();
        var $panel = $(".bicycleDetailUI");
        $panel.show();
        // fetch and display bike details
        var bikeID = $(e.currentTarget).text();
        $.get("/sjbc_admin/get/form/bicycle/" + bikeID).done(function(data) {
            $panel.find(".bicycleDetails").html(data);
        });
    }
});
