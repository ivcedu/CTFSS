var m_fiscal_yrs_id = "";
var m_active_yrs = "";
var m_rating_user_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        if (sessionStorage.getItem('ss_ctfss_loginType') === "RatingUser") {
            window.open('rating.html', '_self');
            return false;
        }
        getLoginInfo();
//        setAdminMenu();
        setPanelHeader();
        getActiveRatingUserList();
    }
    else {
        window.open('Login.html', '_self');
    }
};

$(window).bind("load", function () {
    // Remove splash screen after load
    $('.splash').css('display', 'none');
});

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();
    
    // Handle minimalize sidebar menu
    $('.hide-menu').click(function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });
    
    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        radioClass: 'iradio_square-green'
    });
    
    // Initialize animate panel function
    $('.animate-panel').animatePanel();
    
    // Function for collapse hpanel
    $('.showhide').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });
    
    // Function for close hpanel
    $('.closebox').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });
    
    // Function for small header
    $('.small-header-action').click(function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });
    
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
    // Sparkline bar chart data and options used under Profile image on left navigation panel
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });
    
    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
        return false;
    });
    
    // new rating use button click /////////////////////////////////////////////
    $('#btn_new_user').click(function() {
        if (m_fiscal_yrs_id === "") {
            swal({title: "Warning", text: "Please set commencement year first", type: "warning"});
            return false;
        }
        
        m_rating_user_id = "";
        resetModRatingUserInfo();
        $('#mod_rate_user_header').html("New Rating User Setting");
    });
    
    // modal new rating user save button click /////////////////////////////////
    $('#mod_btn_user_save').click(function() { 
        // rating user exist validation
        var user_email = $.trim(textReplaceApostrophe($('#mod_user_email').val()));
        var result = new Array();
        result = db_getRatingUserByEmail(user_email);
        if (result.length === 1) {
            swal({title: "Error", text: "Rating user already exist", type: "warning"});
            return false;
        }
        
        if (m_rating_user_id === "") {
            addRatingUserToDB();
        }
        else {
            updateRatingUserToDB();
        }
    });
    
    // rating user list edit button click //////////////////////////////////////
    $(document).on('click', 'button[id^="btn_user_edit_"]', function() {
        m_rating_user_id = $(this).attr('id').replace("btn_user_edit_", "");
        $('#mod_rate_user_header').html("Edit Rating User Setting");
        
        resetModRatingUserInfo();
        getSelectedRatingUserInfo();
    });
    
    // rating user list delete button click ////////////////////////////////////
    $(document).on('click', 'button[id^="btn_user_delete_"]', function() {
        m_rating_user_id = $(this).attr('id').replace("btn_user_delete_", "");
        if (db_deleteRatingUser(m_fiscal_yrs_id, m_rating_user_id)) {
            updateSpeakerMedianMean();
            $('#rating_user_id_' + m_rating_user_id).remove();
        }
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

////////////////////////////////////////////////////////////////////////////////
function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';};
    if(!delay) { delay = 0.06; } else { delay = delay / 10; };
    if(!child) { child = '.row > div';} else {child = "." + child;};

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opactiy to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resetModRatingUserInfo() {
    $('#mod_user_mame').val("");
    $('#mod_user_email').val("");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    $('#login_user').html(sessionStorage.getItem('ss_ctfss_loginName'));
}

//function setAdminMenu() {
//    if (sessionStorage.getItem('ss_ctfss_loginType') === "RatingUser") {
//        $('#menu_reports').hide();
//        $('#menu_admin').hide();
//        $('#menu_users').hide();
//    }
//}

function setPanelHeader() {
    var result = new Array();
    result = db_getFiscalYrsActive();
    
    if (result.length === 1) {
        m_fiscal_yrs_id = result[0]['FiscalYrsID'];
        m_active_yrs = result[0]['FiscalYrs'];
    }
    
    $('#panel_header').html(m_active_yrs + " Commencement Task Force Speaker Selection Rating User List");
}

function getSelectedRatingUserInfo() {    
    var result = new Array();
    result = db_getRatingUserInfo(m_fiscal_yrs_id, m_rating_user_id);
    
    if (result.length === 1) {
        $('#mod_user_mame').val(result[0]['RUName']);
        $('#mod_user_email').val(result[0]['RUEmail']);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setRatingUserHTML(id, panel_color) {
    var html = "<div class='row' id='rating_user_id_" + id + "'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='hpanel " + panel_color + " contact-panel'>";
    
    html += "<div class='panel-body'>";    
    html += "<div class='row'>";
    html += "<div class='col-xs-4 col-sm-2 col-md-1'>User Name:</div>";
    html += "<div class='col-xs-8 col-sm-10 col-md-11' id='ru_name_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<div class='row'>";
    html += "<div class='col-xs-4 col-sm-2 col-md-1'>User Email:</div>";
    html += "<div class='col-xs-8 col-sm-10 col-md-11' id='ru_email_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<p>";
    html += "<button type='button' class='btn btn-primary w-xs' data-toggle='modal' data-target='#mod_rate_user' id='btn_user_edit_" + id + "'>Edit</button>";
    html += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
    html += "<button type='button' class='btn btn-danger2 w-xs' id='btn_user_delete_" + id + "'>Delete</button>";
    html += "</p>";
    html += "</div>";
    
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    $('#active_rating_user_list').append(html);
}

function setRatingUserInfoHTML(id, ru_name, ru_email) {        
    $('#ru_name_' + id).html(ru_name);
    $('#ru_email_' + id).html(ru_email);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getActiveRatingUserList() {
    var result = new Array();
    result = db_getRatingUserList(m_fiscal_yrs_id);
    
    $('#active_rating_user_list').empty();
    for (var i = 0; i < result.length; i++) {
        var panel_color = getRandomPanelColor();
        setRatingUserHTML(result[i]['RatingUserID'], panel_color);
        setRatingUserInfoHTML(result[i]['RatingUserID'], result[i]['RUName'], result[i]['RUEmail']);
    }
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addRatingUserToDB() {
    var user_name = $.trim(textReplaceApostrophe($('#mod_user_mame').val()));
    var user_email = $.trim(textReplaceApostrophe($('#mod_user_email').val()));

    m_rating_user_id = db_insertRatingUser(m_fiscal_yrs_id, user_name, user_email);
    setRatingUserHTML(m_rating_user_id);
    setRatingUserInfoHTML(m_rating_user_id, user_name, user_email);
}

function updateRatingUserToDB() {
    var user_name = $.trim(textReplaceApostrophe($('#mod_user_mame').val()));
    var user_email = $.trim(textReplaceApostrophe($('#mod_user_email').val()));
    
    if (db_updateRatingUserInfo(m_fiscal_yrs_id, m_rating_user_id, user_name, user_email)) {
        setRatingUserInfoHTML(m_rating_user_id, user_name, user_email);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateSpeakerMedianMean() {
    var result = new Array();
    result = db_getSpeakerList(m_fiscal_yrs_id);
    
    for (var i = 0; i < result.length; i++) {
        var ar_rating = [];
        var data = new Array();
        data = db_getSpeakerRatingList(m_fiscal_yrs_id, result[i]['SpeakerID']);
        if (data.length !== 0) {
            for (var j = 0; j < data.length; j++) {
                ar_rating.push(Number(data[j]['Rating']));
            }
        }
        var median = calculateMedian(ar_rating);
        db_updateSpeakerMedian(m_fiscal_yrs_id, result[i]['SpeakerID'], median);
        var mean = calculateMean(ar_rating);
        db_updateSpeakerMean(m_fiscal_yrs_id, result[i]['SpeakerID'], mean);
    }
}