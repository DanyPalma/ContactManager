<?php

	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["Phone"];
	$password = $inData["Email"];

	$conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{   # may need to insert here contact id to diff. contacts per diff. user
		$stmt = $conn->prepare("INSERT into Contacts (firstName,lastName,Phone,Email) VALUES (?,?)");
		$stmt->bind_param("ss", $firstName, $lastName, $Phone, $Email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("close complete");
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