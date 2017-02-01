<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $RatingUserID = filter_input(INPUT_POST, 'RatingUserID');
    $RUName = filter_input(INPUT_POST, 'RUName');
    $RUEmail = filter_input(INPUT_POST, 'RUEmail');
    
    $RUName = str_replace("'", "''", $RUName);
    $RUEmail = str_replace("'", "", $RUEmail);

    $query = "UPDATE [IVCCTFSS].[dbo].[RatingUser] "
                ."SET RUName = '".$RUName."', RUEmail = '".$RUEmail."' "
                ."WHERE FiscalYrsID = '".$FiscalYrsID."' AND RatingUserID = '".$RatingUserID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);