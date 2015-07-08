<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $Median = filter_input(INPUT_POST, 'Median');
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[SpeakerMedian] (FiscalYrsID, SpeakerID, Median) "
                ."VALUES ('$FiscalYrsID', '$SpeakerID', '$Median')";  
    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);