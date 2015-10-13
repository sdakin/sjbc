define(["eventtarget", "app/views/FormObject", "jquery"],
	function(EventTarget, FormObject, $) {

	function FormView($initView) {
        EventTarget.call(this);

		var self = this;
		self.$view = $initView;

		// set up "other" fields
		$("input[value='other']").click(function(e) { self.handleOtherClick(e); });

		// set up the Submit button
		self.$view.find('button[type="submit"]').click(function(e) {
			self.handleSubmit(e);
			e.stopPropagation();
			return false;
		});
	}

    FormView.prototype = new EventTarget();
    FormView.prototype.constructor = FormView;

    FormView.SUBMIT = "SUBMIT_EVENT";
    FormView.VALIDATE_FORM_OBJECT = "VALIDATE_FORM_OBJECT";

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
		// validate required fields...
		var self = this, valid = true;
			$reqFormGroups = self.$view.find(".required-asterisk").parents(".form-group").get().reverse();
		$.each($reqFormGroups, function(index, group) {
			var formObj = new FormObject($(group));
			switch (formObj.type) {
				case "text":
					valid &= formObj.validate();
					break;

				default:
					// requires custom validation
					var event = {type:FormView.VALIDATE_FORM_OBJECT, obj:formObj};
					self.fire(event);
					valid &= event.valid;
					break;
			}
		});

		if (valid)
			this.fire({type:FormView.SUBMIT});
	};

	return FormView;
});
