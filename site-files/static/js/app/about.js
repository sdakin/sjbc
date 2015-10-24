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

});
