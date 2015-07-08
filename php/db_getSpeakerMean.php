<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerID = filter_input(INPUT_POST, 'SpeakerID');

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[SpeakerMean] "
            ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerID = '".$SpeakerID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);