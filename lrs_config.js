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
	$.LRS_CONFIG = {
        "endpoint" : "https://exp-lrs-server.dlll.nccu.edu.tw/xAPI/",
        "auth" : "Basic " + toBase64('cwise4user:cwise4pass')
	};
	
	
	/*
	 * USER DEFAULT EMAIL
	 */
	$.ACTOR_CONFIG = {
	
		"mbox" : "mailto: dlll@example.com"
	};
	

