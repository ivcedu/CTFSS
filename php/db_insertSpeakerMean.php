<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $Mean = filter_input(INPUT_POST, 'Mean');
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[SpeakerMean] (FiscalYrsID, SpeakerID, Mean) "
                ."VALUES ('$FiscalYrsID', '$SpeakerID', '$Mean')";  
    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);