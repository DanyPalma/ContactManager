<?php

    $in_data = getRequestInfo();

    $first_name = $in_data["FirstName"];

    $conn = new mysqli("localhost", "Group2API", "813uasyewt2", "UserInfo");
    if( $conn->connect_error)
    {
        returnWithError ( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("SELECT * FROM Contacts")
        //$stmt->bind_param("s", $first_name);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
    }


    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError( $err )
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }

?>