/**
 * 適用網頁：http://vinson.rd.ssic.nccu.edu.tw/
 * 事件查詢表：https://docs.google.com/spreadsheets/d/1MtMtw9lKLDTUzfBd6Ld0fAe_FGe5u-Mlkh5WfZiH5qM/edit
 * @author Pudding 20170203
 */

GA_TRACE_CODE = "UA-107585606-1";

var _local_debug = false;

if (_local_debug === true) {
    CSS_URL = "https://localhost/Xapi-project/config/nccuir.lib.nccu.edu.tw.css";
    LIB_URL = "https://localhost/Xapi-project/ga_inject_lib.js";
    CACHE_LIB_URL = "https://localhost/Xapi-project/cache.js";
    console.log("[LOCAL TEST MODE]");
}
else {
    CSS_URL = "https://billxu0521.github.io/Xapi-project/config/nccuir.lib.nccu.edu.tw.css";
    LIB_URL = "https://billxu0521.github.io/Xapi-project/ga_inject_lib.js";
    SHA_URL = "https://billxu0521.github.io/Xapi-project/2.5.3-crypto-sha1.js";
    BASE_URL = "https://billxu0521.github.io/Xapi-project/base64.js";
    WRAPPER_URL = "https://billxu0521.github.io/Xapi-project/xapiwrapper.min.js";

    LRS_URL = "https://billxu0521.github.io/Xapi-project/cwise_lrs_config.js";
    OBJ_URL = "https://billxu0521.github.io/Xapi-project/cwise_object_config.js";
    VERB_URL = "https://billxu0521.github.io/Xapi-project/cwise_verb_config.js";
    XAPI_URL = "https://billxu0521.github.io/Xapi-project/cwise_xapi.js";

    CACHE_LIB_URL = "https://billxu0521.github.io/Xapi-project/cache.js";
}


var exec = function () {
    auto_set_user_id(); 
    
    //思洋實驗用
    //主頁
    ga_mouse_click_event("#search_scholar","Home_Search_Researcher", function (_input) {
        return $('#scholar_name').val();
    });
    ga_mouse_click_event("#search_item","Home_Search_Publication", function (_input) {
        return $('#item_name').val();
    });
    ga_mouse_click_event('.sec1c ul li a:contains("研究者")','Home_Browse_Researcher');
    ga_mouse_click_event('.sec1c ul li a:contains("學系")','Home_Browse_Researcher');
    ga_mouse_click_event('.sec1c ul li a:contains("學術產出")','Home_Browse_Publication');
    ga_mouse_click_event('#top-menu ul li a:contains("Post-Print")','Home_Browse_Publication');
    ga_mouse_click_event('#top-menu ul li a:contains("關於學術集成")','Home_Browse_Publication');
    ga_mouse_click_event('a.scholar_href','Home_Browse_Dinstinguished Scholar');
    ga_mouse_click_event('#academic_trends a','Home_Information_Academic Trends');
    ga_mouse_click_event('#statisticail_info a','Home_Information_Statistical Data');
//console.log($('#chart svg g g g.node:gt(1)'));
    
    //研究者
    ga_mouse_click_event('#researcher_list div.col-lg-3 ul li a[href]','Researcher List_Browse');
    ga_mouse_click_event('#researcher_list div.col-lg-3 ul li ul li a[href]','Researcher List_Browse');
    ga_mouse_click_event('#researcher_list div.col-lg-9 div nav ul li a','Researcher List_Browse',function (_ele) {
        return _ele.text();});
    ga_mouse_click_event('#researcher_list div.col-lg-9 div h2 a','Researcher List_Search');
    ga_mouse_click_event('#researcher_list div.col-lg-9 div #form-search div div #submit-button','Researcher List_Search',function (_input) {
        return ($('input[name="scholar_name"]').val() + '/' + $('[name="topCommunity"] option:selected').text());
    });

    //學系
    ga_mouse_click_event('#department_list div.col-lg-3 span a[href]','Department List_Browse');
    ga_mouse_click_event('#department_list div.col-lg-9 div table tbody tr td a[href]','Department List_ Click');
    
    //學術產出
    ga_mouse_click_event('#publication_list div.col-lg-3 span a[href]','Publication List_Browse');
    ga_mouse_click_event('#publication_list div.col-lg-9 form div div div a','Publication List_Browse',function (_ele) {
        return $('input[name="item_name"]').val();
    });
    ga_mouse_click_event('#publication_list div.col-lg-9 div nav ul li a','Publication List_Search',function (_ele) {
        return _ele.text();});
    ga_mouse_click_event('#publication_list div.col-lg-9 .col-lg-12 table tbody tr td:nth-child(5)','Publication List_ Download');    
    ga_mouse_click_event('#publication_list div.col-lg-9 .col-lg-12 table tbody tr td:nth-child(2)','Publication List_Information');        
    ga_mouse_click_event('#publication_list div.col-lg-9 .col-lg-12 table tbody tr td:nth-child(3)','Publication List_Information');    
    ga_input_change_event('#publication_list div.col-lg-9 form div div select[name="itemPerPage"]','Publication List_Interface');        
    ga_mouse_click_event('#publication_list div.col-lg-9 .col-lg-12 table thead tr th a[href]','Publication List_Interface');

    //研究者詳情
    ga_mouse_click_event('div.panel-body.sub-id-panel span a:not(#researcher_socialnetwork)','Researcher_Resume');
    ga_mouse_click_event('#researcher_socialnetwork div span a','Researcher_SocialNetwork');

    //學系詳情
    ga_mouse_click_event('#departments_archival div.col-lg-3 span a[href]','Departments_Archival Studies');
    ga_mouse_click_event('#departments_archival div.container div span a[href]','Departments_Information');

    //學術產出詳情
    ga_mouse_click_event('#publication_page div h5','Publication_Download');
    ga_mouse_click_event('#publication_page div h6','Publication_Export');
    ga_mouse_click_event('#atstbx div a','Publication_Sharing');
    ga_mouse_click_event('#atic_facebook','Publication_Sharing');
    ga_mouse_click_event('#atic_twitter','Publication_Sharing');
    ga_mouse_click_event('#atic_print','Publication_Sharing');
    ga_mouse_click_event('#atic_favorites','Publication_Sharing');
    ga_mouse_click_event('#atic_pinterest_share','Publication_Sharing');
    ga_mouse_click_event('#atic_more','Publication_Sharing');
    ga_mouse_click_event('#relatedarticle a','Publication_Related');
    ga_mouse_click_event('#publication_page div h6','Publication_Export');


    //登入
    ga_submit_event('form#loginform','Login_Click',function (_ele) {
        return '';
    });

    //社會網絡
    ga_mouse_click_event('#chart svg g g g.node:eq(1)','Social Network_Self Publication',function (_ele) {
        return _ele.find('text tspan').text();
    });
    ga_mouse_click_event('#chart svg g g g.node:gt(0)','Social Network_Other Publication',function (_ele) {
        return _ele.find('text tspan').text();
    });
    ga_mouse_over_event('#chart svg g g line','Social Network_Link Line')
    ga_mouse_click_event('#chart svg g g line','Social Network_Link Line');
    ga_mouse_click_event('#menu_r #obj_des li.pubs a','Social Network_Publication');
    
    };

    
