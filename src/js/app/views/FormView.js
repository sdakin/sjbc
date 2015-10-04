define(["eventtarget", "jquery"], function(EventTarget, $) {

	function FormView($initView) {
        EventTarget.call(this);

		var self = this;
		self.$view = $initView;

		// set up "other" fields
		$("input[value='other']").click(function(e) { self.handleOtherClick(e); });

		// set up the Submit button
		self.$view.find('button[type="submit"]').click(function(e) { self.handleSubmit(e); });
	}

    FormView.prototype = new EventTarget();
    FormView.prototype.constructor = FormView;

    FormView.SUBMIT = "SUBMIT_EVENT";

	FormView.prototype.handleOtherClick = function(e) {
		var $checkbox = $(e.currentTarget), checked = !$checkbox.is(":checked");
		var $input = $checkbox.parents(".checkbox").find('input[type="text"]');
		if (checked)
			$input.css("display", "none");
		else {
			$input.css("display", "block");
			$input.focus();
		}
	};

	FormView.prototype.handleSubmit = function(e) {
		// TODO: validate required fields...

		this.fire({type:FormView.SUBMIT});
	};

	return FormView;
});
