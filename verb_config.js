 (function ($) {
 
	$.cwise_verb_config = {
	    "http://purl.org/xapi/adl/verbs/logged-in":{
		    //id: "login",
			//display: {"en-US" : _verb_display}
			display: {"en-US" : "logged-in"}
		},
		"https://w3id.org/xapi/adl/verbs/logged-out": {
			display: {"en-US" : "logged-out"}
		},
		"http://adlnet.gov/expapi/verbs/progressed": {
			display: {"en-US" : "progressed"}
		},
		"http://adlnet.gov/expapi/verbs/answered": {
			display: {"en-US" : "answered"}
		},
		"http://adlnet.gov/expapi/verbs/voided": {
			display: {"en-US" : "voided"}
		},
		"http://adlnet.gov/expapi/verbs/passed": {
			display: {"en-US" : "passed"}
		},	
		"http://adlnet.gov/expapi/verbs/attempted": {
			display: {"en-US" : "attempted"}
		},
		"http://adlnet.gov/expapi/verbs/initialized": {
			display: {"en-US" : "initialized"}
		},
		"http://adlnet.gov/expapi/verbs/preferred": {
			display: {"en-US" : "preferred"}
		},
		"http://adlnet.gov/expapi/verbs/exited": {
			display: {"en-US" : "exited"}
		},
		"https://w3id.org/xapi/dod-isd/verbs/click":{
			display: {"en-US" : "click"}
		}
	};
	
	/**
	 * $.cwise_getVerbDisplay("login");
	 */
	$.cwise_getVerbDisplay = function (_verb_id) {
		var _display;
		console.log("cwise_verb_config.js");	
		if (typeof($.cwise_verb_config[_verb_id]) !== "undefined") {
			_display = $.cwise_verb_config[_verb_id].display;
		}
		
		return _display;
	};
	
	/**
	 * $.cwise_getVerb("login", "display");
	 * $.cwise_getVerb("login", "name");
	 * $.cwise_getVerb("login", "id");
	 */
	$.cwise_getVerb = function (_verb_id, _field) {
		var _display;
		
		if (typeof($.cwise_verb_config[_verb_id]) !== "undefined" 
			&& typeof($.cwise_verb_config[_verb_id][_field]) !== "undefined") {
			_display = $.cwise_verb_config[_verb_id][_field];
		}
		
		return _display;
	};
 
  })(jQuery);