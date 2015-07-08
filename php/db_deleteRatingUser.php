<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $RatingUserID = filter_input(INPUT_POST, 'RatingUserID');

    $query_1 = "DELETE [IVCCTFSS].[dbo].[SpeakerRating] WHERE FiscalYrsID = '".$FiscalYrsID ."' AND RatingUserID = '".$RatingUserID."'";
    $query_2 = "DELETE [IVCCTFSS].[dbo].[RatingUser] WHERE FiscalYrsID = '".$FiscalYrsID ."' AND RatingUserID = '".$RatingUserID."'";
    
    $cmd = $dbConn->prepare($query_1);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query_2);
    $result = $cmd->execute();
    
    echo json_encode($result);