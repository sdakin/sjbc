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
define(["appcoreops", "lib/admin/MembershipAdmin"],
    function(AppCoreOps, MembershipAdmin)
{
    "use strict";

    var membershipPanel = new MembershipAdmin();
    membershipPanel.addListener("SHOW_ALERT", function(e) { showAlert(e.options); });

    var qBikes = null, $allPanes = $("div.main > div");
    $(".nav-sidebar").find("a").click(function(e) {
        var view = $(e.currentTarget).text();
        switch (view) {
            case "Bicycles":
                showBicycles();
                break;
            case "Membership":
                membershipPanel.showMembership();
                break;
            default:
                $allPanes.hide();
                break;
        }
    });

    $(".bicyclesUI").find(".btn-refresh").click(function(e) { qBikes = null; showBicycles(); });
    $(".bicyclesUI").find(".btn-addbike").click(function(e) { showBikeDetails(null); });
    $(".bicycleDetailUI").find("button.close-button").click(function(e) { showBicycles(); });
    $(".bicycleDetailUI").find("button.delete-button").click(function(e) { confirmDeleteBicycle(); });
    $("#dlgDeleteBicycle").find("button.btn-danger").click(function(e) { deleteBicycle(); });

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
            $bikeTable.empty();
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
        var bikeID = e ? $(e.currentTarget).text() : "";
        $.get("/sjbc_admin/get/form/bicycle/" + bikeID).done(function(data) {
            var $details = $panel.find(".bicycleDetails");
            $details.html(data);
            var $form = $details.find("form");
            $form.attr("data-bikeid", bikeID);
            // create a visual break after the location field
            $("#id_location").parent().after("<div></div>");
            $form.on("submit", function(e) { saveBicycle(e); });
        });
    }

    function saveBicycle(e) {
        e.preventDefault();
        var $form = $(e.currentTarget), data = $form.serialize(), 
            url = $form.attr("action") + $form.attr("data-bikeid"),
            alertOptions = { parent:$(".bicycleDetailUI"), top: "17px" };
        $.post(url, data).done(function(response) {
            alertOptions.message = "Bicycle record saved.";
            showAlert(alertOptions);
        }).fail(function(response) {
            alertOptions.message = "ERROR encountered saving bicycle record.";
            alertOptions.isError = true;
            showAlert(alertOptions);
        });
    }

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

    function confirmDeleteBicycle() {
        $('#dlgDeleteBicycle').modal();
    }

    function deleteBicycle() {
        // get the record ID of the bicycle record being edited and
        // use it to send a DELETE command
        var bikeID = $(".bicycleDetailUI").find("form").attr("data-bikeid");
        $.ajax({
            url: "/sjbc_admin/delete/bicycle/" + bikeID,
            method: 'DELETE'
        }).done(function(response) {
            $('#dlgDeleteBicycle').modal('hide');
            qBikes = null;  // force a reload of the bicycle data
            showBicycles();
        }).fail(function(response) {
            $('#dlgDeleteBicycle').modal('hide');
            var alertOptions = { parent:$(".bicycleDetailUI"), top: "17px" };
            alertOptions.message = "ERROR encountered deleting bicycle record.";
            alertOptions.isError = true;
            showAlert(alertOptions);
        });
    }
});
