<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');
    $Mean = filter_input(INPUT_POST, 'Mean');

    $query = "UPDATE [IVCCTFSS].[dbo].[SpeakerMean] "
                ."SET Mean = '".$Mean."' "
                ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerID = '".$SpeakerID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);