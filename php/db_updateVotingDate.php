<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "UPDATE [IVCCTFSS].[dbo].[VotingDate] "
                ."SET StartDate = '".$StartDate."', EndDate = '".$EndDate."' "
                ."WHERE FiscalYrsID = '".$FiscalYrsID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);