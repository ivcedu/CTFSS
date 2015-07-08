<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    
    $query_1 = "DELETE [IVCCTFSS].[dbo].[SpeakerMean] WHERE FiscalYrsID = '".$FiscalYrsID ."' AND SpeakerID = '".$SpeakerID."'";
    $query_2 = "DELETE [IVCCTFSS].[dbo].[SpeakerMedian] WHERE FiscalYrsID = '".$FiscalYrsID ."' AND SpeakerID = '".$SpeakerID."'";
    $query_3 = "DELETE [IVCCTFSS].[dbo].[SpeakerRating] WHERE FiscalYrsID = '".$FiscalYrsID ."' AND SpeakerID = '".$SpeakerID."'";
    $query_4 = "DELETE [IVCCTFSS].[dbo].[Speaker] WHERE FiscalYrsID = '".$FiscalYrsID ."' AND SpeakerID = '".$SpeakerID."'";
    
    $cmd = $dbConn->prepare($query_1);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query_2);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query_3);
    $result = $cmd->execute();
    
    $cmd = $dbConn->prepare($query_4);
    $result = $cmd->execute();
    
    echo json_encode($result);