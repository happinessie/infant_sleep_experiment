USE infant_sleep;

CREATE TABLE Participants
(
	participant_id int,
	exp_condition int,
	exp_phase varchar(40),
	exp_iteration int
);

CREATE TABLE Responses
(
	response_id int,
	participant_id int,
	exp_condition int,
	exp_phase varchar(40),
	exp_iteration int,
	question varchar(40),
	response varchar(40),
	safe boolean,
	submitted boolean,
	final boolean
);