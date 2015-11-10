define(["eventtarget"], function(EventTarget) {

    /* jshint node: true, strict: true */
    "use strict";

    function BicycleAdmin() {
        EventTarget.call(this);

        var self = this;
        self.qBikes = null;
        self.$allPanes = $("div.main > div");
        self.$panel = $(".bicyclesUI");

        $(".bicyclesUI").find(".btn-refresh").click(function(e) { self.qBikes = null; self.showBicycles(); });
        $(".bicyclesUI").find(".btn-addbike").click(function(e) { self.showBikeDetails(null); });
        $(".bicycleDetailUI").find("button.close-button").click(function(e) { self.showBicycles(); });
        $(".bicycleDetailUI").find("button.delete-button").click(function(e) { self.confirmDeleteBicycle(); });
        $("#dlgDeleteBicycle").find("button.btn-danger").click(function(e) { self.deleteBicycle(); });
    }

    BicycleAdmin.prototype = new EventTarget();
    BicycleAdmin.prototype.constructor = BicycleAdmin;

    BicycleAdmin.prototype.showBicycles = function() {
        var self = this;
        self.$allPanes.hide();
        $(".bicyclesUI").show();
        if (!self.qBikes) {
            self.qBikes = $.Deferred();
            self.qBikes.then(function(bikeData) {
                self.loadBicycles(bikeData);
            });
            $.get('/sjbc_admin/browse/bicycles').done(function(data) {
                self.qBikes.resolve(data);
            });
        }
    };

    BicycleAdmin.prototype.loadBicycles = function(bikes) {
        var self = this;
        if (bikes && Array.isArray(bikes)) {
            var $bikeTable = $(".bicyclesUI").find("tbody");
            $bikeTable.empty();
            bikes.forEach(function(bike) {
                var btn = '<button type="button" class="btn btn-default btn-xs">' + bike.id + '</button>';
                var html = "<tr><td>" + btn + "</td><td>" + bike.sjbc_id +
                    "</td><td>" + bike.manufacturer +"</td><td>" + bike.model + "</td></tr>";
                var $row = $(html);
                $row.find("button").click(function(e) {
                    self.showBikeDetails(e);
                });
                $bikeTable.append($row);
            });
        }
    };

    BicycleAdmin.prototype.showBikeDetails = function(e) {
        var self = this;
        self.$allPanes.hide();
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
            $form.on("submit", function(e) { self.saveBicycle(e); });
        });
    };

    BicycleAdmin.prototype.saveBicycle = function(e) {
        var self = this;
        e.preventDefault();
        var $form = $(e.currentTarget), data = $form.serialize(), 
            url = $form.attr("action") + $form.attr("data-bikeid"),
            alertEvent = {
                type: "SHOW_ALERT",
                options: { parent:$(".bicycleDetailUI"), top: "17px" }
            };
        $.post(url, data).done(function(response) {
            alertEvent.options.message = "Bicycle record saved.";
            self.fire(alertEvent);
        }).fail(function(response) {
            alertEvent.options.message = "ERROR encountered saving bicycle record.";
            alertEvent.options.isError = true;
            self.fire(alertEvent);
        });
    };

    BicycleAdmin.prototype.confirmDeleteBicycle = function() {
        $('#dlgDeleteBicycle').modal();
    };

    BicycleAdmin.prototype.deleteBicycle = function() {
        // get the record ID of the bicycle record being edited and
        // use it to send a DELETE command
        var self = this;
        var bikeID = $(".bicycleDetailUI").find("form").attr("data-bikeid");
        $.ajax({
            url: "/sjbc_admin/delete/bicycle/" + bikeID,
            method: 'DELETE'
        }).done(function(response) {
            $('#dlgDeleteBicycle').modal('hide');
            self.qBikes = null;  // force a reload of the bicycle data
            self.showBicycles();
        }).fail(function(response) {
            $('#dlgDeleteBicycle').modal('hide');
            var alertEvent = {
                type: "SHOW_ALERT",
                options: { parent:$(".bicycleDetailUI"), top: "17px" }
            };
            alertEvent.options.message = "ERROR encountered deleting bicycle record.";
            alertEvent.options.isError = true;
            self.fire(alertEvent);
        });
    };

    return BicycleAdmin;
});
