<?php

    $in_data = getRequestInfo();

    $first_name = $in_data["FirstName"];
    $last_name = $in_data["LastName"];
    $phone_number = $in_data["Phone"];
    $email = $in_data["Email"];
    $user_id = $in_data["UserID"];

    $conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo");
    if( $conn->connect_error)
    {
        returnWithError( $conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, User_ID) VALUES (?,?,?,?,?)");
        $stmt->bind_param("sssss", $first_name, $last_name, $phone_number, $email, $user_id);
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