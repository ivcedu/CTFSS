<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $Median = filter_input(INPUT_POST, 'Median');

    $query = "UPDATE [IVCCTFSS].[dbo].[SpeakerMedian] "
                ."SET Median = '".$Median."' "
                ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerID = '".$SpeakerID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);