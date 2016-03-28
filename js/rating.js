var m_fiscal_yrs_id = "";
var m_active_yrs = "";
var m_rating_user_id = "";

var m_enable_vote = false;
var m_voting_start = "";
var m_voting_end = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        getLoginInfo();
        setAdminMenu();
        setPanelHeader();
        setPanelVotingDate();
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
    $('.hide-menu').on('click', function(event){
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
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    // Initialize animate panel function
    $('.animate-panel').animatePanel();

    // Function for collapse hpanel
    $('.showhide').on('click', function (event) {
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
    $('.closebox').on('click', function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
        if($('body').hasClass('fullscreen-panel-mode')) { $('body').removeClass('fullscreen-panel-mode');}
    });

    // Fullscreen for fullscreen hpanel
    $('.fullscreen').on('click', function() {
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        $('body').toggleClass('fullscreen-panel-mode');
        icon.toggleClass('fa-expand').toggleClass('fa-compress');
        hpanel.toggleClass('fullscreen');
        setTimeout(function() {
            $(window).trigger('resize');
        }, 100);
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Function for small header
    $('.small-header-action').on('click', function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });

    // Set minimal height of #wrapper to fit the window
    setTimeout(function () {
        fixWrapperHeight();
    });

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
    
    // mobile logout button click //////////////////////////////////////////////
    $('#mobile_nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
        return false;
    });
    
    // rating save button click ////////////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_rating_save_"]', function() {
        $(this).prop("disabled", true);
        var speaker_id = $(this).attr('id').replace("btn_rating_save_", "");
        var rating = $("input:radio[name=radio_rating_" + speaker_id + "]:checked").val();
        
        // voting user validation
        if (m_rating_user_id === "") {
            swal({title: "Warning", text: "You are not a rating speaker selection memeber", type: "warning"});
            $("input:radio[name=radio_rating_" + speaker_id + "]").iCheck('uncheck');
            $(this).prop("disabled", false);
            return false;
        }
        // voting date validation
        if (!m_enable_vote) {
            if (m_voting_start === "" && m_voting_end === "") {
                swal({title: "Warning", text: "Rating Period has not been defined yet", type: "warning"});
            }
            else {
                swal({title: "Warning", text: "Rating Period are " + m_voting_start + " ~ " + m_voting_end, type: "warning"});
            }
            
            $("input:radio[name=radio_rating_" + speaker_id + "]").iCheck('uncheck');
            $(this).prop("disabled", false);
            return false;
        }
        // voting rubric validation
        if (typeof rating === 'undefined') {
            swal({title: "Warning", text: "Please select rubric range from 0 to 5", type: "warning"});
            $(this).prop("disabled", false);
            return false;
        }
        
        updateSpeakerRating(speaker_id, rating);
        swal({title: "Saved!", text: "Your rating has been saved", type: "success"});
        $(this).prop("disabled", false);
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
    if(!effect) { effect = 'zoomIn';}
    if(!delay) { delay = 0.06; } else { delay = delay / 10; }
    if(!child) { child = '.row > div';} else {child = "." + child;}

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opacity to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');
    
    // homer-1.5 Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // homer-1.9 Get all elements and add effect class
//    panel = element.find(child);
//    panel.addClass('stagger').addClass('animated-panel').addClass(effect);
//
//    var panelsCount = panel.length + 10;
//    var animateTime = (panelsCount * delay * 10000) / 10;

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });

    // Clear animation after finish
//    setTimeout(function(){
//        $('.stagger').css('animation', '');
//        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
//    }, animateTime);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    $('#login_user').html(sessionStorage.getItem('ss_ctfss_loginName'));
    
    var result = new Array();
    result = db_getRatingUserByEmail(sessionStorage.getItem('ss_ctfss_loginEmail'));
    if (result.length === 1) {
        m_rating_user_id = result[0]['RatingUserID'];
    }
}

function setAdminMenu() {
    if (sessionStorage.getItem('ss_ctfss_loginType') === "RatingUser") {
        $('#menu_reports').hide();
        $('#menu_admin').hide();
    }
}

function setPanelHeader() {
    var result = new Array();
    result = db_getFiscalYrsActive();
    
    if (result.length === 1) {
        m_fiscal_yrs_id = result[0]['FiscalYrsID'];
        m_active_yrs = result[0]['FiscalYrs'];
    }
    
    $('#panel_header').html(m_active_yrs + " Commencement Task Force Speaker Selection Rating");
}

