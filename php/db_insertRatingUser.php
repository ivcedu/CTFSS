<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $RUName = filter_input(INPUT_POST, 'RUName');
    $RUEmail = filter_input(INPUT_POST, 'RUEmail');
    
    $RUName = str_replace("'", "''", $RUName);
    $RUEmail = str_replace("'", "", $RUEmail);
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[RatingUser] (FiscalYrsID, RUName, RUEmail) "
                ."VALUES ('$FiscalYrsID', '$RUName', '$RUEmail')";  
    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);