//-------------------

let listcheck = function (){
    var _hash = location.hash;
    if (_hash !== "") {
        _hash = "#" + _hash;
    }
    var _name = get_user_id() + ": " + _get_time() + ": " + window.location.pathname + window.location.search + _hash;

    $('#menu_r ul .name_chi:eq(0) a').on('click',function(event){
        let url = $(this).attr('href');
        let urlid = url.split('=');
        let urlParams = new URLSearchParams(window.location.search);
        let epersonid = urlParams.get('epersonID');
        if(urlid[1] == epersonid){
            var _name_data = _get_element_name(this, '#menu_r ul .name_chi:eq(0) a', _name);
            _console_log(['Social Network_Self Researcher', _name_data, 'mouse_click']);
            ga("send", "event", 'Social Network_Self Researcher', _name_data, 'mouse_click');
            //ga_mouse_click_event('#menu_r ul .name_chi a','Social Network_Self Researcher')
        }else{
            var _name_data = _get_element_name(this, '#menu_r ul .name_chi:eq(0) a', _name);
            _console_log(['Social Network_Other Researcher', _name_data, 'mouse_click']);
            ga("send", "event", 'Social Network_Other Researcher', _name_data, 'mouse_click');
            //ga_mouse_click_event('#menu_r ul .name_chi a','Social Network_Other Researcher')
        }

    });
    $('#menu_r ul .name_chi:eq(1) a').on('click',function(event){
        
        let url = $(this).attr('href');
        let urlid = url.split('=');
        let urlParams = new URLSearchParams(window.location.search);
        let epersonid = urlParams.get('epersonID');
        if(urlid[1] == epersonid){
            var _name_data = _get_element_name(this, '#menu_r ul .name_chi:eq(1) a', _name);
            _console_log(['Social Network_Other Researcher', _name_data, 'mouse_click']);
            ga("send", "event", 'Social Network_Other Researcher', _name_data, 'mouse_click');
        }else{
            var _name_data = _get_element_name(this, '#menu_r ul .name_chi:eq(1) a', _name);
            _console_log(['Social Network_Other Researcher', _name_data, 'mouse_click']);
            ga("send", "event", 'Social Network_Other Researcher', _name_data, 'mouse_click');
        }

    });
}

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
        ga_setup(function () {
            exec();
            $('#chart svg g g g.node').on('click',function(){
                listcheck();
            });
            $('#chart svg g g line').on('mouseover',function(){
                listcheck();
            });
        });
    });
});
