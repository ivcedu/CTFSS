// get AD login info ///////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// get DB //////////////////////////////////////////////////////////////////////
function db_getAdminByEmail(LoginEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByEmail.php",
        data:{LoginEmail:LoginEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getRatingUserByEmail(LoginEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getRatingUserByEmail.php",
        data:{LoginEmail:LoginEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFiscalYrsActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFiscalYrsActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerList(FiscalYrsID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerList.php",
        data:{FiscalYrsID:FiscalYrsID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerListResult(FiscalYrsID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerListResult.php",
        data:{FiscalYrsID:FiscalYrsID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerInfo(FiscalYrsID, SpeakerID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerInfo.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerByName(FiscalYrsID, SpeakerName) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerByName.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerName:SpeakerName},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getRatingUserList(FiscalYrsID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getRatingUserList.php",
        data:{FiscalYrsID:FiscalYrsID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getRatingUserInfo(FiscalYrsID, RatingUserID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getRatingUserInfo.php",
        data:{FiscalYrsID:FiscalYrsID, RatingUserID:RatingUserID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerRating(FiscalYrsID, SpeakerID, RatingUserID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerRating.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, RatingUserID:RatingUserID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerRatingList(FiscalYrsID, SpeakerID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerRatingList.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerMedian(FiscalYrsID, SpeakerID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerMedian.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSpeakerMean(FiscalYrsID, SpeakerID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSpeakerMean.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getVotingDate(FiscalYrsID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getVotingDate.php",
        data:{FiscalYrsID:FiscalYrsID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////
function db_insertFiscalYrs(FiscalYrs) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFiscalYrs.php",
        data:{FiscalYrs:FiscalYrs},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSpeaker(FiscalYrsID, SpeakerName, SpeakerBio, SpeakerPic) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSpeaker.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerName:SpeakerName, SpeakerBio:SpeakerBio, SpeakerPic:SpeakerPic},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertRatingUser(FiscalYrsID, RUName, RUEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertRatingUser.php",
        data:{FiscalYrsID:FiscalYrsID, RUName:RUName, RUEmail:RUEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSpeakerRating(FiscalYrsID, SpeakerID, RatingUserID, Rating) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSpeakerRating.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, RatingUserID:RatingUserID, Rating:Rating},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSpeakerMedian(FiscalYrsID, SpeakerID, Median) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSpeakerMedian.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, Median:Median},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSpeakerMean(FiscalYrsID, SpeakerID, Mean) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSpeakerMean.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, Mean:Mean},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertVotingDate(FiscalYrsID, StartDate, EndDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertVotingDate.php",
        data:{FiscalYrsID:FiscalYrsID, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function db_updateSpeakerInfo(FiscalYrsID, SpeakerID, SpeakerName, SpeakerBio, SpeakerPic) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSpeakerInfo.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, SpeakerName:SpeakerName, SpeakerBio:SpeakerBio, SpeakerPic:SpeakerPic},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateRatingUserInfo(FiscalYrsID, RatingUserID, RUName, RUEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateRatingUserInfo.php",
        data:{FiscalYrsID:FiscalYrsID, RatingUserID:RatingUserID, RUName:RUName, RUEmail:RUEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSpeakerRating(FiscalYrsID, SpeakerID, RatingUserID, Rating) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSpeakerRating.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, RatingUserID:RatingUserID, Rating:Rating},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSpeakerMedian(FiscalYrsID, SpeakerID, Median) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSpeakerMedian.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, Median:Median},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSpeakerMean(FiscalYrsID, SpeakerID, Mean) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSpeakerMean.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID, Mean:Mean},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateVotingDate(FiscalYrsID, StartDate, EndDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateVotingDate.php",
        data:{FiscalYrsID:FiscalYrsID, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
function db_deleteSpeaker(FiscalYrsID, SpeakerID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteSpeaker.php",
        data:{FiscalYrsID:FiscalYrsID, SpeakerID:SpeakerID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_deleteRatingUser(FiscalYrsID, RatingUserID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteRatingUser.php",
        data:{FiscalYrsID:FiscalYrsID, RatingUserID:RatingUserID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}