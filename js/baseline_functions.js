// Called when window loads; sets getParams and calls renderQuestion
function baselineOnLoad(){
	window.getParams = parseURLParams();
	renderQuestion();
}

// TODO: Load selection history!!!
// Called to render a question. (Indented functions are helpers.)
function renderQuestion(){
	if (typeof window.qPath == 'undefined') callFile("get_question_path",{"participant_id":window.getParams.participant_id},"renderQuestionCallback1");
	else drawQuestion();
}
	// Helper functions for getQuestion, allowing script progress to be delayed until AJAX completion
	function drawQuestion(){
		if (window.qPath == "") window.qPath="1";
		var qPathArray = window.qPath.split(",");
		if (qPathArray.length==0){ qPathArray[0] = 0; }
		window.question = window.questions[questionWithID(qPathArray[qPathArray.length-1])];
		var questionText = window.question.qText;
		if (window.question.multiple) questionText += "<br />\n(Choose as many answers as you feel are appropriate.)";
		else questionText += "<br />\n(Choose one response from the following options.)";
		document.getElementById("question").innerHTML = questionText;
		var responsesText="";
		for (var i=0;i<window.question.responses.length;++i) {
			responsesText += "\n<p onClick=\"selectResponse("+i+")\"><img src =\"images/";
			if (window.question.multiple == true) responsesText += "checkbox";
			else responsesText += "radio_button";
			responsesText += ".png\" id=\"response" + i + "\" class=\"pseudoform_button\" checked=\"false\" /> " + window.question.responses[i].rText + "</p><br />";
		}
		responsesText += "\n<button type=\"button\">Submit</button>\n";
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
	if (window.doingSelect == true) return;
	// end if last selected option (window.responseID) is selected response (only for single choice)
	if (window.responseID == rID && window.question.multiple!=true) return;
	window.doingSelect = true;
	window.responseID = rID;
	checkButton(window.responseID);
	if (typeof window.dOpsHistory == 'undefined'){
		callFile("get_displayOps_history",{"participant_id":window.getParams.participant_id},"getDOpsHistory_SR");
	}
	else {
		if (typeof window.sHistory == 'undefined') {
			callFile("get_selection_history",{"participant_id":window.getParams.participant_id},"getSelectHistory_SR");
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
			callFile("get_selection_history",{"participant_id":window.getParams.participant_id},"getSelectHistory_SR");
		}
		else {
			doSelectResponse();
		}
	}
	function getSelectHistory_SR(args){
		window.sHistory = args;
		doSelectResponse();
	}
	// This function is kludgy as ...heck
	function doSelectResponse(){
		var thisQDOpsHistoryArr = window.dOpsHistory.split(";");
		var thisQSHistoryArr = window.sHistory.split(";");
		if (window.question.multiple==true) {
			// multiple-choice question...
			var selectedCount = 0;
			var currentDOps = "";
			var currentSs = "";
			for (i=0;i<window.question.responses.length;i++) {
				if (buttonChecked(i)) {
					if (currentDOps != ""){
						currentDOps += ",";
						currentSs += ",";
					}
					currentDOps += window.question.responses[i].displayOp;
					currentSs += i;
					selectedCount++;
				}
			}
			alert("there are "+selectedCount+" selected");
			if (selectedCount>1) {
				alert("more than one selected--this was not the only one");
				thisQDOpsHistoryArr[thisQDOpsHistoryArr.length-1] = currentDOps;
				thisQSHistoryArr[thisQSHistoryArr.length-1] = currentSs;
			} else if (selectedCount==1) {
				alert("one selected--if the current response is selected, it is the only one");
				if (buttonChecked(window.responseID)){
					alert("the current response IS selected; it is the only one");
					thisQDOpsHistoryArr[thisQDOpsHistoryArr.length] = currentDOps;
					thisQSHistoryArr[thisQSHistoryArr.length] = currentSs;
				}
				else {
					alert("the current response is NOT selected; it was not the only one");
					thisQDOpsHistoryArr[thisQDOpsHistoryArr.length-1] = currentDOps;
					thisQSHistoryArr[thisQSHistoryArr.length-1] = currentSs;
				}
			} else {
				alert("none selected--some were selected before");
				thisQDOpsHistoryArr = thisQDOpsHistoryArr.slice(0,thisQDOpsHistoryArr.length-1);
				thisQSHistoryArr = thisQSHistoryArr.slice(0,thisQSHistoryArr.length-1);
			}
		}
		else {
			// single choice question...
			var prevSelection = -1;
			for (i=0;i<window.question.responses.length && prevSelection<0;i++) {
				if (i!=window.responseID && buttonChecked(i)) prevSelection = i;
			}
			if (prevSelection > 0) {
				alert("there was a previous selection");
				thisQDOpsHistoryArr[thisQDOpsHistoryArr.length-1] = window.question.responses[window.responseID].displayOp;
				thisQSHistoryArr[thisQSHistoryArr.length-1] = window.responseID;
				checkButton(prevSelection);
			}
			else {
				alert("there was not a previous selection");
				thisQDOpsHistoryArr[thisQDOpsHistoryArr.length] = window.question.responses[window.responseID].displayOp;
				thisQSHistoryArr[thisQSHistoryArr.length] = window.responseID;
			}
		}
		window.dOpsHistory = thisQDOpsHistoryArr.join(";");
		window.sHistory = thisQSHistoryArr.join(";");
		// TODO: update database!
		redrawImage();
	}

	
	
function redrawImage(){
	alert("redrawing image!");
	alert("dOpsHistory="+window.dOpsHistory);
	alert("sHistory="+window.sHistory);
	window.doingSelect = false;
	alert("OK!!!");
}

function checkButton(id){
	var buttonImg = document.getElementById("response"+id);
	if (buttonChecked(id)) {
		buttonImg.setAttribute("checked","false");
		if (window.question.multiple) buttonImg.setAttribute("src","images/checkbox.png");
		else buttonImg.setAttribute("src","images/radio_button.png");
	}
	else {
		buttonImg.setAttribute("checked","true");
		if (window.question.multiple) buttonImg.setAttribute("src","images/checkbox_checked.png");
		else buttonImg.setAttribute("src","images/radio_button_checked.png");
	}
}
function buttonChecked(id){ return document.getElementById("response"+id).getAttribute("checked")=="true"; }