function setPanelVotingDate() {    
    var result = new Array();
    result = db_getVotingDate(m_fiscal_yrs_id);
    
    if (result.length === 1) {
        m_voting_start = convertDBDateToString(result[0]['StartDate']);
        m_voting_end = convertDBDateToString(result[0]['EndDate']);
        
        var dt_current = new Date();
        var dt_start = new Date(m_voting_start);
        var dt_end = new Date(m_voting_end);
        dt_end.setDate(dt_end.getDate()+1);
        if (dt_current > dt_start && dt_current <= dt_end) {
            m_enable_vote = true;
        }
        
        $('#panel_voting_date').html("Rating Period: " + m_voting_start + " ~ " + m_voting_end);
    }    
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
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='radio'><label>";
    html += "<input type='radio' class='i-checks' name='radio_rating_" + id + "' value='5'>&nbsp;&nbsp;&nbsp;5 would mean you are rating the speaker as highly desirable for consideration for " + m_active_yrs + "</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='radio'><label>";
    html += "<input type='radio' class='i-checks' name='radio_rating_" + id + "' value='4'>&nbsp;&nbsp;&nbsp;4 would indicate they are a viable contender for consideration</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='radio'><label>";
    html += "<input type='radio' class='i-checks' name='radio_rating_" + id + "' value='3'>&nbsp;&nbsp;&nbsp;3 highly desirable but may require further discussion</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='radio'><label>";
    html += "<input type='radio' class='i-checks' name='radio_rating_" + id + "' value='2'>&nbsp;&nbsp;&nbsp;2 candidate is not highly desirable, requires further discussion of candidate</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='radio'><label>";
    html += "<input type='radio' class='i-checks' name='radio_rating_" + id + "' value='1'>&nbsp;&nbsp;&nbsp;1 candidate would be placed on subsequent year list</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'>";
    html += "<div class='radio'><label>";
    html += "<input type='radio' class='i-checks' name='radio_rating_" + id + "' value='0'>&nbsp;&nbsp;&nbsp;0 would indicate this candidate should not be considered at this time or in the near future</label>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<br/>";
    html += "<p>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12'><button type='button' class='btn btn-primary w-xs' id='btn_rating_save_" + id + "'>Save</button></div>";
    html += "</p>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<br/>";
    html += "</div>";
    
    html += "</div>";
    
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    $('#active_speaker_list').append(html);
}

function setSpeakerInfoHTML(id, speaker_name, speaker_bio, speaker_pic) {    
    if (speaker_pic === "") {
        $('#speaker_img_' + id).attr('src', 'images/user_web.jpg');
    }
    else {
        $('#speaker_img_' + id).attr('src', speaker_pic);
    }
    
    $('#speaker_name_' + id).html(speaker_name);
    $('#speaker_bio_' + id).html(speaker_bio.replace(/\n/g, "<br/>"));
}

function getSpeakerRatingByRatingUser(speaker_id) {
    var result = new Array();
    result = db_getSpeakerRating(m_fiscal_yrs_id, speaker_id, m_rating_user_id);
    
    if (result.length === 1) {
        $("input[name=radio_rating_" + speaker_id + "][value=" + result[0]['Rating'] + "]").prop('checked', true);
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
        setSpeakerInfoHTML(result[i]['SpeakerID'], result[i]['SpeakerName'], result[i]['SpeakerBio'], result[i]['SpeakerPic']);
        getSpeakerRatingByRatingUser(result[i]['SpeakerID']);
    }
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateSpeakerRating(speaker_id, rating) {   
    var result = new Array();
    result = db_getSpeakerRating(m_fiscal_yrs_id, speaker_id, m_rating_user_id);
    if (result.length === 1) {
        db_updateSpeakerRating(m_fiscal_yrs_id, speaker_id, m_rating_user_id, rating);
    }
    else {
        db_insertSpeakerRating(m_fiscal_yrs_id, speaker_id, m_rating_user_id, rating);
    }
    
    var ar_rating = [];
    var data = new Array();
    data = db_getSpeakerRatingList(m_fiscal_yrs_id, speaker_id);
    if (data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
            ar_rating.push(Number(data[i]['Rating']));
        }
    }
    
    var median = calculateMedian(ar_rating);
    var ar_median = new Array();
    ar_median = db_getSpeakerMedian(m_fiscal_yrs_id, speaker_id);
    if (ar_median.length === 1) {
        db_updateSpeakerMedian(m_fiscal_yrs_id, speaker_id, median);
    }
    else {
        db_insertSpeakerMedian(m_fiscal_yrs_id, speaker_id, median);
    }
    
    var mean = calculateMean(ar_rating);
    var ar_mean = new Array();
    ar_mean = db_getSpeakerMean(m_fiscal_yrs_id, speaker_id);
    if (ar_mean.length === 1) {
        db_updateSpeakerMean(m_fiscal_yrs_id, speaker_id, mean);
    }
    else {
        db_insertSpeakerMean(m_fiscal_yrs_id, speaker_id, mean);
    }
}