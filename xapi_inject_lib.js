/**
 * @author BillXu
 * https://billxu0521.github.io/Xapi-project/ga_inject_lib.js
 */

/**
 * 使用者ID的欄位 "X_DIMENSION1"
 * @type String
 */
if (typeof(X_DIMENSION) === "undefined") {
    X_DIMENSION = "X_DIMENSION1";
}

/**
 * 只有停留多久才記錄
 * 單位：秒
 * @type Integer
 */
if (typeof(X_STAY_SAVE_MIN_INTERVAL) === "undefined") {
    X_STAY_SAVE_MIN_INTERVAL = 3;
}

/**
 * 加上X_DEBUG的設定，以方便未來開關
 * @type Boolean
 * @author Pudding 20170203
 */ 
if (typeof(X_DEBUG) === "undefined") {
    X_DEBUG = true;
}


USER_IP = undefined;
// -------------------------------------------------

/**
 * 初始化載入ga
 * @param {function} _callback
 * @returns {undefined}
 */
window.x_setup = function (_callback) {
    USER_IP = sessionStorage.getItem('USERIP');
	_x_X_CONSOLE_LOG("1. 在插入XAPI之前");
	
    
	_x_X_CONSOLE_LOG("2. 插入XAPI了");
    
    var _user = get_x_user_id();
	
	_x_X_CONSOLE_LOG("3. XAPI設定了");
    
    auto_x_set_x_user_id(function () {
		_x_X_CONSOLE_LOG("4. User ID設定好了");
		
        /**
         * 初始化載入
         */
        _x_X_CONSOLE_LOG("xAPI injected. User: " + _user);
        send_log('page_enter', _user, 'page','page');

        if (typeof(_callback) === "function") {
            $(function () {
                setTimeout(function () {
                    setTimeout(function () {
                        //console.log("觸發一次捲動");
                        $(window).scroll();
                    }, 100);
                    _callback();
                }, 1000);
            });
        }
    });
};

/**
 * 取得使用者ID資料
 * 
 * 如果window.name沒有資料，則會回傳anonymous
 * 不然會回傳window.name的資料
 * 
 * @returns {window.name|window.get_x_user_id|DOMString|String}
 */
var get_x_user_id = function(){
	var _win = window;
	if (typeof(_win.top) === "object") {
		_win = _win.top;
	}
	
    if (_win.name === null 
            || _win.name === undefined 
            || _win.name.trim() === ""){
      return "anonymous";
    } 
    else {
        return _win.name;
    }    
};

/**
 * 取得連線者IP資料
 * 
 * 
 * 
 */
var get_x_user_ip = function(){
    $.getJSON('http://ipinfo.io', function(data){
        //console.log(data['ip']);
        _x_X_CONSOLE_LOG("get user ip: " + data['ip']);
        
        if(data !== null){
            return String(data['ip']);
        }else if(data === null){
            return "no ip";
        }
    });
};




window.auto_x_set_x_user_id = function(_callback){
	USER_IP = sessionStorage.getItem('USERIP');
    //console.log(USER_IP);
	_x_X_CONSOLE_LOG("3.1. 開始 auto_x_set_x_user_id");
	
    if (get_x_user_id() === "anonymous") {
		_x_X_CONSOLE_LOG("3.2. anonymous");

        _x_X_CONSOLE_LOG("3.3. get user_id");
        //console.log(USER_IP);
        if(USER_IP == '' || USER_IP == undefined || USER_IP == null){
            USER_IP = get_x_user_time_id();
        }
        //console.log(USER_IP);
        //USER_IP = String(data['ip']);
        set_x_user_id(USER_IP);
        _x_X_CONSOLE_LOG("Set user id in ip: " + USER_IP);
        if (typeof(_callback) === "function") {
            _x_X_CONSOLE_LOG("3.4. ok");
            _callback();
        }

        /*
        getJSONP('https://ipinfo.io', function(data){
			_x_X_CONSOLE_LOG("3.3. https://ipinfo.io");
			USER_ID = get_x_user_time_id();
            //USER_IP = String(data['ip']);
            set_x_user_id(USER_IP);
            _x_X_CONSOLE_LOG("Set user id in ip: " + USER_IP);
            if (typeof(_callback) === "function") {
				
				_x_X_CONSOLE_LOG("3.4. ok");
                _callback();
            }
        });*/
    }
    else {
        if (typeof(_callback) === "function") {
            _callback();
        }
    }
};

