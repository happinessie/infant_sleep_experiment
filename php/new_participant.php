<?php

	$servername = "localhost";
	$username = "webadmin";
	$password = "ieeecs";
	$dbname = "infant_sleep";
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	if(array_key_exists("id",$_GET)){
		$sql = "INSERT INTO `Participants` (participant_id, exp_condition, exp_phase, exp_iteration) VALUES (".$_GET["id"].",".rand(1,3).",'entry',1)";
		$results = mysqli_query($conn,$sql);
		
		if($results){
			echo("OK");
		}
		else {
			echo("ERROR: ".$conn->error);
		}
	}
	else{
		echo("ERROR: No ID passed");
	}
?>