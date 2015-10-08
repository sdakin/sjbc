requirejs.config({
    "baseUrl": "js",

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

define(["lib/DateUtils", "app/views/FormView", "jquery"], function(DateUtils, FormView) {
    "use strict";

    var $formUI = $("#shiftSignupForm");
    var form = new FormView($formUI);
    form.addListener(FormView.SUBMIT, handleSignup);
    form.addListener(FormView.VALIDATE_FORM_OBJECT, handleValidateObject);

    // create the sign-up schedule
    var $openDayTpl = $($formUI.find("#shiftSignupFormTemplates .shiftDay.open")[0]);
    var $closedDayTpl = $($formUI.find("#shiftSignupFormTemplates .shiftDay.closed")[0]);
    var $schedule = $formUI.find(".shiftSchedule");
    var dayHdgs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day = DateUtils.getPreviousDay(new Date(), 0);
    for (var i = 0 ; i < 4 ; i++) {
        var $row = $('<div class="shiftRow"></div>');
        for (var j = 0 ; j < 7 ; j++) {
            var $day = (j >= 1 && j <= 4) ? $openDayTpl.clone() : $closedDayTpl.clone();
            var heading = dayHdgs[j] + " " + (day.getMonth() + 1) + '/' + day.getDate();
            $day.find(".shiftDayHeading").text(heading);
            $row.append($day);
            day = new Date(day.getTime() + DateUtils.millisPerDay);
        }
        $schedule.append($row);
    }

    function handleSignup(e) {
        debugger;
    }

    function handleValidateObject(e) {
        // perform custom validation for the shift sign up form
        e.valid = false;
        var field = $(e.obj.$view.children()[1]).attr("class"),
            choices, checks, $field;
        if (field.indexOf("skills") >= 0) {
            choices = e.obj.$view.find("input[type='checkbox']");
            checks = false;
            $.each(choices, function(index, choice) {
                if (index == 3) {
                    if ($(choice).is(":checked")) {
                        var $field = e.obj.$view.find("#inputOtherSkill");
                        checks |= $field.val().length > 0;
                    }
                } else {
                    checks |= $(choice).is(":checked");
                }
            });
            $field = e.obj.$view.find(".skills");
            if (checks === 0) {
                $field.addClass("required-error");
            } else {
                e.valid = true;
                $field.removeClass("required-error");
            }
        } else if (field.indexOf("shiftSchedule") >= 0) {
            choices = e.obj.$view.find("input");
            checks = false;
            $.each(choices, function(index, choice) {
                checks |= $(choice).is(":checked");
            });
            $field = e.obj.$view.find(".shiftSchedule");
            if (checks === 0) {
                $field.addClass("required-error");
            } else {
                e.valid = true;
                $field.removeClass("required-error");
            }
        }
    }
});
