<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $RatingUserID = filter_input(INPUT_POST, 'RatingUserID');
    $Rating = filter_input(INPUT_POST, 'Rating');

    $query = "UPDATE [IVCCTFSS].[dbo].[SpeakerRating] "
                ."SET Rating = '".$Rating."' "
                ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerID = '".$SpeakerID."' AND RatingUserID = '".$RatingUserID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);