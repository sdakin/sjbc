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
define(["appcoreops", "lib/admin/BicycleAdmin", "lib/admin/MembershipAdmin"],
    function(AppCoreOps, BicycleAdmin, MembershipAdmin)
{
    "use strict";

    var bicyclePanel = new BicycleAdmin(), membershipPanel = new MembershipAdmin();
    bicyclePanel.addListener("SHOW_ALERT", function(e) { showAlert(e.options); });
    membershipPanel.addListener("SHOW_ALERT", function(e) { showAlert(e.options); });

    var $allPanes = $("div.main > div");
    $(".nav-sidebar").find("a").click(function(e) {
        var view = $(e.currentTarget).text();
        switch (view) {
            case "Bicycles":
                bicyclePanel.showBicycles();
                break;
            case "Membership":
                membershipPanel.showMembership();
                break;
            default:
                $allPanes.hide();
                break;
        }
    });

    function showAlert(options) {
        var $alert = $("#adminAlert").clone();
        if (options.isError) {
            $alert.removeClass("alert-success");
            $alert.addClass("alert-danger");
        }
        $alert.find(".alert-message").text(options.message);
        if ("top" in options) $alert.css("top", options.top);
        options.parent.append($alert);
        $alert.show();
        $alert.alert();
        if (!options.sticky) {
            $alert.delay(1500).fadeOut(800, function() {
                $alert.alert('close');
            });
        }
    }
});
