define(["eventtarget"], function(EventTarget) {

    /* jshint node: true, strict: true */
    "use strict";

    function MembershipAdmin() {
        EventTarget.call(this);

        var self = this;
        self.$allPanes = $("div.main > div");
        self.$panel = $(".membershipUI");
        self.$panel.find(".btn-addmember").click(function(e) { self.showMemberDetails(null); });
        $(".memberDetailUI").find("button.close-button").click(function(e) { self.showMembership(); });
    }

    MembershipAdmin.prototype = new EventTarget();
    MembershipAdmin.prototype.constructor = MembershipAdmin;

    MembershipAdmin.prototype.showMembership = function() {
        var self = this;
        if (!self.$panel.is(':visible')) {
            self.$allPanes.hide();
            self.$panel.show();
        }
    };

    MembershipAdmin.prototype.showMemberDetails = function(e) {
        var self = this;
        self.$allPanes.hide();
        $(".memberDetailUI").show();
        $.get("/sjbc_admin/get/form/member/").done(function(data) {
            var $details = $(".memberDetails");
            $details.html(data);
            var $form = $details.find("form");
            // $form.attr("data-bikeid", bikeID);

            // put these controls first on their line
            $("#id_first_name").parent().before("<div></div>");
            $("#id_gender").parent().before("<div></div>");

            // these controls we want to appear on a line by themselves
            $("label[for='id_type_of_cyclist_0']").parent().css("display", "block");
            $("#id_notes").parent().css("display", "block");

            // there's an empty <p> element following the type of cyclist choice
            // group, and it's causing an unwanted indenting, so make it a block
            // so it's on a line by itself
            $("#id_type_of_cyclist").next().css("display", "block");

            // $form.on("submit", function(e) { saveMember(e); });
        });
    };

    return MembershipAdmin;
});
