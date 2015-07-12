// Called when window loads; sets getParams and calls renderQuestion
function baselineOnLoad(){
	window.getParams = parseURLParams();
	renderQuestion();
}

// Called to render a question. (Indented functions are helpers.)
function renderQuestion(){
	if (typeof window.qPath == 'undefined') callFile("get_question_path",{"participant_id":window.getParams["participant_id"]},"renderQuestionCallback1");
	else drawQuestion();
}
	// Helper functions for getQuestion, allowing script progress to be delayed until AJAX completion
	function drawQuestion(){
		if (window.qPath == "") window.qPath="1";
		var qPathArray = window.qPath.split(",");
		if (qPathArray.length==0){ qPathArray[0] = 0; }
		window.question = window.questions[questionWithID(qPathArray[qPathArray.length-1])];
		document.getElementById("question").innerHTML = window.question.qText;
		var responsesText="<form id=\"responseForm\">";
		for (var i=0;i<window.question.responses.length;++i) {
			responsesText += "\n<input type =\"";
			if (window.question.multiple == true) responsesText += "checkbox";
			else responsesText += "radio";
			responsesText += "\" name=\"response\" id=\"response" + i + "\" value=\"response" + i + "\" /><label for=\"response" + i + "\" onClick=\"selectResponse("+i+")\">" + window.question.responses[i].rText + "</label><br />";
		}
		responsesText += "\n<button type=\"button\">Submit</button>\n</form>";
		document.getElementById("answers").innerHTML = responsesText;
	}
	function renderQuestionCallback1(args){
		window.qPath = args;
		drawQuestion();
	}

// returns -1 if question does not exist
function questionWithID(id){
	var i = 0;
	while(i < window.questions.length){
		if (window.questions[i].qID == id) return i;
		i++;
	}
	return -1;
}


// Called when a response is selected. (Indented functions are helpers.)
function selectResponse(rID){
	if (window.responseID == rID) return;
	window.responseID = rID;
	if (typeof window.dOpsHistory == 'undefined'){
		callFile("get_displayOps_history",{"participant_id":window.getParams["participant_id"]},"getDOpsHistory_SR");
	}
	else {
		if (typeof window.sHistory == 'undefined') {
			callFile("get_selection_history",{"participant_id":window.getParams["participant_id"]},"getSelectHistory_SR");
		}
		else {
			doSelectResponse();
		}
	}
}

	// helper functions for selectResponse; uses window.responseID
	function getDOpsHistory_SR(args){
		window.dOpsHistory = args;
		if (typeof window.sHistory == 'undefined') {
			callFile("get_selection_history",{"participant_id":window.getParams["participant_id"]},"getSelectHistory_SR");
		}
		else {
			doSelectResponse();
		}
	}
	function getSelectHistory_SR(args){
		window.sHistory = args;
		doSelectResponse();
	}
	function doSelectResponse(){
		if (window.question.multiple==true) {
			// multiple-choice question...
			if (!document.getElementById("response"+window.responseID).checked) {
				// selecting...
			}
			else {
				// deselecting...
			}
		}
		else {
			// single choice question...
			if (!document.getElementById("response"+window.responseID).checked) {
				// selecting; doing actions...
				if(document.getElementById("responseForm").elements["response"].value != "") {
					// something was selected before
				}
				else {
					// something was NOT selected before
				}
			}
			else {
				// is already selected; doing nothing
			}
		}
	}

	
	
function redrawImage(){
	alert("redrawing image!");
}