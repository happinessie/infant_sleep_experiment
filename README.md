# infant_sleep_experiment
Web app for participants in an experiment attempting to teach parents safe infant sleeping practices

Documents:
* infant_sleep_experiment: flowchart of experimental procedure
* infant_sleep_experiment_state_diagram: diagram of states (with URL) transitions
	- cur_page.php returns current state, transitions are handled by next_page.php
* infant-sleep_files_needed: list of files needed to complete project. (may not be exhaustive.)
* infant-sleep_experiment_phases: list of phases in experiment

Tasks To Do:
* Find clipart (Jillian, Nessie, Jeremy)
	- e.g. morguefile.com, list others here if they are useful
* Write javascript array for questions
	- Display operations
	- Asset operations
	- Questions
		- Responses
* Define appropriate display and asset operations based on questions
* Figure out how to run multiple-choice questions (Jeremy)
* Figure out how to do continual reporting of selections, not just submissions (Jeremy)
* Write intro/instruction pages (Jillian)
* Write HTML pages with CSS as structure for phases (Nessie)
* Write PHP pages for next_page and current_page (Jeremy, Nessie)
	- next_page.php
	- cur_page.php
	- new_participant.php

Completed Tasks:
* Write SQL database (Jeremy)
	- Participants table
	- Responses table
