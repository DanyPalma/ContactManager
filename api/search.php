<?php

    $in_data = getRequestInfo();

    $name = $in_data["Name"];
    $user_ID = $in_data["userId"];

    $conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo");
    if( $conn->connect_error)
    {
        returnWithError( $conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare('SELECT * FROM Contacts WHERE (LOWER(FirstName) LIKE LOWER(?) OR LOWER(LastName) LIKE LOWER(?)) AND User_ID = ?');
        //  OR (LOWER(CONCAT(FirstName, \' \', LastName)) LIKE LOWER(?))
        // SELECT * FROM Contacts WHERE (LOWER(FirstName) LIKE LOWER("%LUKE APPLESEED%") OR LOWER(LastName) LIKE LOWER("%LUKE APPLESEED%"))       OR (LOWER(CONCAT(FirstName, ' ', LastName)) LIKE LOWER("%LUKE APPLESEED%")) AND User_ID = 7;
        $query = "%" . $name . "%";
        $stmt->bind_param("sss", $query, $query, $user_ID);
        $stmt->execute();

        $result = $stmt->get_result();

        $contacts = array();

        while ($row = $result->fetch_assoc()) {
            $contacts[] = $row;
        }
    
        if (empty($contacts)) 
        {
            returnWithError("No Records Found");
        }
        else 
        {
            returnWithInfo($contacts);
        }

        $stmt->close();
        $conn->close();
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

    function returnWithInfo( $contacts ) 
    {
        $retValue = json_encode($contacts);

        sendResultInfoAsJson($retValue);
    }
	
	

?>