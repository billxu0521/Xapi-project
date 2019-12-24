/**
 * 適用網頁：http://vinson.rd.ssic.nccu.edu.tw/
 * 事件查詢表：https://docs.google.com/spreadsheets/d/1MtMtw9lKLDTUzfBd6Ld0fAe_FGe5u-Mlkh5WfZiH5qM/edit
 * @author Pudding 20170203
 */

GA_TRACE_CODE = "UA-89833109-4";
var _local_debug = false;

if (_local_debug === true) {
    X_CSS_URL = "https://localhost/GA-project/config/vinson.rd.ssic.nccu.edu.tw.css";
    X_LIB_URL = "https://localhost/GA-project/xapi_inject_lib.js";
    console.log("[LOCAL TEST MODE]");
}
else {
    X_CSS_URL = "https://billxu0521.github.io/Xapi-project/config/nccuir.lib.nccu.edu.tw.css";
    X_LIB_URL = "https://billxu0521.github.io/Xapi-project/xapi_inject_lib.js";
    X_SHA_URL = "https://billxu0521.github.io/Xapi-project/2.5.3-crypto-sha1.js";
    X_BASE_URL = "https://billxu0521.github.io/Xapi-project/base64.js";
    X_WRAPPER_URL = "https://billxu0521.github.io/Xapi-project/xapiwrapper.min.js";

    X_LRS_URL = "https://billxu0521.github.io/Xapi-project/lrs_config.js";
    X_OBJ_URL = "https://billxu0521.github.io/Xapi-project/object_config.js";
    X_VERB_URL = "https://billxu0521.github.io/Xapi-project/verb_config.js";
    X_XAPI_URL = "https://billxu0521.github.io/Xapi-project/xapi.js";

    X_CACHE_LIB_URL = "https://billxu0521.github.io/Xapi-project/cache.js";
}


var exec = function () {
    auto_x_set_x_user_id();   
    //搜尋按鈕
    x_mouse_click_event(".glyphicon glyphicon-search","Click");
    x_mouse_click_event('a[title="文集瀏覽"]', "Click", function (_ele) {
        return _ele.text();});
    x_mouse_click_event(".evenRowEvenCol", "Click");
    x_mouse_click_event(".oddRowEvenCol", "Click");
    x_mouse_click_event("[href]", "Click", function (_ele) {
        return _ele.text();});
    x_mouse_click_event("[name='submit']", "Click", function (_ele) {
        return _ele.text();});
   

    //偵測搜尋表單
    /*
    ga_submit_event('#glyphicon glyphicon-search > form',"Form", 
        function(form){
            console.log("submit act"+form);
            return "start-year=" + form.find('select[name="start-year"]').val();
        });
    */
    x_submit_event("form", "Form", function (_ele) {
        return _ele.text();});
    
};


// --------------------------------------

$(function () {
    $.getScript(CACHE_LIB_URL);
    $.getScript(BASE_URL);
    $.getScript(WRAPPER_URL);
    $.getScript(SHA_URL);
    $.getScript(LRS_URL);
    $.getScript(OBJ_URL);
    $.getScript(VERB_URL);
    $.getScript(XAPI_URL);
    $.getScript(LIB_URL, function () {
        x_setup(function () {
            exec();
        });
    });
});