window.getJSONP = function (_url, _callback) {
	$.ajax({
	  url: _url,
	  cache: false,
	  dataType: "jsonp",
	  success: _callback,
	  contentType: "application/json; charset=utf-8",
	  error: function (request, status, error) { alert(status + ", " + error); }
	});
};

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}


Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
};

var _get_time = function () {
    var d = new Date;
    d = [
        //d.getFullYear(),
        //(d.getMonth()+1).padLeft(),
        //d.getDate().padLeft(),
        d.getHours().padLeft(),
        d.getMinutes().padLeft(),
        d.getSeconds().padLeft()
        ].join('');
    return d;
};

USER_TIMER = 0;


/**
 * 利用unixtime取得使用者唯一值 紀錄8小時
 * @return {String} cache_user
 */
window.get_x_user_time_id = function () {
    let dateTime = Date.now();
    dateTime = Math.floor(dateTime / 1000);
    let cache_user = localStorage.getItem("user");
    if(cache_user){
        let timestr = cache_user.split('_');
        let time = parseInt(timestr[1]);
        let dur = Math.floor(dateTime - time);
        if(dur > 28800){
            localStorage.setItem("user", "user_"+dateTime);
            cache_user = localStorage.getItem("user");
            console.log(cache_user);
        }
    }else{
        localStorage.setItem("user", "user_"+dateTime);
        let cache_user = localStorage.getItem("user");
        
    }
    return cache_user
};


/**
 * 將ID資訊記錄到視窗屬性中
 * @param {String} _customUserId
 */
