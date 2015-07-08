<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $RatingUserID = filter_input(INPUT_POST, 'RatingUserID');

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[RatingUser] WHERE FiscalYrsID = '".$FiscalYrsID."' AND RatingUserID = '".$RatingUserID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);