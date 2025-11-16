
function checkAnswers(){
	let score=0;
	const total=5;
	const answers={
		q1:["a1"],
		q2:["a2","b2","c2"],
		q3:["b3"],
		q4:["a4","b4","d4"],
		q5:["b5"]
	}

	for(let i=1;i<=total;i++){
		const inputs=document.querySelectorAll(`input[name="q${i}"]`);
		const selected=Array.from(inputs).filter(input=>input.checked).map(input=>input.id);
		console.log(inputs);
		console.log(selected);
		if(selected.length === answers[`q${i}`].length &&
		   selected.every(val=>answers[`q${i}`].includes(val)))
			score++;
	}

	document.getElementById("result").textContent = score;
}

function reset(){
	const inputs = Array.from(document.querySelectorAll("input"));

	for(let i=0; i<inputs.length; i++) {
		inputs[i].checked = false;
		console.log(inputs[i]);
	};

	document.getElementById("result").textContent="?";
}
