<?php
    require("config.php");
    
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    
    // update all fiscal years to inactive
    $query_1 = "UPDATE [IVCCTFSS].[dbo].[FiscalYrs] SET Active = 0";
    
    $query_2 = "INSERT INTO [IVCCTFSS].[dbo].[FiscalYrs] (FiscalYrs, Active) "
                ."VALUES ('$FiscalYrs', '1')";  
    
    $cmd_1 = $dbConn->prepare($query_1);
    $result = $cmd_1->execute();    
    
    $cmd_2 = $dbConn->prepare($query_2);
    $cmd_2->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);