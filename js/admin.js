var m_fiscal_yrs_id = "";
var m_active_yrs = "";
var m_base64_data = "";
var m_speaker_id = "";

var m_voting_start = "";
var m_voting_end = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        if (sessionStorage.getItem('ss_ctfss_loginType') === "RatingUser") {
            window.open('rating.html', '_self');
            return false;
        }
        getLoginInfo();
        setPanelHeader();
        setPanelVotingDate();
        getSpeakerActiveList();
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
    
    // set year button click ///////////////////////////////////////////////////
    $('#btn_set_yrs').click(function() {
        var today = new Date();
        var yr = today.getFullYear();
        var new_fiscal_yrs = yr + 1;
    
        if (m_active_yrs === new_fiscal_yrs.toString()) {
            swal({title: "Warning", text: "Current and new fiscal year are same", type: "warning"});
            return false;
        }
        else {
            getNewFiscalYrs();
        }
    });
    
    // modal set year save button click ////////////////////////////////////////
    $('#mod_btn_fiscal_yrs_save').click(function() {
        setFiscalYrs();
        setPanelHeader();
        setPanelVotingDate();
        getSpeakerActiveList();
    });
    
    // voting date button click ////////////////////////////////////////////////
    $('#btn_voting_date').click(function() {
        if (m_fiscal_yrs_id === "") {
            swal({title: "Warning", text: "Please set commencement year first", type: "warning"});
            return false;
        }
        
        getVotingDate();
    });
    
    // voting start date change event //////////////////////////////////////////
    $('#mod_voting_date_start').on('change', function() {        
        var start_date = $(this).val();
        $('#mod_voting_date_end').datepicker( "option", "minDate", new Date(start_date));
    });
    
    // modal voting date save button click /////////////////////////////////////
    $('#mod_btn_voting_date_save').click(function() {
        var start_date = $('#mod_voting_date_start').val();
        var end_date = $('#mod_voting_date_end').val();
        if (start_date === "" || end_date === "") {
            swal({title: "Warning", text: "Voting start and end date are required", type: "warning"});
            return false;
        }
        
        setVotingDate(start_date, end_date);
        setPanelVotingDate();
    });
    
    // new speaker button click ////////////////////////////////////////////////
    $('#btn_new_speaker').click(function() {
        if (m_fiscal_yrs_id === "") {
            swal({title: "Warning", text: "Please set commencement year first", type: "warning"});
            return false;
        }
        
        m_speaker_id = "";
        m_base64_data = "";
        resetModSpeakerInfo();
        $('#mod_speaker_header').html("New Speaker Setting");
    });
    
    // publish link button click ///////////////////////////////////////////////
    $('#btn_publish_link').click(function() {
        var site = location.href.replace("admin.html", "resultPublish.html");
        swal("Publish Link", site, "info");
        return false;
    });
    
    // modal new speaker picture button click //////////////////////////////////
    $('#mod_speaker_pic').change(function() {
        getImageFileInfo();
        convertImageFiletoBase64();
    });
    
    // modal new speaker save button click /////////////////////////////////////
    $('#mod_btn_new_speaker_save').click(function() {        
        if (m_speaker_id === "") {
            addSpeakerToDB();
        }
        else {
            updateSpeakerToDB();
        }
    });
    
    // speaker list edit button click //////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_speaker_edit_"]', function() {
        m_speaker_id = $(this).attr('id').replace("btn_speaker_edit_", "");
        $('#mod_speaker_header').html("Edit Speaker Setting");
        
        resetModSpeakerInfo();
        getSelectedSpeakerInfo();
        
        return false;
    });
    
    // speaker list delete button click ////////////////////////////////////////
    $(document).on('click', 'button[id^="btn_speaker_delete_"]', function() {
        m_speaker_id = $(this).attr('id').replace("btn_speaker_delete_", "");
        swal({  title: "Are you sure?", 
                text: "You will not be able to recover deleted speaker rating, mean and median value",
                type: "warning", 
                showCancelButton: true, 
                confirmButtonColor: "#DD6B55", 
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true }, 
                function() {
                    if (db_deleteSpeaker(m_fiscal_yrs_id, m_speaker_id)) {
                        $('#speaker_id_' + m_speaker_id).remove();
                    }
                }
            );

        return false;
    });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
    
    // auto size
    $('#mod_speaker_bio').autosize();
    
    // bootstrap filestyle
    $(":file").filestyle({buttonName: "btn-primary"});
    
    // bootstrap datepicker
    $('#mod_voting_date_start').datepicker();
    $('#mod_voting_date_end').datepicker();
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

    // homer-1.9 Clear animation after finish
//    setTimeout(function(){
//        $('.stagger').css('animation', '');
//        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
//    }, animateTime);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resetModSpeakerInfo() {
    $('#mod_speaker_img').attr('src', 'images/user_web.jpg');
    $('#mod_speaker_pic').filestyle('clear');
    $('#mod_speaker_mame').val("");
    $('#mod_speaker_bio').val("");
    $('#mod_speaker_bio').trigger('autosize.resize');
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
    }
    
    $('#panel_header').html(m_active_yrs + " Commencement Task Force Administrator");
}

