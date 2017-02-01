<?php
    require("config.php");
    
    $LoginEmail = filter_input(INPUT_POST, 'LoginEmail');
    
    $LoginEmail = str_replace("'", "", $LoginEmail);

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[RatingUser] WHERE RUEmail = '" . $LoginEmail . "'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);