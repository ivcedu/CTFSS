var m_fiscal_yrs_id = "";
var m_active_yrs = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    setPanelHeader();
    getSpeakerActiveListResult();
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
    $('body').addClass('page-small');
    
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        radioClass: 'iradio_square-green'
    });
    
    // Initialize animate panel function
    $('.animate-panel').animatePanel();
    
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
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

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';}
    if(!delay) { delay = 0.06; } else { delay = delay / 10; }
    if(!child) { child = '.row > div';} else {child = "." + child;}

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opacity to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('stagger').addClass('animated-panel').addClass(effect);

    var panelsCount = panel.length + 10;
    var animateTime = (panelsCount * delay * 10000) / 10;

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });

    // Clear animation after finish
    setTimeout(function(){
        $('.stagger').css('animation', '');
        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
    }, animateTime);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setPanelHeader() {
    var result = new Array();
    result = db_getFiscalYrsActive();
    
    if (result.length === 1) {
        m_fiscal_yrs_id = result[0]['FiscalYrsID'];
        m_active_yrs = result[0]['FiscalYrs'];
    }
    
    $('#panel_header').html(m_active_yrs + " Irvine Valley College Commencement Speaker Selection Result");
    $('#update_status').html("Last Update: " + getCurrentDateTime());
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setSpeakerHTML(id, panel_color) {
    var html = "<div class='row' id='speaker_id_" + id + "'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='hpanel " + panel_color + " contact-panel'>";
    
    html += "<div class='panel-body'>";
    html += "<img alt='logo' class='img-circle m-b' src='' id='speaker_img_" + id + "'>";
    html += "<h3 class='font-bold' id='speaker_name_" + id + "'></h3>";
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
    result = db_getSpeakerListResult2(m_fiscal_yrs_id);
    
    $('#active_speaker_list').empty();
    for (var i = 0; i < result.length; i++) {
        var panel_color = getRandomPanelColor();
        setSpeakerHTML(result[i]['SpeakerID'], panel_color);
        setSpeakerInfoHTML(result[i]['SpeakerID'], result[i]['SpeakerName'], result[i]['SpeakerBio'], result[i]['SpeakerPic'], result[i]['Median'], result[i]['Mean']);
    }
    
    $('.animate-panel').animatePanel();
}