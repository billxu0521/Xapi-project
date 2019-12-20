 (function ($) {
	//console.log("3. cwise_object_config.js");	
	$.cwise_object_config = {
	    "http://dlll-xapi.nccu.edu.tw/activities/lms":{
			//display: {"en-US" : _verb_display}
			//display: {"en-US" : "LMS"}
			name:{"en-US":"LMS"},
			description:{"en-US":"Learning Management System DLLL CWISE"},
			//moreInfo: "http://dev-cwise.dlll.nccu.edu.tw/webapp/preview.html?projectId=400",
			// extensions: {
				// "http://dev-cwise.dlll.nccu.edu.tw/webapp/preview.html?projectId=400": 
				// {
					 // node: "0.0"  
				// }
			// }
		},
		"http://adlnet.gov/expapi/activities/course": {
			//id: "",
			//display: {"en-US" : _verb_display}
			//display: {"en-US" : "Course"}
			name:{"en-US":"Course"},
			description:{"en-US":"A course represents an entire “content package” worth of material. The largest level of granularity. Unless flat, a course consists of multiple modules."}
		},
		"http://adlnet.gov/expapi/activities/lesson": {
			name:{"en-US":"Lesson"},
			description:{"en-US":"A lesson is learning content that may or may not take on the form of a SCO (formal, tracked learning). A lesson may stand-alone or may be part of a larger course."},
			moreInfo: "http://dev-cwise.dlll.nccu.edu.tw/webapp/preview.html?projectId=400"
		}
		
		// "lms":{
		    // id: "http://dlll-xapi.nccu.edu.tw/activities/lms",
			// //display: {"en-US" : _verb_display}
			// display: {"en-US" : "LMS"}
		// },
		// "course": {
			// id: "http://adlnet.gov/expapi/activities/course",
			// //display: {"en-US" : _verb_display}
			// display: {"en-US" : "Course"}
		// }
		
	};
	
	//*
	 //* $.cwise_getVerbDisplay("login");
	//console.log("2. cwise_object_config.js");	

	$.cwise_getObjectNameDescription = function (_object_id) {
		var _id;
		 //console.log("cwise_object_config.js");	
		if (typeof($.cwise_object_config[_object_id]) !== "undefined") {
			_id = $.cwise_object_config[_object_id].id;
		}
		
		var _name;
		 //console.log("cwise_object_config.js");	
		if (typeof($.cwise_object_config[_object_id]) !== "undefined") {
			_name = $.cwise_object_config[_object_id].name;
		}
		
		var _description;
		if (typeof($.cwise_object_config[_object_id]) !== "undefined") {
			_description = $.cwise_object_config[_object_id].description;
		}
		
		// var _moreInfo;
		 //if (typeof($.cwise_object_config[_object_id]) !== "undefined") {
			// _moreInfo = $.cwise_object_config[_object_id].moreInfo;
		// }
		
		var _extensions;
		if (typeof($.cwise_object_config[_object_id]) !== "undefined") {
			_extensions = $.cwise_object_config[_object_id].extensions;
		}
		
		var _definition;
		if (typeof($.cwise_object_config[_object_id]) !== "undefined") {
			_definition = $.cwise_object_config[_object_id].definition;
		}
		
		var _NameDescription = {
			name: _name,
			description: _description,
			//moreInfo: _moreInfo,
			//definition: _definition
			extensions: _extensions
		};
		
		//var NameDescription=+_description;
		//console.log(_name);
		//console.log(_description);
		//console.log(_NameDescription);	
		return _NameDescription;
	};
	
	
	//*
	// * $.cwise_getObject("login", "display");
	// * $.cwise_getObject("login", "name");
	 //* $.cwise_getObject("login", "id");
	
	$.cwise_getObject = function (_object_id, _field) {
		var _display;
		
		if (typeof($.cwise_object_config[_object_id]) !== "undefined" 
			&& typeof($.cwise_object_config[_object_id][_field]) !== "undefined") {
			_display = $.cwise_object_config[_object_id][_field];
		}
		
		return _display;
	};
 
  })(jQuery);
  