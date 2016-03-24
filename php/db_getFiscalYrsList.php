<?php
    require("config.php");

    $query = "SELECT * FROM [IVCCTFSS].[dbo].[FiscalYrs] ORDER BY FiscalYrsID DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);