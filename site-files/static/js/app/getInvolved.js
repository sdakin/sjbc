requirejs.config({
    "baseUrl": "/static/js",

    "paths": {
        "jquery": "../xlib/jquery-1.11.3.min",
        "bootstrap": "../xlib/tbs/js/bootstrap.min",
        "eventtarget": "../xlib/EventTarget"
    },

    // jquery and its plugins are not require modules: this is the way to mimic that.
    // See <https://github.com/requirejs/example-jquery-shim/blob/master/www/js/app.js>
    "shim": {
        "bootstrap": ["jquery"]
    }
});

define(["app/shiftSignup", "bootstrap"], function() {
    "use strict";

    $('.nav-tabs a').click(function(e) {
        e.preventDefault();
        window.location.hash = $(this).text();
    });

    window.onhashchange = function(e) {
        if (window.location.hash && window.location.hash.length > 1) {
            showTab(window.location.hash.substr(1));
        }
    };
    window.onhashchange();  // force a tab show check on first load

    function showTab(tabName) {
        $('.nav-tabs a').each(function(index, tab) {
            if ($(tab).text() == tabName)
                $(tab).tab('show');
        });
    }
});
