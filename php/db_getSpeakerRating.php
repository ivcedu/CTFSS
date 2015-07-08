<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $RatingUserID = filter_input(INPUT_POST, 'RatingUserID');

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[SpeakerRating] "
            ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerID = '".$SpeakerID."' AND RatingUserID = '".$RatingUserID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);