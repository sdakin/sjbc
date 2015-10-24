define(["bootstrap"], function() {
    "use strict";

	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');

	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});

    var $logInDlg = $('#dlgLogIn'), $logInBtn = $("#dlgLogIn button"),
    	$logInUser = $logInDlg.find("#inputUser"), $logInPwd = $logInDlg.find("#inputPwd");
    $("#btnShowLogInDlg").click(function(e) { showLogIn(e); });
    $("#btnLogOut").click(function(e) { handleLogOut(e); });
    $logInBtn.click(function(e) { handleLogIn(e); });

    function showLogIn(e) {
		$logInDlg.modal().on('shown.bs.modal', function(e) {
			$logInUser.focus();
		}).on('hidden.bs.modal', function(e) {
			$logInUser.val("");
			$logInPwd.val("");
		});
    }

    function handleLogIn(e) {
		$.post("/user/login/", {
			username: $logInUser.val(),
			password: $logInPwd.val()
		}).done(function() {
			$logInDlg.modal('hide');
			window.location.reload();
		}).fail(function(jqXHR, textStatus, errorThrown) {
			// TODO: need to handle error cases...
			debugger;
		});
    }

    function handleLogOut(e) {
    	$.get("/user/logout").done(function() { window.location.reload(); });
    }
});
