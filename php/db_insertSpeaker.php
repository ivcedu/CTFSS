<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerName = filter_input(INPUT_POST, 'SpeakerName');
    $SpeakerBio = filter_input(INPUT_POST, 'SpeakerBio');
    $SpeakerPic = filter_input(INPUT_POST, 'SpeakerPic');
    
    $SpeakerName = str_replace("'", "''", $SpeakerName);
    $SpeakerBio = str_replace("'", "''", $SpeakerBio);
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[Speaker] (FiscalYrsID, SpeakerName, SpeakerBio, SpeakerPic) "
                ."VALUES ('$FiscalYrsID', '$SpeakerName', '$SpeakerBio', '$SpeakerPic')";  
    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);