<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[RatingUser] WHERE FiscalYrsID = '" . $FiscalYrsID . "'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);