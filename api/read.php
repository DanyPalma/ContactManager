<?php

    $in_data = getRequestInfo();

    $user_id = $in_data["UserID"];

    $conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo");
    if( $conn->connect_error)
    {
        returnWithError( $conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("SELECT * FROM Contacts where User_ID = (?)");
        $stmt->bind_param("i", $user_id);
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
            returnWithInfo($contacts)
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

    function returnwithInfo( $contacts ) 
    {
        $retValue = json.encode($contacts);

        sendResultInfoAsJson($retValue);
    }
	
	

?>