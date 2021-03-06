﻿/*
 * PROJECT:  CWISE XAPI
 * VERSION:  0.01
 * AUTHOR:  20150801 DLLL wy
 * LINK:  http://dlll.nccu.edu.tw
 *
 * This script use to record and send data to DLLL xapi LRS
 */
 
/*
 * Sign in btn and get username to save in cookie
 * get j_username
 */
 var _WHY_getVerbDisplay_is_not_a_function_T_T = function () {
	if (typeof($.getVerbDisplay) !== "function") {
		$.getScript("https://billxu0521.github.io/Xapi-project/verb_config.js", function(){
			console.log(" loaded	verb_config.js");
						
		});
	}
};

 var _WHY_getObjectNameDescription_is_not_a_function_T_T = function () {
	if (typeof($.getObjectNameDescription) !== "function") {
		$.getScript("https://billxu0521.github.io/Xapi-project/object_config.js", function(){
			
			console.log("loaded	object_config.js");
						
		});
	}
};

 var _WHY_LRS_CONFIG_is_not_correct_T_T = function () {
	if (typeof($.LRS_CONFIG) === "undefined") {

		$.getScript("https://billxu0521.github.io/Xapi-project/lrs_config.js", function(){
			
			console.log("loaded	lrs_config.js");
						
		});
	}
};

