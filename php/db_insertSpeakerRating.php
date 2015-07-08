<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $RatingUserID = filter_input(INPUT_POST, 'RatingUserID');
    $Rating = filter_input(INPUT_POST, 'Rating');
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[SpeakerRating] (FiscalYrsID, SpeakerID, RatingUserID, Rating) "
                ."VALUES ('$FiscalYrsID', '$SpeakerID', '$RatingUserID', '$Rating')";  
    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);