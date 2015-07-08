<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $query = "INSERT INTO [IVCCTFSS].[dbo].[VotingDate] (FiscalYrsID, StartDate, EndDate) "
                ."VALUES ('$FiscalYrsID', '$StartDate', '$EndDate')";  
    
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);