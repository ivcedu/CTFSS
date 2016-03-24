<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');
    $ShowEditButton = filter_input(INPUT_POST, 'ShowEditButton');
    
    $sql_edit_button = "";
    if ($ShowEditButton === "true") {
        $sql_edit_button = "'<a href=# id=''rating_user_id_' + CONVERT(NVARCHAR(255), RatingUserID) + '''><i class=''fa fa-edit''></i></a>' AS RatingUserID ";
    }
    else {
        $sql_edit_button = "'' AS RatingUserID ";
    }

    $query = "SELECT RUName, RUEmail, "
            . $sql_edit_button
            . "FROM [IVCCTFSS].[dbo].[RatingUser] "
            . "WHERE FiscalYrsID = '" . $FiscalYrsID . "' "
            . "ORDER BY RUName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);