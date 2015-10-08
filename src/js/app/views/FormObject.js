define(["jquery"], function($) {

	function FormObject($initView) {
		this.$view = $initView;
		this.type = "unknown";
		var children = this.$view.children();
		if (children.length == 2 &&
			$(children[0]).prop("tagName") === "LABEL" &&
			$(children[1]).prop("tagName") === "INPUT" &&
			($(children[1]).attr("type") === "text" || $(children[1]).attr("type") === "email"))
		{
			this.type = "text";
			this.value = $(children[1]).val();
		}
	}

	FormObject.prototype.validate = function() {
		var valid = false;
		if (this.type === "text") {
			var $input = this.$view.find("input");
			if (this.value.length > 0) {
				$input.removeClass("required-error");
				valid = true;
			} else {
				$input.addClass("required-error");
			}
		}
		return valid;
	};

	return FormObject;
});
