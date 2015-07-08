var m_fiscal_yrs_id = "";
var m_active_yrs = "";

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
        getSpeakerActiveListResult();
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
    
    $('#panel_header').html(m_active_yrs + " Commencement Task Force Speaker Selection Result");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setSpeakerHTML(id, panel_color) {
    var html = "<div class='row' id='speaker_id_" + id + "'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='hpanel " + panel_color + " contact-panel'>";
    
    html += "<div class='panel-body'>";
    html += "<img alt='logo' class='img-circle m-b' src='' id='speaker_img_" + id + "'>";
    html += "<h3 id='speaker_name_" + id + "'></h3>";
    html += "<div id='speaker_bio_" + id + "'></div>";    
    html += "</div>";
    
    html += "<div class='panel-footer contact-footer'>";
    html += "<div class='row'>";
    html += "<div class='col-xs-6 col-sm-3 col-md-2 border-right'><div class='contact-stat'><span>Rating Median:</span><strong id='speaker_median_" + id + "'></strong></div></div>";
    html += "<div class='col-xs-6 col-sm-3 col-md-2'><div class='contact-stat'><span>Rating Mean:</span><strong id='speaker_mean_" + id + "'></strong></div></div>";
    html += "</div>";
    html += "</div>";
    
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    
    $('#active_speaker_list').append(html);
}

function setSpeakerInfoHTML(id, speaker_name, speaker_bio, speaker_pic, speaker_median, speaker_mean) {    
    if (speaker_pic === "") {
        $('#speaker_img_' + id).attr('src', 'images/user_web.jpg');
    }
    else {
        $('#speaker_img_' + id).attr('src', speaker_pic);
    }
    
    $('#speaker_name_' + id).html(speaker_name);
    $('#speaker_bio_' + id).html(speaker_bio.replace(/\n/g, "<br/>"));
    
    if (speaker_median !== null) {
        $('#speaker_median_' + id).html(speaker_median);
    }
    if (speaker_mean !== null) {
        $('#speaker_mean_' + id).html(speaker_mean);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSpeakerActiveListResult() {
    var result = new Array();
    result = db_getSpeakerListResult(m_fiscal_yrs_id);
    
    $('#active_speaker_list').empty();
    for (var i = 0; i < result.length; i++) {
        var panel_color = getRandomPanelColor();
        setSpeakerHTML(result[i]['SpeakerID'], panel_color);
        setSpeakerInfoHTML(result[i]['SpeakerID'], result[i]['SpeakerName'], result[i]['SpeakerBio'], result[i]['SpeakerPic'], result[i]['Median'], result[i]['Mean']);
    }
    
    $('.animate-panel').animatePanel();
}