(function ($) {
	_WHY_getVerbDisplay_is_not_a_function_T_T();
	_WHY_getObjectNameDescription_is_not_a_function_T_T();
	_WHY_LRS_CONFIG_is_not_correct_T_T();
	var _site=window.top.location.href;
	/* **********************
	 * set目前使用者名稱並存入cookie
	 * set username and save in cookie
	 * input (str) _username 
	 * ***********************/
	$.xAPI_setUsername = function(_username){
		
		sessionStorage.setItem('xapi_username',_username);
		//Cookies.get('username', _username, { path: '/' });//Save username in cookie
	
	};//$.cwise_xAPI_setUsername = function(_username){

	/* **********************
	 * 取得目前使用者名稱，若無則設定為guest
	 * get username 
	 * return _username
	 * ***********************/	
	$.xAPI_getUsername = function(){
	
		//var _username = Cookies.get('username');
		var _username = sessionStorage.getItem('xapi_username');
		if ( _username == null ){
			_username = "guest";
			//Cookies.get('username', _user, { path: '/' });//Save username in cookie
		}
		//alert ("Now is " +Cookies.get('username'));
		return _username;
	};//$.cwise_xAPI_getUsername = function(){
	
	/**
	 * @author 布丁 20150909
	 */ 
	$.getCourseURL = function () {
		return window.top.location.href;
	};
	
	// --------------------------------------------------------------------------------------------------
	
	/* **********************
	 * 送出xapi學習歷程
	 * send user portfolio 
	 * input (url)verb_id | (url)object_id | object_description
	 *
	 * ***********************/
	//$.cwise_xAPI_send = function (_verb_id, _object_id, _object_description) {
	
	/**
	 * 送出行為歷程資料給LRS
	 *
	 * var _params = {};

     * _params.verb_id = "login";

     * _params.object_id = "login";
	 *
	 * @params _params = {
	 *	 verb_id: "string", // 動詞ID, 請參考xxxxx檔案
	 *   object_id: "string", // 受詞ID
	 *   note: "string", // 其它資料，optional
	 * }
	 */
	$.xAPI_send = function (_params) {
	
		var _verb_id;
		if (typeof(_params.verb_id) === "string") {
			_verb_id = _params.verb_id;
			console.log("0.verb_id", _verb_id);			
		}
		
		//var _object_id = "default"; //20151112
		var _object_id;		
		if (typeof(_params.object_id) === "string") {
			_object_id = _params.object_id;
			console.log("0.object_id", _object_id);				
		}
	
		var _url= _params.url;
		//console.log("moreInfo:"+_params.moreInfo);
		
		var _currentNode=_params.currentNode;
		//var _cookieNode=Cookies.get('currentNode');
		
		// var _runId= _params.runId;
		
		// var _pageX= _params.pageX;
		// var _pageY= _params.pageY;
		// var _button= _params.button;
		
		// var _exp_time= _params.exp_time;
		// var _object=_params.object;
		// var _structure=_params.structure;
		// var _density=_params.density;
		// var _float_sink=_params.float_sink;
		// var _weight=_params.weight;
		// var _volume=_params.volume;
		// var _under_volume=_params.under_volume;
		// var _liquid_density=_params.liquid_density;
		// var _buoyancy=_params.buoyancy;
		
		// var _verb_annotaion=_params.verb_annotation;
		
		// var _sys_annotaion=_params.sys_annotation;
		
		//取得lrs設定檔
		var conf = $.LRS_CONFIG ;
		
		//------------------------------------------------------------
		// var conf = {
	
			// "endpoint" : "http://exp-lrs-2015.dlll.nccu.edu.tw:15180/xAPI/",  
		
			// "auth" : "Basic " + toBase64('cwise4user:cwise4pass')

		// };
		//--------------------------------------------	
			
		//ADL.XAPIWrapper.updateAuth(conf.endpoint, conf.user, conf.password); //改變設定檔
		ADL.XAPIWrapper.changeConfig(conf); //set設定檔	
		console.log("1.set conf");
		
		/** actor
		 * name string | mbox mailto:
		 **/
		var _user_id = $.xAPI_getUsername();
		var _default_mail = "mailto: dlll@example.com"; //信箱設定!!
		//var _default_mail = $.CWISE_ACTOR_CONFIG; 
		
		var _actor = {
			"name": _user_id,
			"mbox": _default_mail
		};
		//_actor = { "mbox":"demo@gmail.com", "name":"demo" };
		//_actor_JSON = JSON.parse(_actor);
		console.log("1-1.actor", _actor.name, _actor.mbox);
		
		/* verb
		 * verb_id url | display 
		 */
		
		var _verb_display = $.getVerbDisplay( _verb_id );
		
        console.log("2.verb_display", _verb_display, _verb_id);		
		//"id":"http://exp-lrs-2015.dlll.nccu.edu.tw:15180/xAPI/verbs/attempted",
		//"display":{"en-US":"tested"}

		
		var _verb = {
			"id": _verb_id,
			"display": _verb_display
		};
		if (_verb_display !== "undefined") {
			_verb.display = _verb_display;
		}
		console.log("1-2.verb", _verb.id, _verb.display);

		
		/*object
		 * object_type type | Activity ID object_id | 
		 */
		var _type = "type:text";
		
		if (typeof(_object_description) === "number") {
			_type = "type:number";
		}
		var _object_display = $.getObjectNameDescription( _object_id );
        console.log("3-2.object_display", _object_display, _object_id);	
		//console.log(_extensions);
		
		//var _extensions = {
			 // "http://dev-cwise.dlll.nccu.edu.tw/webapp/preview.html?projectId=400": {
					 // "node": "node0.0"
					 
					  
			//}
		//};
		//var _extensions_url = "\"http://dev-cwise.dlll.nccu.edu.tw/webapp/preview.html?projectId=400\"" ;
		//var _node = "0.0";
		
		//_extensions=JSON.stringify(_extensions);  
		// '"'+ ___ + '"'
		//console.log(_extensions_url);
		var _obj = {
			"id": _object_id,	
			"definition": {
				"name": _object_display.name,
				"description": _object_display.description,
				"moreInfo": _url,
				"extensions": 			
					{
				
					"http://dspace.ccstw.nccu.edu.tw/": {
					  "url": _url,
					  "node": _currentNode,
					  "runId": _params.runId,
					  "verb_annotation": _params.verb_annotation

					  }
					  
					//""+_url+"":{"node":""+_currentNode+""}
				}
			},
			"objectType": "Activity"
		};
		console.log("3._obj", _object_id);
		 
		var _result = {
			"response": "",
					"extensions": _params.extensions
		}

		console.log(_site);
		//----stmt 測試用-------------			
		var stmt = {
			"actor" : _actor,
			"verb" : _verb,
			/*"object" : {
				"id" : "http://adlnet.gov/expapi/activities/question",
				"display" : {"en-US" : "Tested"}
			}*/
			"object" : _obj,
			//"object" : _object_id
			
			"result": _result
				
			/*
			{
				"response": "201511241706",
				
				//"response": _response,
				"extensions": {
						"http://dspace.ccstw.nccu.edu.tw/": 
						{
							question_01:"123",
							answer_01: "abc",
							question_02:"測試",
							answer_02: "abc4",
							note: "blablabla..."
						}
				}
				
			}
			*/
			
		};
		
		//---------打包-----------------
		setTimeout(function () {
			var resp_obj = ADL.XAPIWrapper.sendStatement(stmt);
			//console.log(_response);
			console.log("4.send");
			ADL.XAPIWrapper.log("[" + resp_obj.id + "]: " + resp_obj.xhr.status + " - " + resp_obj.xhr.statusText);
		}, 0);
	
	};//$.cwise_xAPI_send = function (_verb_id, _object_id, _object_description) {
 })(jQuery);
 

