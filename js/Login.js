var display_name = "";
var email = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {  
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        if(loginInfo()) {
            $('#error_msg').html("");
            $('#logn_error').hide();

            var login_access = accessCTFSS();
            if (login_access === "admin") {
                window.open('admin.html', '_self');
                return false;
            }
            else if (login_access === "rating_user") {
                window.open('rating.html', '_self');
                return false;
            }
            else {
                swal({title: "Access Denied", text: "You are not a member of commencement task force", type: "error"});
                return false;
            }
        }
        else {
            $('#error_msg').html("Invalid username or password");
            $('#logn_error').show();
            return false;
        }
    });
    
    $.backstretch(["images/ctfss_back_web_1.jpg"], {duration: 3000, fade: 750});
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var result = new Array();
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    var password = $('#password').val();
    
    result = getLoginUserInfo("php/login.php", username, password);
    if (result.length === 0) {
        result = getLoginUserInfo("php/login_student.php", username, password);
    }
    
    if (result.length === 0) {
        return false;
    }
    else {
        display_name = result[0];
        email = result[1];
        
        if (email === null || typeof email === 'undefined') {
            swal({title: "Login Error", text: "There was an error getting login user information from Active Direcy please try again", type: "error"});
            return false;
        }
        else {
            return true;
        }
    }
}

function accessCTFSS() {
    var result = new Array();
    result = db_getAdminByEmail(email);
    if (result.length > 0) {
        localData_login(display_name, email, "Admin");
        return "admin";
    }
    else {
        result = db_getRatingUserByEmail(email);
        if (result.length > 0) {
            localData_login(display_name, email, "RatingUser");
            return "rating_user";
        }
        else {
            return "";
        }
    }
}