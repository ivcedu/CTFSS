<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $SpeakerName = filter_input(INPUT_POST, 'SpeakerName');
    
    $SpeakerName = str_replace("'", "''", $SpeakerName);

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[Speaker] WHERE FiscalYrsID = '".$FiscalYrsID."' AND SpeakerName = '".$SpeakerName."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);