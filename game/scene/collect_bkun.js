async function run(){
	await srvy("bg/map_in_the_classroom.jpg",
	[
		["696,106,731,107,730,141,698,144",async ()=>{
			await artxt([
				"これは・・・学校の見取り図？",

				"事件が起こった場所は、ココとココとココ。そして、体育館はココ。",

				"使えるかもしれないな。一応持っていこう。",

				"・・・進展だ。【学校の見取り図を手に入れた。】"

			]);
			srend();
			sdata.push(10);
		}]
	]
	);
	scenarioFile = "10-3/1.json";
	await main();
}