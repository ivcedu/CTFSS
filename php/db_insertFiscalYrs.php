<?php
    require("config.php");
    
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[FiscalYrs] (FiscalYrs) "
                . "VALUES ('$FiscalYrs')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);