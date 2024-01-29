<?php

    $in_data = getRequestInfo();

    $first_name = $in_data["FirstName"];
    $first_name = "\"%" + $first_name + "%\"";

    $conn = new mysqli("localhost", "Group2API", "8123uasyewt2", "UserInfo");
    if( $conn->connect_error)
    {
        returnWithError( $conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("SELECT * FROM Contacts where FirstName like ?");
        $stmt->bind_param("s", $first_name);
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