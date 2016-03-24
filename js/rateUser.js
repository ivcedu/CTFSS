var m_fiscal_yrs_id = "";
var m_active_yrs = "";
var m_rating_user_id = "";
var m_table;
var m_is_active_yrs = false;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        if (sessionStorage.getItem('ss_ctfss_loginType') === "RatingUser") {
            window.open('rating.html', '_self');
            return false;
        }
        getLoginInfo();
        setPanelHeader();
        getFiscalYrsList();
        hideNewRatingUserButton();
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
    
    // refresh button click ////////////////////////////////////////////////////
    $('#btn_refresh').click(function() {
        var fiscal_yrs = $('#fiscal_yrs_list').val();
    
        var result = new Array();
        result = db_getFiscalYrsByYrs(fiscal_yrs);
        if (result.length === 1) {
            m_fiscal_yrs_id = result[0]['FiscalYrsID'];
            m_active_yrs = result[0]['FiscalYrs'];
            
            if (result[0]['Active'] === "1") {
                m_is_active_yrs = true;
            }
            else {
                m_is_active_yrs = false;
            }
            $('#panel_header').html(m_active_yrs + " Commencement Task Force Speaker Selection Rating User List");
        }
        
        hideNewRatingUserButton();
        getActiveRatingUserList();
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
        $('#mod_btn_user_delete').hide();
        $('#mod_rate_user_header').html("New Rating User Setting");
    });
    
    // table rating user click event ///////////////////////////////////////////
    $('table').on('click', 'a[id^="rating_user_id_"]', function() {
        m_rating_user_id = $(this).attr('id').replace("rating_user_id_", "");
        $('#mod_rate_user_header').html("Edit Rating User Setting");
        resetModRatingUserInfo();
        getSelectedRatingUserInfo();
        $('#mod_btn_user_delete').show();
        $('#mod_rate_user').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_user_save').click(function() { 
        if (m_rating_user_id === "") {
            addRatingUserToDB();
        }
        else {
            updateRatingUserToDB();
        }
        
        $('#mod_rate_user').modal('hide');
        getActiveRatingUserList();
        return false;
    });
    
    // modal delete button click ///////////////////////////////////////////////
    $('#mod_btn_user_delete').click(function() { 
        $('#mod_rate_user').modal('hide');
        
        swal({  title: "Are you sure?", 
                text: "You will not be able to recover deleted user rating value",
                type: "warning", 
                showCancelButton: true, 
                confirmButtonColor: "#DD6B55", 
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true }, 
                function() {
                    db_deleteRatingUser(m_fiscal_yrs_id, m_rating_user_id);
                    updateSpeakerMedianMean();
                    getActiveRatingUserList();
                }
            );

        return false;
    });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#active_rating_user_list').DataTable({ paging: false, bInfo: false });
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
function resetModRatingUserInfo() {
    $('#mod_user_mame').val("");
    $('#mod_user_email').val("");
}

function hideNewRatingUserButton() {
    if (m_is_active_yrs) {
        $('#new_rating_usr_section').show();
    }
    else {
        $('#new_rating_usr_section').hide();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    $('#login_user').html(sessionStorage.getItem('ss_ctfss_loginName'));
}

function setPanelHeader() {
    var result = new Array();
    result = db_getFiscalYrsActive();
    
    if (result.length === 1) {
        m_fiscal_yrs_id = result[0]['FiscalYrsID'];
        m_active_yrs = result[0]['FiscalYrs'];
        m_is_active_yrs = true;
    }
    
    $('#panel_header').html(m_active_yrs + " Commencement Task Force Speaker Selection Rating User List");
}

function getFiscalYrsList() {
    var result = new Array();
    result = db_getFiscalYrsList();
    var active_year = "";
    
    var fiscal_html = "";
    for (var i = 0; i < result.length; i++) {
        if (result[i]['Active'] === "1") {
            active_year = result[i]['FiscalYrs'];
        }
        fiscal_html += "<option value='" + result[i]['FiscalYrs'] + "'>" + result[i]['FiscalYrs'] + "</option>";
    }
    
    $('#fiscal_yrs_list').empty();
    $('#fiscal_yrs_list').append(fiscal_html);
    $('#fiscal_yrs_list').val(active_year);
    $('#fiscal_yrs_list').selectpicker('refresh');
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
function getActiveRatingUserList() {
    var result = new Array();
    result = db_getRatingUserList(m_fiscal_yrs_id, m_is_active_yrs);
    
    m_table.clear();
    m_table.rows.add(result).draw();
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addRatingUserToDB() {
    var user_name = textReplaceApostrophe($.trim($('#mod_user_mame').val()));
    var user_email = textReplaceApostrophe($.trim($('#mod_user_email').val()));

    db_insertRatingUser(m_fiscal_yrs_id, user_name, user_email);
}

function updateRatingUserToDB() {
    var user_name = textReplaceApostrophe($.trim($('#mod_user_mame').val()));
    var user_email = textReplaceApostrophe($.trim($('#mod_user_email').val()));
    
    db_updateRatingUserInfo(m_fiscal_yrs_id, m_rating_user_id, user_name, user_email);
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
        else {
            continue;
        }
        
        var median = calculateMedian(ar_rating);
        db_updateSpeakerMedian(m_fiscal_yrs_id, result[i]['SpeakerID'], median);
        var mean = calculateMean(ar_rating);
        db_updateSpeakerMean(m_fiscal_yrs_id, result[i]['SpeakerID'], mean);
    }
}