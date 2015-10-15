requirejs.config({
    "baseUrl": "/static/js",

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

define(["bootstrap"], function() {
    "use strict";

	var inventory = [
		{
	        "title": "Blue/Black BMX Shogun",
	        "description": "Front wheel with radial spokes. 20\" wheels. Ideal for 19\"-25\" inseam",
	        "price": "80",
	        "image": "00606_fbUSz2LVlV4.jpg"
	    },

	    {
	        "title": "Blue diamondback viper",
	        "description": "small, 2 sturdy V-Breaks. 20\" wheels, complete w/ kickstand",
	        "price": "60",
	        "image": "00F0F_1RLoTfHkO20.jpg"
	    },

	    {
	        "title": "Pink Specialized Hotrock Girl’s Bike",
	        "description": "small girl's frame, 20 inch wheels, 6 speed",
	        "condition": "very good",
	        "price": "40",
	        "image": "01010_2ANOcM6YUSX.jpg"
	    },

	    {
	        "title": "Pink Pacific Windstorm",
	        "description": "small girl's frame, 20 inch wheels, 5 speed. Perfect Christmas present for a family on a budget!",
	        "condition": "very good",
	        "price": "40",
	        "image": "pink-pacific-windstorm.jpg"
	    },
	];

	var $bikeTemplate = $("#storeTemplates").find(".storeBike"), $inventory = $("#storeInventory"),
		bikeIndex = 0;
	inventory.forEach(function(bike) {
		var $bike = $bikeTemplate.clone();
		$bike.attr("data-index", bikeIndex++);
		$bike.find("img").attr("src", "/static/img/store/bikes/" + bike.image).click(onBikeSelected);
		$bike.find(".storeBikeTitle").text(bike.title + " – $" + bike.price).click(onBikeSelected);
		$bike.click(onBikeSelected);
		$inventory.append($bike);
	});

	function onBikeSelected(e) {
		var $bike = $(e.target);
		var index = $bike.attr("data-index");
		if (!index) {
			$bike = $bike.parents(".storeBike");
			index = $bike.attr("data-index");
		}
		var bikeData = inventory[index];
		var $dlg = $('#dlgBikeDetails');
		$dlg.find(".modal-title").text(bikeData.title);
		$dlg.find(".bikePrice").find("span").text("$" + bikeData.price + ".00");
		$dlg.find(".bikeImage").find("img").attr("src", "/static/img/store/bikes/" + bikeData.image);
		$dlg.find(".bikeDescription").text(bikeData.description);
		$dlg.modal();
	}
});
