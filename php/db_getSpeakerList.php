<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[Speaker] "
            . "WHERE FiscalYrsID = '".$FiscalYrsID."' "
            . "ORDER BY SpeakerName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);