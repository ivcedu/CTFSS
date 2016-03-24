<?php
    require("config.php");
    
    $FiscalYrsID = filter_input(INPUT_POST, 'FiscalYrsID');

    $query = "SELECT spkr.*, skmd.Median, skmn.Mean "
            . "FROM [IVCCTFSS].[dbo].[Speaker] AS spkr LEFT JOIN [IVCCTFSS].[dbo].[SpeakerMedian] AS skmd ON spkr.SpeakerID = skmd.SpeakerID "
            . "LEFT JOIN [IVCCTFSS].[dbo].[SpeakerMean] AS skmn ON spkr.SpeakerID = skmn.SpeakerID "
            . "WHERE spkr.FiscalYrsID = '" . $FiscalYrsID . "' "
            . "ORDER BY spkr.SpeakerName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);