window.set_x_user_id = function (_customUserId){
    
    var date = new Date();
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    date = [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
    
    if (typeof(_customUserId) === "undefined") {
        _customUserId = get_x_user_id();
    }
    _customUserId = _customUserId.trim();
    _customUserId = _customUserId + "-" + date;
    
    _x_X_CONSOLE_LOG("Set user id: " + _customUserId);
   
   
    var _win = window;
	if (typeof(_win.top) === "object") {
		_win = _win.top;
	}
   
    if (_win.name !== _customUserId) {
        //ga("send", "event", "end_x_exp", _win.name);
    }
   
    _win.name = _customUserId;
    
    //ga('create', GA_TRACE_CODE, {'userId': _customUserId});
    //ga('set', 'userId', _customUserId); // 使用已登入的 user_id 設定 User-ID。
    //ga('set', X_DIMENSION, _customUserId); 
    
    // 改用統一取得header的方式
    var _name_header = _x_get_element_name();
    //ga("send", "event", "start_x_exp", _name_header);
    
};

window.set_x_user_id_by_trigger = function (_trigger_selector, _user_id_getter) {
	if ($(_trigger_selector).length > 0) {
		set_x_user_id(_user_id_getter());
	}
};

window.start_x_exp = function (_customUserId) {
    return window.set_x_user_id(_customUserId);
};


/**
 * 結束本次實驗，重置資訊
 */
window.fin_x_exp = function (){
    //var _time = (new Date()).getTime() - USER_TIMER;
    //_time = parseInt(_time / 1000, 10);
    
	var _hash = location.hash;
	if (_hash !== "") {
		_hash = "#" + _hash;
	}
	
    var _name = get_x_user_id() + ": " + _get_time() + ": " + window.location.pathname + window.location.search + _hash;
	
	var _win = window;
	if (typeof(_win.top) === "object") {
		_win = _win.top;
	}
	
    _win.name = '';
    //_x_X_CONSOLE_LOG('end_x_exp: ' + _name + ", sec: " + _time);
    _x_X_CONSOLE_LOG('end_x_exp: ' + _name);
    
    //ga("send", "event", "end_x_exp", _name);
    send_log("event", _name, "end_x_exp","end_x_exp");
    auto_x_set_x_user_id();
};

window.end_x_exp = function () {
    return window.fin_x_exp();
};


// -------------------------------------------------------------

/**
 * 偵測滑鼠移上去的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String|Function} _name
 */
window.x_mouse_over_event = function (_selector, _event_type, _name) {
    var _event_key = 'mouse_over';
    $(_selector).mouseover(function () {
        var _name_data = _x_get_element_name($(this), _event_type, _name);
        
        _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
        //ga("send", "event", _event_type, _name_data, _event_key);   
        send_log(_event_type, _name, _event_key,_name_data);
    });
};

/**
 * 滑鼠移入跟移除的功能
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_mouse_over_out_event = function(_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_mouse_over_out_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    if (_x_selector_length_caller(_selector, window.x_mouse_over_out_event, _event_type, _name) === false) {
        return;
    }
    
    var _id = X_TIMER.length;
    X_TIMER.push(false);
    var _event_key = "mouse_over_out";
    var _classname = _x_get_event_classname(_event_key, _event_type);

    var _obj = $(_selector + ":not(." + _classname + ")");
    _obj.mouseover(function() {
        var _name_data = _x_get_element_name(_obj, _selector, _name);
        X_TIMER[_id] = (new Date()).getTime();
        _x_X_CONSOLE_LOG([_event_type, _event_key + ": start", _name_data, X_TIMER[_id]]);
    });
    
    _obj.mouseout(function() {
        var _name_data = _x_get_element_name(_obj, _selector, _name);
        //_name_data = window.location.pathname + ": " + _name_data;
        var _interval = ((new Date()).getTime() - X_TIMER[_id])/1000;
        _interval = parseInt(_interval, 10);
        if (_interval > X_STAY_SAVE_MIN_INTERVAL) {
            _x_X_CONSOLE_LOG([_event_type, _event_key +  + ": end", _name_data, _interval, "記錄"]);
            //ga("send", "event", _event_type, _name_data, _event_key, _interval);
            send_log(_event_type, _name, _event_key,(_name_data + _interval));
        }
        else {
            _x_X_CONSOLE_LOG([_event_type, _event_key + ": end", _name_data, _interval, "不記錄"]);
        }
        X_TIMER[_id] = false;
    });
};

var _x_get_event_classname = function (_event_key, _event_type) {
    var _classname = _event_key + _event_type;
    _classname = _classname.split(":").join("");
    _classname = _classname.split(";").join("");
    _classname = _classname.split(" ").join("");
    return _classname;
};

/**
 * 滑鼠抓起跟放開的功能
 * https://www.w3schools.com/jsref/event_ondrag.asp
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_mouse_drag_event = function(_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_mouse_drag_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    if (_x_selector_length_caller(_selector, window.x_mouse_drag_event, _event_type, _name) === false) {
        return;
    }
    
    var _id = X_TIMER.length;
    X_TIMER.push(false);
    var _event_key = "drag";
    var _classname = _x_get_event_classname(_event_key, _event_type);
    
    var _obj = $(_selector + ":not(." + _classname + ")");
    _obj.on("dragstart", function() {
        var _name_data = _x_get_element_name(_obj, _selector, _name);
        X_TIMER[_id] = (new Date()).getTime();
        _x_X_CONSOLE_LOG([_event_type, _event_key + ": start", _name_data, X_TIMER[_id]]);
    });
    
    _obj.on("dragend", function() {
        var _name_data = _x_get_element_name(_obj, _selector, _name);
        var _interval = (new Date()).getTime() - X_TIMER[_id];
        _interval = parseInt(_interval/1000, 10);
        _x_X_CONSOLE_LOG([_event_type, _event_key +  + ": end", _name_data, _interval, "記錄"]);
        //ga("send", "event", _event_type, _name_data, _event_key, _interval);
        send_log(_event_type, _name, _event_key,(_name_data + _interval));
        X_TIMER[_id] = false;
    });
};

/**
 * 偵測滑鼠點擊的事件
 * @param {String} _selector CSS的選取器
 * @param {String} _event_type GA event type (field name)
 * @param {String} _name GA other information
 */
window.x_mouse_click_event = function (_selector, _event_type, _name) {
    
    try {
        if ($(_selector).length === 0) {
            setTimeout(function () {
                window.x_mouse_click_event(_selector, _event_type, _name);
            }, 1000);
            return;
        }
    }
    catch (e) {
        console.log("ERROR SELECTOR: " + _selector);
    }
    
    var _event_key = 'mouse_click';
    var _classname = _x_get_event_classname(_event_key, _event_type);
    
    $(_selector + ":not(." + _classname + ")").click(function () {
        //var _name_data = _x_get_element_name(this, _selector, _name);
        //_x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
        //ga("send", "event", _event_type, _name_data, _event_key);
        x_mouse_click_event_trigger(this, _selector, _name, _event_type, _event_key);
    }).addClass(_classname);
};

window.x_mouse_click_event_trigger = function (_obj, _selector, _name, _event_type, _event_key) {
    var _name_data = _x_get_element_name(_obj, _selector, _name);
    _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
    send_log(_event_type, _name, _event_key,_name_data);
};

/**
 * 偵測滑鼠按下的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_mouse_down_event = function (_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_mouse_down_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    var _event_key = 'mouse_down';
    var _classname = _x_get_event_classname(_event_key, _event_type);

    $(_selector + ":not(." + _classname + ")").mousedown(function () {
        var _name_data = _x_get_element_name(this, _selector, _name);
        _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
        send_log(_event_type, _name, _event_key,_name_data);
        //ga("send", "event", _event_type, _name_data, _event_key);
    }).addClass(_classname);
};

/**
 * 偵測滑鼠按下的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_send_event = function (_event_type, _name) {
    var _event_key = 'send_event';
    var _name_data = _x_get_element_name(document, "", _name);
    _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
    //ga("send", "event", _event_type, _name_data, _event_key);
    send_log(_event_type, _name, _event_key,_name_data);
};

/**
 * 偵測滑鼠按下的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_mouse_touch_event = function (_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_mouse_touch_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    var _event_key = 'touch';
    var _classname = _x_get_event_classname(_event_key, _event_type);

      $(_selector + ":not(." + _classname + ")").on("touchstart",function () {
          var _name_data = _x_get_element_name(this, _selector, _name);

          _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
          //ga("send", "event", _event_type, _name_data, _event_key);
          send_log(_event_type, _name, _event_key,_name_data);
      }).addClass(_classname);
};

/**
 * 偵測表單改變的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_input_change_event = function (_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_input_change_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    var _event_key = 'input_change';
    var _classname = _x_get_event_classname(_event_key, _event_type);

    $(_selector + ":not(." + _classname + ")").change(function () {
        var _input_name = $(this).attr("name");
        var _name_data = _x_get_element_name(this, _selector, _input_name + "=" + $(this).val());    
        _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
        //ga("send", "event", _event_type, _name_data, _event_key);
        send_log(_event_type, _name, _event_key,_name_data);
    }).addClass(_classname);
};

/**
 * 偵測表單改變的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_input_keydown_enter_event = function (_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_input_keydown_enter_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    var _event_key = 'input_keydown_enter';
    var _classname = _x_get_event_classname(_event_key, _event_type);

    $(_selector + ":not(." + _classname + ")").keydown(function (_e) {
        //console.log([$(this).prop("tagName").toLowerCase(), _e.keyCode]);
        if ($(this).prop("tagName").toLowerCase() === "input" && _e.keyCode === 13) {
            var _input_name = $(this).attr("name");
            var _name_data = _x_get_element_name(this, _selector, _input_name + "=" + $(this).val());
            
            _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
            //ga("send", "event", _event_type, _name_data, _event_key);
            send_log(_event_type, _name, _event_key,_name_data);
        }
    }).addClass(_classname);
};

/**
 * 偵測表單送出的事件
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_submit_event = function (_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_submit_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    if (_x_selector_length_caller(_selector, window.x_submit_event, _event_type, _name) === false) {
        return;
    }
    var _event_key = "form_submit";
    var _classname = _x_get_event_classname(_event_key, _event_type);
    
    var _obj = $(_selector);
    var _tag_name = _obj.prop("tagName").toLowerCase();
    
    if (_tag_name !== "form") {
        var _form = _obj.parents("form:first");
        if (_form.length === 0) {
            return;
        }
        else {
            _obj = _form;
        }
    }
    
    window.DENY_X_SUBMIT = true;
    _obj.submit(function () {
        if (window.DENY_X_SUBMIT === false) {
          return;
        }
        // 蒐集form裡面的資料
        if (_name === undefined) {
             var _ary = _obj.serializeArray();
             var _data = {};
             for (var _i = 0; _i < _ary.length; _i++) {
                 var _name = _ary[_i].name;
                 if (_name === "__RequestVerificationToken") {
                     continue;
                 }
                 var _value = _ary[_i].value;
                 _data[_name] = _value;
             }
            _name = JSON.stringify(_data).trim();
            
            if (_name === "") {
                _name = undefined;
            }
        }
        
        var _name_data = _x_get_element_name(this, _selector, _name);
        
        _x_X_CONSOLE_LOG([_event_type, _name_data, _event_key]);
        //ga("send", "event", _event_type, _name_data, _event_key);
        send_log(_event_type, _name, _event_key,_name_data);
        var _form = $(this);
        if (_form.prop("tagName").toLowerCase() !== "form") {
            _form = _form.parents("form:first");
        }
        setTimeout(function () {
            window.DENY_X_SUBMIT = false;
            _form.submit();
        }, 1000);
        //return false ;
    });        
};



/**
 * 偵測畫面捲動的事件
 * 可偵測物件是否出現在畫面中，並計算時間
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_mouse_scroll_in_out_event = function(_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_mouse_scroll_in_out_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    if (_x_selector_length_caller(_selector, window.x_mouse_scroll_in_out_event, _event_type, _name) === false) {
        return;
    }
    
    var _event_key = 'scroll_in_out';
    var _classname = _x_get_event_classname(_event_key, _event_type);

    var _id = X_TIMER.length;
    X_TIMER.push(false);
    
    var _window = $(window);
    
    // 捲動時偵測
    _window.scroll(function() {
        //console.log(["觸發", _selector]);
        var _obj = $(_selector);
        var _name_data = _x_get_element_name(_obj, _selector, _name);
        
        var _obj_top = _obj.offset().top;
        var _obj_bottom = _obj_top + _obj.height();
        var _scroll_top_border = _window.scrollTop();
        var _scroll_bottom_border = _scroll_top_border + _window.height();
        
        var _is_obj_under_scorll_top = (_obj_top > _scroll_top_border);
        var _is_obj_above_scorll_bottom = (_obj_bottom < _scroll_bottom_border);
        
        var _is_obj_display_in_window = (_is_obj_under_scorll_top && _is_obj_above_scorll_bottom);
        
        if (_is_obj_display_in_window === false && X_TIMER[_id] === false) {
            // 沒事
        }
        else if (_is_obj_display_in_window === true && X_TIMER[_id] === false) {
            // 進入了，開始記錄事件
            X_TIMER[_id] = (new Date()).getTime();
            _x_X_CONSOLE_LOG([_event_type, _event_key + ": start", _name_data, X_TIMER[_id]]);
        }
        else if (_is_obj_display_in_window === true && X_TIMER[_id] !== false) {
            // 沒事
        }
        else if (_is_obj_display_in_window === false && X_TIMER[_id] !== false) {
            // 離開了
            var _interval = parseInt(((new Date()).getTime() - X_TIMER[_id])/1000, 10);
            if (_interval > X_STAY_SAVE_MIN_INTERVAL) {
                _x_X_CONSOLE_LOG([_event_type, _event_key + ": end", _name_data, _interval, "記錄"]);
                //ga("send", "event", _event_type, _name_data, "scroll_in", _interval);
                send_log(_event_type, _name, _event_key,_name_data);
            }
            else {
                _x_X_CONSOLE_LOG([_event_type, _event_key + ": end", _name_data, _interval, "不記錄"]);
            }
            X_TIMER[_id] = false;
        }
    });
};

/**
 * 偵測畫面捲動的事件
 * 可偵測物件是否出現在畫面中，並計算時間
 * @param {String} _selector
 * @param {String} _event_type
 * @param {String} _name
 */
window.x_mouse_scroll_in_event = function(_selector, _event_type, _name) {
    if ($(_selector).length === 0) {
        setTimeout(function () {
            window.x_mouse_scroll_in_event(_selector, _event_type, _name);
        }, 1000);
        return;
    }
    
    if (_x_selector_length_caller(_selector, window.x_mouse_scroll_in_event, _event_type, _name) === false) {
        return;
    }
    
    var _event_key = 'scroll_in_out';
    var _classname = _x_get_event_classname(_event_key, _event_type);

    var _id = X_TIMER.length;
    X_TIMER.push(false);
    
    var _window = $(window);
    
    var _check_is_obj_display_in_window = function (_obj) {
        var _obj_top = _obj.offset().top;
        var _obj_bottom = _obj_top + _obj.height();
        var _scroll_top_border = _window.scrollTop();
        var _scroll_bottom_border = _scroll_top_border + _window.height();
        
        var _is_obj_under_scorll_top = (_obj_top > _scroll_top_border);
        var _is_obj_above_scorll_bottom = (_obj_bottom < _scroll_bottom_border);
        
        var _is_obj_display_in_window = (_is_obj_under_scorll_top && _is_obj_above_scorll_bottom);
        return _is_obj_display_in_window;
    };
    
    // 捲動時偵測
    _window.scroll(function() {
        //console.log(["觸發", _selector]);
        var _obj = $(_selector);
        var _name_data = _x_get_element_name(_obj, _selector, _name);
        
        var _is_obj_display_in_window = _check_is_obj_display_in_window(_obj);
        
        if (_is_obj_display_in_window === false && X_TIMER[_id] === false) {
            // 沒事
        }
        else if (_is_obj_display_in_window === true && X_TIMER[_id] === false) {
            // 進入了，開始記錄事件
            X_TIMER[_id] = (new Date()).getTime();
            _x_X_CONSOLE_LOG([_event_type, _event_key + ": start", _name_data, X_TIMER[_id]]);
            
            setTimeout(function () {
                if (_check_is_obj_display_in_window(_obj)) {
                    var _interval = parseInt(((new Date()).getTime() - X_TIMER[_id])/1000, 10);
                    _x_X_CONSOLE_LOG([_event_type, _event_key + ": end", _name_data, _interval, "記錄"]);
                    //ga("send", "event", _event_type, _name_data, "scroll_in", _interval);
                    send_log(_event_type, _name, _event_key,(_name_data + _interval));
                }
                X_TIMER[_id] = false;
            }, X_STAY_SAVE_MIN_INTERVAL * 1000);
        }
        /*
        else if (_is_obj_display_in_window === true && X_TIMER[_id] !== false) {
            // 沒事
        }
        else if (_is_obj_display_in_window === false && X_TIMER[_id] !== false) {
            // 離開了
            var _interval = parseInt(((new Date()).getTime() - X_TIMER[_id])/1000, 10);
            if (_interval > X_STAY_SAVE_MIN_INTERVAL) {
                _x_X_CONSOLE_LOG([_event_type, _event_key + ": end", _name_data, _interval, "記錄"]);
                ga("send", "event", _event_type, _name_data, "scroll_in", _interval);
            }
            else {
                _x_X_CONSOLE_LOG([_event_type, _event_key + ": end", _name_data, _interval, "不記錄"]);
            }
            X_TIMER[_id] = false;
        }
        */
    });
};


// ------------------------------------

/**
 * 取得元素的可讀取元素
 * @param {String} _ele
 * @param {String} _event_type
 * @param {String} _name
 * @returns {String|get_element_name._name}
 * 
 * window.location.pathname + ": " + 
 */
var _x_get_element_name = function (_ele, _event_type, _name) {
    
	var _hash = location.hash;
	if (_hash !== "") {
		_hash = "#" + _hash;
	}
	
    var _name_header = get_x_user_id() + ": " + USER_IP + ": " + _get_time() + ": " + window.location.pathname + window.location.search + _hash;
    
    if (_ele !== undefined) {
        _name_header = _name_header + ": ";
    }
    else {
        return _name_header;
    }
    
    _ele = $(_ele);
    if (typeof(_name) === "string") {
        return _name_header + _name;
    }
    else if (typeof(_name) === "function") {
        return _name_header + _name(_ele);
    }
    
    try {
        if(_ele.attr("title")){
          _name = _ele.attr("title");
        } else if (_ele.text()) {
          _name = _ele.text(); 
        } else if (_ele.attr("alt")){
          _name = _ele.attr("alt");
        } else if (_ele.attr("src")){
          _name = _ele.attr("src"); 
        } else if (_ele.attr("data-src")){
          _name = _ele.attr("data-src");
        } else if (_ele.attr("className")){
          _name = _ele.attr("className");
        } else{
          _name = _event_type;
        }
    }
    catch (e) {}

    if (typeof(_name) === "string") {
        _name = _name.trim();
        
        while (_name.indexOf("  ") > -1) {
            _name = _name.split("  ").join(" ");
        }
    }
    
    _name = _name_header + _name;
    
    return _name;
};

/**
 * 偵測物件數量
 * 0個不執行
 * 2個以上，變成for loop執行
 * @param {type} _selector
 * @param {type} _callback
 * @returns {Boolean}
 */
var _x_selector_length_caller = function (_selector, _function, _event_type, _name) {
    var _obj_list = $(_selector);
    if (_obj_list.length === 0) {
        return false;
    }
    else if (_obj_list.length > 1) {
        // 如果要鎖定的物件很多個，應該用這種方式來避免重複
        if (typeof(_function) === "function") {
            for (var _i = 0; _i < _obj_list.length; _i++) {
                _function(_obj_list.eq(_i), _event_type, _name);
            }
        }
        return false;
    }
    return true;
};

/**
 * 顯示偵錯訊息: 簡易資訊
 * @param {String} _message
 */
var _x_X_CONSOLE_LOG = function (_message) {
    if (X_DEBUG === true){
        if (typeof(_message) === "object" && typeof(_message.length) === "number") {
            _message = _message.join(", ");
        }
        X_CONSOLE_LOG.push(_message);
        
        setTimeout(function () {
            if (X_CONSOLE_LOG.length > 0) {
                var _m = X_CONSOLE_LOG.join("\n");
                var _d = new Date();
                _m = "[" + _d.getHours() + ":" + _d.getMinutes() + ":"+ _d.getSeconds() + "]\n" + _m;
                console.log(_m);
                X_CONSOLE_LOG = [];
            }
        }, 1);
        //console.log(_message);
    }
};

window.x_getCookie = function(cname) {
	var name = cname + "=";
	var decodedCookie;
	//var decodedCookie = decodeURIComponent(document.cookie);
	try {
		decodedCookie = decodeURIComponent(document.cookie);
	}
	catch (e) {
		decodedCookie = document.cookie;
	}
		
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			var result = c.substring(name.length, c.length);
			result = decodeURIComponent(result);
			// encodeURI / decodeURI
			// encodeURIComponent / dece..
			// escape / unescape
			return result;
		}
	}
	return "";
};

window.send_log = function (_event_type,_user_name,_event_key,_event_content) {
    var _username = _user_name;
    var _object_url = sessionStorage.getItem('xapi_url');
    //設定目前使用者
    //f$.xAPI_setUsername(_username);
    //送出登入記錄->lrs
    var _verb_id = "https://w3id.org/xapi/dod-isd/verbs/click"; //LOGIN
    var _object_id = _object_url;
    var _url=window.top.location.href;
    var _params = {
        verb_id: _verb_id,
        object_id: _object_id,
        url: _url,
        extensions:{
            'http://dspace.ccstw.nccu.edu.tw/': 
            {
                "event_type":_event_type,
                "event_key":_event_key,
                "event_content":_event_content
            }
        }   
    }
    $.xAPI_send(_params);
    console.log(_params);
    
};


// -----------------------------------------------

X_CONSOLE_LOG = [];

/**
 * 顯示偵錯訊息: 詳細資訊f
 * @param {String} _message
 */
var _x__console_trace = function (_message) {
    if (X_DEBUG === true){
        console.trace(_message);
    }
};

/**
 * 搭配 各種技術器使用
 * @type Array
 */
var X_TIMER = [];
