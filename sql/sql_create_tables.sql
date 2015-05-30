USE infant_sleep;

CREATE TABLE Participants
(
	participant_id int NOT NULL,
	exp_condition int NOT NULL,
	exp_phase varchar(40) NOT NULL,
	exp_iteration int NOT NULL,
	PRIMARY KEY (participant_id)
);

CREATE TABLE Responses
(
	response_id int NOT NULL AUTO_INCREMENT,
	participant_id int NOT NULL,
	exp_condition int NOT NULL,
	exp_phase varchar(40) NOT NULL,
	exp_iteration int NOT NULL,
	question varchar(40) NOT NULL,
	response varchar(40) NOT NULL,
	safe boolean,
	submitted boolean,
	final boolean,
	PRIMARY KEY (response_id)
);