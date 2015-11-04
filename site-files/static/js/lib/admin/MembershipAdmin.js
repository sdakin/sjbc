define(["eventtarget"], function(EventTarget) {

    /* jshint node: true, strict: true */
    "use strict";

    function MembershipAdmin() {
        EventTarget.call(this);

        var self = this;
        self.qMembers = null;
        self.$allPanes = $("div.main > div");
        self.$panel = $(".membershipUI");
        self.$panel.find(".btn-addmember").click(function(e) { self.showMemberDetails(null); });
        $(".membershipUI").find("button.btn-refreshmembers").click(function(e) { self.reloadMembers(); });
        $(".memberDetailUI").find("button.close-button").click(function(e) { self.showMembership(); });
    }

    MembershipAdmin.prototype = new EventTarget();
    MembershipAdmin.prototype.constructor = MembershipAdmin;

    MembershipAdmin.prototype.showMembership = function() {
        var self = this;
        if (!self.$panel.is(':visible')) {
            self.$allPanes.hide();
            self.$panel.show();
            if (!self.qMembers)
                self.reloadMembers();
        }
    };

    MembershipAdmin.prototype.reloadMembers = function() {
        var self = this;
        self.qMembers = $.Deferred();
        self.qMembers.then(function(memberData) {
            self.loadMembers(memberData);
        });
        $.get("/sjbc_admin/get/members").done(function(data) {
            self.qMembers.resolve(data);
        });
    }

    MembershipAdmin.prototype.loadMembers = function(members) {
        var self = this, $memberTable = $(".membershipUI").find("tbody");
        $memberTable.empty();
        if (members && Array.isArray(members)) {
            members.forEach(function(member) {
                var btn = '<button type="button" class="btn btn-default btn-xs">' + member.id + '</button>';
                var waiver = member.waiver_signed ? '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' : "&nbsp;";
                var html = "<tr><td>" + btn + "</td><td>" + member.first_name + "</td><td>" +
                    member.last_name +"</td><td>" + member.email + "</td><td>" +
                    member.username +"</td><td>" + waiver + "</td></tr>";
                var $row = $(html);
                $row.find("button").click(function(e) {
                    self.showMemberDetails(e);
                });
                $memberTable.append($row);
            });
        }
    }

    MembershipAdmin.prototype.showMemberDetails = function(e) {
        var self = this;
        self.$allPanes.hide();
        $(".memberDetailUI").show();
        var memberID = e ? $(e.currentTarget).text() : "";
        $.get("/sjbc_admin/get/form/member/" + memberID).done(function(data) {
            var $details = $(".memberDetails");
            $details.html(data);
            var $form = $details.find("form");
            $form.attr("data-memberid", memberID);

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

            $form.on("submit", function(e) { self.saveMember(e); });
        });
    };

    MembershipAdmin.prototype.saveMember = function(e) {
        var self = this;
        e.preventDefault();
        var $form = $(e.currentTarget), data = $form.serialize(), 
            url = $form.attr("action") + $form.attr("data-memberid"),
            saveEvent = {
                type: "SHOW_ALERT",
                options: { parent:$(".memberDetailUI"), top: "17px" }
            };
        $.post(url, data).done(function(response) {
            saveEvent.options.message = "Member record saved.";
            self.fire(saveEvent);
            self.qMembers = null;   // force a reload when returning to the member list
        }).fail(function(response) {
            saveEvent.options.message = "ERROR encountered saving member record.";
            saveEvent.options.isError = true;
            self.fire(saveEvent);
        });
    };

    return MembershipAdmin;
});
