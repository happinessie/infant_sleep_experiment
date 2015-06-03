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

	$sql = "SELECT * FROM `Participants` WHERE participant_id = ".$_GET["participant_id"];
	$results = mysqli_query($conn,$sql);
	
	if($results){
		$row = mysqli_fetch_array($results);
		$phase = $row["exp_phase"];
		
		$result_URL = NULL;
		
		switch ($phase):
			case "entry":
				$result_URL = "entry.html";
				break;
			case "baseline_pre":
				$result_URL = "create.html";
				break;
			case "generalization_pre":
				$result_URL = "assess.html";
				break;
			case "instruction":
				$result_URL = "guidelines.html";
				break;
			case "modelling":
				$result_URL = "good_example.html";
				break;
			case "rehearsal-feedback":
				$result_URL = "create.html?";
				break;
			case "baseline_post":
				$result_URL = "create.html";
				break;
			case "generalization_post":
				$result_URL = "assess.html";
				break;
			case "exit":
				$result_URL = "exit.html";
				break;
			default:
				$result_URL = "entry.html";
		endswitch;
		
		$sql = "UPDATE `Participants` SET exp_condition='".$new_condition."', exp_phase=`".$new_phase."` exp_iteration=".$new_iteration." WHERE participant_id = ".$_GET["participant_id"];
		$results = mysqli_query($conn,$sql);

		echo($result_URL);
	}
	else {
		echo("ERROR: No participant found!");
	}
?>