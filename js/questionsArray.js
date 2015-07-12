var questions =
[
	{
		"qID": 0,
		"qText": "This is a dumb first question",
		"qShortText": "dumb",
		"nextQ": 123,
		"responses":
		[
			{
				"rText": "This is a response for a dumb question",
				"rShortText": "dumb1",
				"rCorrect": true,
				"displayOp": 345
			},
			{
				"rText": "this answer is wrong somehow",
				"rShortText": "somehow wrong",
				"rCorrect": false,
				"displayOp": 2525
			},
			{
				"rText": "This trick question is also wrong",
				"rShortText": "trick wrong",
				"rCorrect": false
			}
		]
	},
	{
		"qID": 1234,
		"qText": "What is the answer to this question?",
		"qShortText": "this question",
		"nextQ": "ending",
		"multiple": false,
		"responses":
		[
			{
				"rText": "This is the answer to this question!",
				"rShortText": "the answer",
				"rCorrect": true,
				"nextQ": "ending",
				"displayOp": 1
			},
			{
				"rText": "This is not the answer to this question",
				"rShortText": "not the answer",
				"rCorrect": false,
				"displayOp": 2
			},
			{
				"rText": "This is the third answer I guess",
				"rShortText": "third answer",
				"rCorrect": false,
				"displayOp": 135
			}
		]
	}
];