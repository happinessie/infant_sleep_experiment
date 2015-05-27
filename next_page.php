<?php

	$servername = "localhost";
	$username = "webadmin";
	$password = "ieeecs";
	$dbname = "ieeecs";
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
		$condition = $row["exp_condition"];
		$iteration = $row["exp_iteration"];
	}
	$new_phase = NULL;
	$new_condition = $condition;
	$new_iteration = NULL;
	$result_URL = NULL;
	
	switch ($phase):
		case "entry":
			$new_phase = "baseline_pre";
			$result_URL = "create.html";
			$new_condition = rand(1,3);
			break;
		case "baseline_pre":
			$new_phase = "generalization_pre";
			$result_URL = "assess.html";
			break;
		case "instruction":
			if ($condition==1) {
				$new_phase = "baseline";
				$result_URL = "create.html";
			}
			if ($condition==2 || $condition==3) {
				$new_phase = "modelling";
				$result_URL = "good_example.html";
			}
			if ($condition < 1 || $condition > 3) {
				$result_URL = "ERRORL Invalid condition!";
			}
			break;
		case "modelling":
			$new_phase = "rehearsal-feedback";
			$result_URL = "create.html?";
			break;
		case "rehearsal-feedback":
			$new_phase = "baseline";
			$result_URL = "create.html";
			break;
		case "baseline":
			if ($condition==1 || $condition==2) {
				$new_phase = "generalization_post";
				$result_URL = "assess.html";
			}
			if ($condition==3) {
				if ($_GET["pass"] == true){
					$new_phase = "generalization_post";
					$result_URL = "assess.html";
				}
				else{
					$new_phase = "instruction";
					$result_URL = "guidelines.html";
					$new_iteration = $iteration + 1;
				}
			}
			if ($condition < 1 || $condition > 3) {
				$result_URL = "ERRORL Invalid condition!";
			}
			break;
		case "generalization_post":
			$new_phase = "exit";
			$result_URL = "exit.html";
			break;
		default:
			$new_phase = "entry";
			$result_URL = "entry.html";
	endswitch;

	echo($result_URL);
?>