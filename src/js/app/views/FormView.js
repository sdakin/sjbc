define(["jquery"], function($) {

	function FormView($initView) {
		var self = this;
		self.$view = $initView;

		// set up "other" fields
		$("input[value='other']").click(function(e) { self.handleOtherClick(e); });
	}

	FormView.prototype.handleOtherClick = function(e) {
		var $checkbox = $(e.currentTarget), checked = !$checkbox.is(":checked");
		var $input = $checkbox.parents(".checkbox").find('input[type="text"]');
		if (checked)
			$input.css("display", "none");
		else
			$input.css("display", "block");
	};

	return FormView;
});