function setPanelVotingDate() {    
    var result = new Array();
    result = db_getVotingDate(m_fiscal_yrs_id);
    
    if (result.length === 1) {
        m_voting_start = convertDBDateToString(result[0]['StartDate']);
        m_voting_end = convertDBDateToString(result[0]['EndDate']);
        $('#panel_voting_date').html("Rating Period: " + m_voting_start + " ~ " + m_voting_end);
    }
    else {
        m_voting_start = "";
        m_voting_end = "";
        $('#panel_voting_date').html("Rating Period:");
    }
}

function getSelectedSpeakerInfo() {    
    var result = new Array();
    result = db_getSpeakerInfo(m_fiscal_yrs_id, m_speaker_id);
    
    if (result.length === 1) {
        if (result[0]['SpeakerPic'] === "") {
            $('#mod_speaker_img').attr('src', 'images/user_web.jpg');
        }
        else {
            m_base64_data = result[0]['SpeakerPic'];
            $('#mod_speaker_img').attr('src', result[0]['SpeakerPic']);
        }

        $('#mod_speaker_mame').val(result[0]['SpeakerName']);
        $('#mod_speaker_bio').val(result[0]['SpeakerBio']);
        $('#mod_speaker_bio').trigger('autosize.resize');
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
    html += "<br/>";
    html += "<p>";
    html += "<button type='button' class='btn btn-primary w-xs' data-toggle='modal' data-target='#mod_new_speaker' id='btn_speaker_edit_" + id + "'>Edit</button>";
    html += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
    html += "<button type='button' class='btn btn-danger2 w-xs' id='btn_speaker_delete_" + id + "'>Delete</button>";
    html += "</p>";
    
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSpeakerActiveList() {
    var result = new Array();
    result = db_getSpeakerList(m_fiscal_yrs_id);
    
    $('#active_speaker_list').empty();
    for (var i = 0; i < result.length; i++) {
        var panel_color = getRandomPanelColor();
        setSpeakerHTML(result[i]['SpeakerID'], panel_color);
        setSpeakerInfoHTML(result[i]['SpeakerID'], result[i]['SpeakerName'], result[i]['SpeakerBio'], result[i]['SpeakerPic']);
    }
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getNewFiscalYrs() {
    var today = new Date();
    var yr = today.getFullYear();
    var new_fiscal_yrs = yr + 1;
    
    $('#mod_new_yrs').html(new_fiscal_yrs);
}

function setFiscalYrs() {
    var new_fiscal_yrs = $('#mod_new_yrs').html();
    
    m_fiscal_yrs_id = db_insertFiscalYrs(new_fiscal_yrs);
    db_updateFiscalYrsActive(new_fiscal_yrs);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getVotingDate() {    
    $('#mod_voting_date_start').val(m_voting_start);
    $('#mod_voting_date_end').val(m_voting_end);
}

function setVotingDate(start_date, end_date) {
    var result = new Array();
    result = db_getVotingDate(m_fiscal_yrs_id);
    
    if (result.length === 1) {
        db_updateVotingDate(m_fiscal_yrs_id, start_date, end_date);
    }
    else {
        db_insertVotingDate(m_fiscal_yrs_id, start_date, end_date);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getImageFileInfo() {
    var file = $('#mod_speaker_pic').get(0).files[0];
    var f_name = file.name.replace(/#/g, "");
    
    if (typeof file !== "undefined") {
        var f_extension = getFileExtension(f_name);
        if (f_extension !== "jpg" && f_extension !== "jpeg") {
            swal({title: "Warning", text: "Only jpeg/jpg file can be upload", type: "warning"});
            $('#mod_speaker_pic').filestyle('clear');
            return false;
        } 
        else {   
            if (file.size >= 1000000) {
                swal({title: "Warning", text: "Attached file size is too big, max. file size allow is 1Mb or less", type: "warning"});
                $('#mod_speaker_pic').filestyle('clear');
                return false;
            }
            else {
                return true;
            }
        }
    }
    else {
        return false;
    }
}

function convertImageFiletoBase64() {
    var file = $('#mod_speaker_pic').get(0).files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        m_base64_data = reader.result;
        $('#mod_speaker_img').attr('src', m_base64_data);
    };

    if (file) {
        reader.readAsDataURL(file);
    } 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addSpeakerToDB() {
    var speaker_name = $.trim(textReplaceApostrophe($('#mod_speaker_mame').val()));
    var speaker_bio = textReplaceApostrophe($('#mod_speaker_bio').val());

    m_speaker_id = db_insertSpeaker(m_fiscal_yrs_id, speaker_name, speaker_bio, m_base64_data);
    setSpeakerHTML(m_speaker_id);
    setSpeakerInfoHTML(m_speaker_id, speaker_name, speaker_bio, m_base64_data);
}

function updateSpeakerToDB() {
    var speaker_name = $.trim(textReplaceApostrophe($('#mod_speaker_mame').val()));
    var speaker_bio = textReplaceApostrophe($('#mod_speaker_bio').val());
    
    if (db_updateSpeakerInfo(m_fiscal_yrs_id, m_speaker_id, speaker_name, speaker_bio, m_base64_data)) {
        setSpeakerInfoHTML(m_speaker_id, speaker_name, speaker_bio, m_base64_data);
    }
}