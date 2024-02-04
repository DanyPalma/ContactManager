<?php

    $in_data = getRequestInfo();

    $search_name = $in_data["SearchName"];
    $user_ID = $in_data["UserID"];

    $conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo");
    if( $conn->connect_error)
    {
        returnWithError( $conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare('SELECT * FROM Contacts where LOWER(FirstName) like LOWER(?) and User_ID = ?');
        $query = "%" . $search_name . "%";
        $stmt->bind_param("ss", $query, $user_ID);
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