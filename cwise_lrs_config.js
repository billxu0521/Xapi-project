/************************
 * CWISE XAPI CONFIG
 * set endpoint
 * set auth
 */
 
/*function Config() {
	"use strict";
}

Config.endpoint = "http://exp-lrs-2015.dlll.nccu.edu.tw:15180/xAPI/";
Config.user = "wyfan";
Config.password = "la2391";
Config.actor = { "mbox":"pulipuli.chen@gmail.com", "name":"pudding" };
 */
	/*
	 * LRS CONFIG
	 */
	$.CWISE_LRS_CONFIG = {
        "endpoint" : "http://140.119.61.113:1510/xAPI/",
        "auth" : "Basic " + toBase64('cwise4user:cwise4pass')
	};
	
	
	/*
	 * USER DEFAULT EMAIL
	 */
	$.CWISE_ACTOR_CONFIG = {
	
		"mbox" : "mailto: dlll@example.com"
	};
	

