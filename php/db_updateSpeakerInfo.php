<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $SpeakerName = filter_input(INPUT_POST, 'SpeakerName');
    $SpeakerBio = filter_input(INPUT_POST, 'SpeakerBio');
    $SpeakerPic = filter_input(INPUT_POST, 'SpeakerPic');
    
    $SpeakerName = str_replace("'", "''", $SpeakerName);
    $SpeakerBio = str_replace("'", "''", $SpeakerBio);

    $query = "UPDATE [IVCCTFSS].[dbo].[Speaker] "
                ."SET SpeakerName = '".$SpeakerName."', SpeakerBio = '".$SpeakerBio."', SpeakerPic = '".$SpeakerPic."' "
                ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerID = '".$SpeakerID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);