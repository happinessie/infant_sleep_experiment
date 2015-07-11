function renderQuestion(){
	var getData = parseURLParams();
	if (typeof window.qPath == 'undefined') callFile("get_question_path",{"participant_id":getData["participant_id"]},"renderQuestionCallback1");
	else drawQuestion();
}
	// Helper functions for getQuestion, allowing script progress to be delayed until AJAX completion
	function drawQuestion(){
		if (window.qPath == "") window.qPath="1";
		var qPathArray = window.qPath.split(",");
		if (qPathArray.length==0){ qPathArray[0] = 0; alert("qPathArray is empty..."); }
		window.question = window.questions[qPathArray[qPathArray.length-1]];
		document.getElementById("question").innerHTML = window.question.qText;
		var responsesText="<form>";
		for (var i=0;i<window.question.responses.length;++i) {
			responsesText += "\n<input type =\"";
			if (window.question.multiple == true) responsesText += "checkbox";
			else responsesText += "radio";
			responsesText += "\" name=\"response\" id=\"response" + i + "\" value=\"response" + i + "\" /><label for=\"response" + i + "\">" + window.question.responses[i].rText + "</label><br />";
		}
		responsesText += "\n</form>";
		document.getElementById("answers").innerHTML = responsesText;
	}
	function renderQuestionCallback1(args){
		window.qPath = args;
		drawQuestion();
	}