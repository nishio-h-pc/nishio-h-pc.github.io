//test();
async function test(){
	chr("chr/test.png");
	msg="・・・";
	await text();
	await chr("chr/test.png");
	msg="後日、海原 浩之君のクラスは特別指導を受けたようだが、その虐めの主犯格であった神取 祐司君は、もう和解したい。と思っていたようで、当人はすんなりと海原 浩之君を受け入れようとした。";
	await text();
	alert(await slct(["誰とは・・・？","え・・・？","誰かの仕業と断定できるのですか・・・？"]));
	await srvy("../document/小説　分岐_LI.jpg",
	[
		["130,90,254,130,130,170,5,130",async function(){msg="「証拠品が物Ⅰを除いてそろっているか」だそうだ。";await text();srend()}],
		["130,240,259,275,130,310,0,275",async function(){msg="「推理シーケンスで失敗を三回未満に抑えられたか。」だそうだ。";await text();await srend()}],
		["130,390,259,425,130,460,0,425",async function(){msg="「物Ⅰを入手しているか。」だそうだ。";await text();srend()}],
		["130,505,212,525,130,545,48,525",async function(){msg="「誰を疑うか。」だそうだ。";await text();srend()}]
	]
	);
}
