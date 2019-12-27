# Xapi  Injection 
Xapi偵測事件

1. 活動開始，記錄使用者 start_exp("使用者名字")
2. 活動結束 end_exp()

=====================

#必要的檔案
##共用檔案
1. lrs_config.js
2. 2.5.3-crypto-sha1.js
3. base64.js
4. cache.js
5. xapi_inject_lib.js
6. xapi.js
7. xapiwrapper.min.js
8. verb_config.js
9. object_config.js

##定義檔
config/自定義網址.js


###lrs_config.js 設定
```javascript
$.LRS_CONFIG = {
        "endpoint" : "xAPI伺服器",
        "auth" : "Basic " + toBase64('認證過的帳密')
	};
	/*
	 * USER DEFAULT EMAIL
	 */
	$.ACTOR_CONFIG = {
		"mbox" : "信箱"
	};
```


###xapi_inject_lib.js 設定
```javascript
window.send_log = function (_event_type,_user_name,_event_key,_event_content) {
    var _username = _user_name;
    var _object_url = sessionStorage.getItem('動詞受體網址');
    //設定目前使用者
    //f$.xAPI_setUsername(_username);
    //送出登入記錄->lrs
    var _verb_id = "動詞"; //LOGIN
    var _object_id = _object_url;
    var _url=window.top.location.href;
    var _params = {
        verb_id: _verb_id,
        object_id: _object_id,
        url: _url,
        extensions:{
            '自定義網址':
            {
                "擴充用key":值,
               	"擴充用key":值
            }
        }   
    }
    $.xAPI_send(_params);
};
```

