<?php

    $in_data = getRequestInfo();

    $id = $in_data["ID"];
    $first_name = $in_data["FirstName"];
    $last_name = $in_data["LastName"];
    $phone = $in_data["Phone"];
    $email = $in_data["Email"];

    $conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo");
    if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName = ?, LastName = ?, Phone = ?, Email = ? WHERE ID = ?");
		$stmt->bind_param("sssss", $first_name, $last_name, $phone, $email, $id);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>