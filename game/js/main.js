// 主スクリプト
var txt=document.getElementById("txt");
var txthg=async ()=>{
	var tmtxt=txt.innerHTML;
	txt.style.height="";
	txt.style.visibility="hidden";
	txt.textContent="また、今回の件を詳しく犯人に聞いたところ、自分が彼に提示した証拠のほかに、神取 祐司君の文化祭計画書も偽装していたらしい。彼は、頭が切れることが今回明らかになった。どこか、抜けているようだが・・・";
	var htext=txt.clientHeight;
	await sltbl(["どうやら、気のせい。","【海原 浩之君はクラスからいじめられている。また、神取 祐司君はその主犯格かもしれない。】","【海原 浩之はB先生に呼び出されていなかった。】"]);
	var hslc1=txt.clientHeight;
	await sltbl(["【全校集会の時、そこへいなかった人が現場付近を走り去っていた。】","【前崎 信也君が全校集会開始から約25分間、全校集会に出ず、どこかへ行っていた。】","【海原 浩之のノートを手に入れた。】"]);
	var hslc2=txt.clientHeight;
	txt.style.height="calc("+Math.max(htext,hslc1,hslc2)+"px - 1.95em)";
	txt.innerHTML=tmtxt;
	txt.style.visibility="visible";
};
txthg();
$(window).resize(txthg);
document.oncontextmenu=()=>{return false};
var img=document.getElementById("chr");
var menu=document.getElementById("men");
load("scene","evidences");
var scenarioFile = "";//現在(=current)のシナリオファイルへのパス
var isSuji = false;
var speed=99;
var msg="";
//------予備はnumberに2を指定すると使われる
var beforeJumpList = [];//一つ前の繰り返しすべて選択させる用のリスト
var beforeJumpListSub = [];//予備
var beforeOptionList = [];//↑に同じ
var beforeOptionListSub = [];//予備
var repeatSelectorIsFirst = true;//すべて選択させるリストの呼び出しは初めてか
var repeatSelectorIsFirstSub = true;//↑の予備
//--------------//plus_jumpはすでに消されたかのフラグ
var loadedScenarioList = [];//過去に読み込んだシナリオの順番記憶
var text_count = 0;//text配列をどこまで表示したかのカウンター
var suji_count = 0;//推理シーケンスで失敗した回数
var loadedObj;//読み込まれたシナリオデータ
var sdata=[0]; // セーブデータ(デフォルト)
var isZeroEvd = true;//証拠品がゼロかどうか
var stopScenario = false;//再帰の中断
var isloaded = false;//読み込み直後にmain関数が呼ばれたか
var loadf = false;//ロードした直後かどうか
ERR_SCENARIO = "json/err.json"//エラーシナリオ
//---------------以下は現在の値
var currentBgm = "";
var currentBg = "";
var currentSpd = "";
//---------------
menu.addEventListener("click",async function(){ // メニュー
	if(this.checked){
		var temp=txt.innerHTML;
		if(txt.style.display==="none"){
			var tdn_f=true;
			txt.style.display="block";
		}
		if(disp.rt)await evnpr("dsstp");
		var s=document.getElementById("s");
		if(s!==null)s.style.display="none";
		switch(await slct(["証拠品の確認","セーブ","ロード"])){
			case 0:
				var outer=document.createElement("div");
				outer.id="e";
				outer.style.overflowY="scroll";
				outer.style.position="absolute";
				outer.style.top="calc(16px + 5.25em)";
				outer.style.left="0";
				outer.style.right="0";
				var outbt=()=>outer.style.bottom=txt.clientHeight+16+"px";
				outbt();
				$(window).resize(outbt);
				outer.style.zIndex="1";
				var ff=false;
				var rmbtn=()=>{
					if(txt.style.width!==""){
						var picbt=document.getElementById("picbt");
						if(picbt.checked)picen();
						document.body.removeChild(picbt.parentNode);
						txt.style.width="";
					}
				}
				sdata.forEach((evd)=>{
					var inner=document.createElement("div");
					inner.addEventListener("click",(e)=>{
						rmbtn();
						sitem.style.background="";
						sitem=e.currentTarget;
						sitem.style.background="blue";
						var sievd=aevds[sitem.id.substr(1)];
						txt.textContent=sievd[1];
						if(sievd.length>2){
							txt.style.width="calc(100vw - "+txt.clientHeight+"px - 1.95em - 24px)";
							var label=document.createElement("label");
							var input=document.createElement("input");
							label.appendChild(input);
							input.id="picbt";
							input.type="checkbox";
							var btn=document.createElement("div");
							label.appendChild(btn);
							btn.className="msgb txt";
							btn.style.position="absolute";
							btn.style.right="0";
							btn.style.bottom="0";
							btn.style.width="calc("+txt.clientHeight+"px - 1.95em)";
							btn.style.height="calc("+txt.clientHeight+"px - 1.95em)";
							btn.style.transition=".5s";
							btn.innerHTML="<input type='checkbox' id='picbt'><svg viewBox='0 0 512 512' style='fill:white' xmlns='http://www.w3.org/2000/svg'><g><path d='M0,0v512h512V0H0z M465.975,465.975H46.025V46.025h419.95V465.975z'></path><path d='M75.693,385.429h360.614c3.604,0,6.912-1.978,8.619-5.15c1.708-3.163,1.537-7.019-0.449-10.022 L332.573,200.709c-4.53-6.867-12.205-10.992-20.437-10.992c-8.224,0.018-15.899,4.152-20.419,11.036l-78.83,119.965l-43.508-49.314 c-5.051-5.716-12.475-8.762-20.078-8.214c-7.612,0.539-14.533,4.602-18.712,10.973l-63.074,96.112 c-1.977,3.01-2.139,6.848-0.43,10.012C68.79,383.461,72.098,385.429,75.693,385.429z'></path><path d='M167.589,225.793c27.404,0,49.612-22.208,49.612-49.611c0-27.403-22.208-49.612-49.612-49.612 c-27.402,0-49.62,22.208-49.62,49.612C117.97,203.585,140.187,225.793,167.589,225.793z'></path></g></svg>";
							btn.addEventListener("click",()=>{
								if(input.checked){
									picen();
									outer.style.display="block";
								}else{
									outer.style.display="none";
									pic(sievd[2]);
								}
							});
							document.body.appendChild(label);
						}
					});
					inner.id="e"+evd;
					if(ff){
						inner.style.marginBottom="0";
					}else{
						inner.style.marginTop="0";
						sitem=inner;
						inner.dispatchEvent(new Event("click"));
						ff=true;
					}
					inner.className="msgb txt";
					inner.style.minHeight="2.2em";
					inner.textContent=aevds[evd][0];
					outer.appendChild(inner);
				});
				document.body.appendChild(outer);
				if(outer.clientWidth!==outer.offsetWidth)outer.style.marginRight="8px";
				await new Promise((resolve)=>this.addEventListener("click",resolve));
				rmbtn();
				document.body.removeChild(outer);
				break;
			case 1:
				saveObj();
				this.checked=false;
				break;
			case 2:
				if(srvy.rt){
					alert("調査画面ではロードできません。\nページを再読込してからロードして下さい。");
				}else{
					window.dispatchEvent(new Event("slent"));
					window.dispatchEvent(new Event("srend"));
					loadObj();
					this.checked=false;
					if(disp.rt){
						loadf=true;
						window.dispatchEvent(new Event("dsend"));
					}
					if(text.rt)window.dispatchEvent(new Event("enter"));
				}
				break;
		}
		if(!loadf){
			txt.innerHTML=temp;
			if(disp.rt)disp();
			if(tdn_f)txt.style.display="none";
			if(s!==null)s.style.display="";
		}
	}else{
		slct.menu=true;
		window.dispatchEvent(new Event("slend"));
	}
});
main();
async function chr(cn,flag){ // キャラクターの画像を読み出す関数
	if(flag)await new Promise((resolve)=>setTimeout(resolve,700));
	img.src=cn;
	setTimeout(()=>{
		img.style.animation="fadein .7s";
		img.style.opacity="1";
	},99);
}
function disp(){ // テキストを表示する部分
	txt.innerText=msg.substring(0,count);
	count++;
	var rep=setTimeout("disp()",speed);
	if(count>msg.length){
	        charNoise("bgm/noises/entering_chr_kai.wav",false);
		clearTimeout(rep);
		window.dispatchEvent(new Event("dsend"));
	}
	if(menu.checked){
	        charNoise("bgm/noises/entering_chr_kai.wav",false);
		clearTimeout(rep);
		window.dispatchEvent(new Event("dsstp"));
	}
}
// 以下の関数をawaitとともにシナリオローダで使用する
// awaitを使うのでシナリオローダはasync functionでなければならない
async function text(){ // テキストを表示する関数
	disp.rt=true;
	text.rt=true;
	count=0;
	charNoise("bgm/noises/entering_chr_kai.wav",true);
	var lstn=(e)=>{
		if((e.key==="Enter"||e.type==="click")&&!menu.checked){
			playSe("bgm/noises/selecting.wav");
			charNoise("bgm/noises/entering_chr_kai.wav",false);
			count=1+msg.length;
			txt.textContent=msg;
			window.dispatchEvent(new Event("enter"));
		}
	};
	window.addEventListener("keydown",lstn);
	txt.addEventListener("click",lstn);
	disp();
	await evnpr("dsend");
	disp.rt=false;
	if(loadf){
		loadf=false;
		text.rt=false;
		return;
	}
	await evnpr("enter");
	window.removeEventListener("keydown",lstn);
	txt.removeEventListener("click",lstn);
	text.rt=false;
}
async function artxt(texts){ // 配列で渡されたテキストを表示する関数
	for(msgd of texts){
		var comList = getCommand(msgd);
		await commandToDisp(comList);
		msg = getPlainText(msgd);
		await text();
		if(stopScenario)break;
	}
}
async function slct(optn){ // 選択肢を表示する関数optnを配列形式で渡す
	if(ispc()){
		await sltbl(optn);
		var curar=[0,0];
		var lstn=(e)=>{
			cur=curar[+menu.checked];
			document.getElementById("o"+cur).textContent="";
			if(e.key=="ArrowDown"&&cur<optn.length-1){
				cur++;
			}else if(e.key==="ArrowUp"&&cur>0){
				cur--;
			}else if(e.key==="Enter"){
				playSe("bgm/noises/selecting.wav");
				window.dispatchEvent(new Event("slent"));
			}
			document.getElementById("o"+cur).textContent="▶";
			curar[+menu.checked]=cur;
		}
		window.addEventListener("keydown",lstn);
		slct.menu=false;
		if(menu.checked){
			await Promise.race([evnpr("slend"),evnpr("slent")]);
		}else{
			await new Promise((resolve)=>window.addEventListener("slent",resolve));
			slct.menu=false;
		}
		window.removeEventListener("keydown",lstn);
		return slct.menu?-1:curar[+menu.checked];
	}else{
		txt.style.display="none";
		var div=document.createElement("div");
		div.style.position="absolute";
		div.style.width="100%";
		div.style.top="50%";
		div.style.transform="translateY(-50%)";
		div.style.zIndex=2;
		for(var i=0;i<optn.length;i++){
			var outer=document.createElement("div");
			outer.className="msgb txt";
			outer.id="o"+i;
			outer.style.position="relative";
			var inner=document.createElement("div");
			inner.style.position="absolute";
			inner.style.top="50%";
			inner.style.transform="translateY(-50%)";
			inner.innerText=optn[i];
			outer.appendChild(inner);
			outer.addEventListener("touchstart",(e)=>{
				this.r=e.currentTarget.id[1];
				window.dispatchEvent(new Event("slent"));
			});
			div.appendChild(outer);
		}
		document.body.appendChild(div);
		slct.menu=false;
		if(menu.checked){
			await Promise.race([evnpr("slend"),evnpr("slent")]);
		}else{
			div.id="s";
			await evnpr("slent");
			slct.menu=false;
		}
		document.body.removeChild(div);
		txt.style.display="block";
		return slct.menu?-1:+this.r;
	}
}
async function srvy(bgif,items){ // 調査画面を表示する関数
	srvy.rt=true;
	currentBg="";
	document.body.style.background="black";
	img.style.display="none";
	txt.style.display="none";
	outer=document.createElement("div");
	outer.style.position="absolute";
	srvy.inner=document.createElement("div");
	srvy.inner.style.position="relative";
	srvy.inner.style.height="100%";
	srvy.inner.style.width="100%";
	var bg=document.createElement("img");
	bg.setAttribute("src",bgif);
	bg.setAttribute("usemap","#map");
	srvy.inner.appendChild(bg);
	outer.appendChild(srvy.inner);
	document.body.appendChild(outer);
	bg.onload=()=>{window.dispatchEvent(new Event("bgok"))};
	await evnpr("bgok");
	var bgsiz=()=>{
		if(bg.clientHeight/bg.clientWidth<innerHeight/innerWidth){
			bg.style.width="100%";
			bg.style.height="auto";
			outer.style.left="0";
			outer.style.top="50%";
			outer.style.transform="translateY(-50%)";
			outer.style.width="100%";
			outer.style.height=isfox()?bg.naturalHeight*innerWidth/bg.naturalWidth:"auto";
		}else{
			bg.style.width="auto";
			bg.style.height="100%";
			outer.style.left="50%";
			outer.style.top="0";
			outer.style.transform="translateX(-50%)";
			outer.style.width=isfox()?bg.naturalWidth*innerHeight/bg.naturalHeight:"auto";
			outer.style.height="100%";
		}
	};
	bgsiz();
	$(window).resize(bgsiz);
	var lstn=(e)=>{
		if(!text.rt){
			map.removeChild(e.currentTarget);
			srvy.inner.removeChild(document.getElementById("t"+e.currentTarget.id[1]));
			txt.style.display="block";
			playSe("bgm/noises/earning_evidence.wav");
			srvy.func[e.currentTarget.id[1]]();
		};
	};
	map=document.createElement("map");
	map.name="map";
	srvy.func=[];
	for(var i=0;i<items.length;i++){
		var itelm=document.createElement("area");
		itelm.setAttribute("coords",items[i][0]);
		itelm.setAttribute("href","#");
		itelm.setAttribute("shape","poly");
		itelm.id="i"+i;
		srvy.func[i]=items[i][1];
		map.appendChild(itelm);
		itelm.addEventListener("click",lstn);
		var crds=items[i][0].split(",").map(Number);
		crds=new Array(Math.ceil(crds.length/2)).fill().map((_,j)=>crds.slice(2*j,2*j+2));
		var as=0;
		var px=0;
		for(var j=1;j<crds.length-1;j++){
			var a=((crds[0][1]-crds[1+j][1])*(crds[0][0]-crds[j][0])-(crds[0][0]-crds[1+j][0])*(crds[0][1]-crds[j][1]))/2;
			as+=a;
			px+=a*(crds[0][0]+crds[1+j][0]+crds[j][0])/3;
		};
		var tri=document.createElement("div");
		tri.id="t"+i;
		tri.style.position="absolute";
		tri.style.top="calc("+100*Math.min.apply(null,crds.map((z)=>{return z[1]}))/bg.naturalHeight+"% - 2em)";
		tri.style.left="calc("+100*px/as/bg.naturalWidth+"% - 1em)";
		tri.style.width="0";
		tri.style.height="0";
		tri.style.background="transparent";
		tri.style.borderTop="2em solid yellow";
		tri.style.borderLeft="1em solid transparent";
		tri.style.borderRight="1em solid transparent";
		srvy.inner.appendChild(tri);
	}
	srvy.inner.appendChild(map);
	jQuery("img[usemap]").rwdImageMaps();
	await evnpr("srend");
	document.body.removeChild(outer);
	img.style.animation="";
	img.style.display="block";
	srvy.rt=false;
}
async function srend(){ // srvy()の引数の関数の最後に実行する関数
	if(stopScenario)return;
	if(map.childElementCount<1){
		window.dispatchEvent(new Event("srend"));
	}else{
		txt.style.display="none";
	}
}
async function pic(flpth){ // 証拠品の写真を表示する関数
	pic.div=document.createElement("div");
	pic.div.className="pic";
	pic.div.style.background="rgba(0,0,0,.8)"
	pic.div.style.overflow="hidden";
	pic.div.style.position="absolute";
	pic.div.style.top="calc(16px + 5.25em)";
	pic.div.style.left="0";
	pic.div.style.right="0";
	var pict=document.createElement("img");
	pic.div.appendChild(pict);
	pict.src=flpth;
	document.body.appendChild(pic.div);
	pict.className="pic";
	pict.onload=()=>{window.dispatchEvent(new Event("picok"))};
	await evnpr("picok");
	pic.resiz=()=>{
		pic.div.style.bottom=txt.clientHeight+16+"px";
		var zoom=Math.min(pic.div.clientHeight/pict.clientHeight,pic.div.clientWidth/pict.clientWidth);
		pic.zoom=panzoom(pict,{
			minZoom: zoom,
			initialZoom: zoom,
			bounds: true,
			boundsPadding: 0
		});
		pic.zoom.moveTo((pic.div.clientWidth-pict.clientWidth*zoom)/2,(pic.div.clientHeight-pict.clientHeight*zoom)/2);
	}
	pic.resiz();
	$(window).resize(pic.resiz);
}
function picen(){ // 証拠品の写真の表示をやめる関数
	pic.zoom.dispose();
	$(window).off("resize",pic.resiz);
	document.body.removeChild(pic.div);
}
// 上記の関数の中で使う関数
async function sltbl(optn){ // 選択肢の表を作る関数
	var table=document.createElement("table");
	var tbody=document.createElement("tbody");
	tbody.className="txt";
	for(var i=0;i<optn.length;i++){
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		td.className="opt";
		td.id="o"+i;
		if(i<1)td.textContent="▶";
		tr.appendChild(td);
		td=document.createElement("td");
		td.textContent=optn[i];
		tr.appendChild(td);
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	txt.textContent="";
	txt.appendChild(table);
}
function ispc(){ // タッチ可能でパソコンでないならばtrueを返す関数
	return /^Mozilla\/5\.0 \((Macintosh;|Windows NT|X11;) /.test(navigator.userAgent)||!("ontouchend"in document)
}
function isfox(){ // Firefoxならtrueを返す関数
	return /^Mozilla\/5\.0 \(.+; rv:\d+(\.\d+)*\) Gecko\/\d+/.test(navigator.userAgent);
}
async function evnpr(evnnm){ // メニューが開かれていないときのみ引数に渡された名前のEventが起きると満足するPromiseを返す関数
	if(!menu.checked){
		window.addEventListener(evnnm,()=>{if(!menu.checked)window.dispatchEvent(new Event(evnnm))});
		evnnm+="evnpr";
	}
	await new Promise((resolve)=>window.addEventListener(evnnm,resolve));
}
async function main(){//エントリーポイント(一シナリオごとに呼び出される)
	if(!isloaded){isloaded = false;text_count = 0;} 
	var loadingFile = scenarioFile!="" ? "json/" + scenarioFile : "json/" + FIRST_SCENARIO;
	if(loadingFile.indexOf("suji") == -1){
	isSuji = false;
	loadedScenarioList.push(scenarioFile!="" ? scenarioFile :  FIRST_SCENARIO);
	}else{
		isSuji = true;
		if(loadingFile == "json/12-5/suji.json"){
		suji_count ++;
		if(suji_count == 3)loadedScenarioList.push("13maezaki_dis.json");
	}
	}
	if(/\.mp4$/i.test(loadingFile)){
		var video = document.getElementById("video");
		video.src = loadingFile.replace("json","videos");
		document.getElementById("game").style.display="none";
		video.style.display = "block";
		throw new Error;
	}
	loadedObj = await loadMain(loadingFile);
	if(loadedObj.jump[0] == "last:"){
		if(loadedObj.number == 2 && repeatSelectorIsFirstSub == true){
			beforeJumpListSub = loadedObj.text;
			beforeOptionListSub = loadedObj.option;
			repeatSelectorIsFirstSub = false;
		}else if(loadedObj.number != 2 && repeatSelectorIsFirst == true){
		beforeJumpList = loadedObj.text;
		beforeOptionList = loadedObj.option;
		repeatSelectorIsFirst = false;
		}
	}
	console.log(loadedScenarioList)
	await show();
}
async function show(){//テキスト表示本体(一段ごとに呼び出される)
	if(stopScenario){stopScenario = false; return;}
	if(loadedObj.jump[0] != "last:"){//選択肢を減らすシナリオかどうかjump[0]にtrueを指定すると選択肢減らすやつ
	var textar_length = loadedObj.text.length;
	if(text_count >= textar_length) {//段が全て終わった▶ジャンプ先の提示
		if(loadedObj.jump.length >= loadedObj.option.length){//jumpの設定は適切?
			if(loadedObj.option.length == 1){
				scenarioFile = isNaN(loadedObj.jump[0]) ? loadedObj.jump[0] : loadedScenarioList[loadedScenarioList.length - loadedObj.jump[0] -1];
			}else{
				var selection = await slct(loadedObj.option);
				scenarioFile = loadedObj.jump[selection];
			}
		}else{
			alert("エラー:\n次はどのシナリオにジャンプすればよいのですか?\njumpの値は必ずoptionの数以上でなければなりません");
			scenarioFile = ERR_SCENARIO;
		}
		text_count = 0;
		await main();
		return;
	}
	var comList = getCommand(loadedObj.text[text_count]);
	await commandToDisp(comList);
	msg = getPlainText(loadedObj.text[!isSuji?text_count:Math.floor(Math.random() * textar_length)]);
	if(loadedObj.evidence_id != undefined){
		if(text_count == loadedObj.evidence_stage){
			if(isZeroEvd){
				sdata = [];
				aevds.splice(0,1);
				isZeroEvd = false;
			}
			sdata.push(loadedObj.evidence_id);
		}
	}else if(loadedObj.evidence_multiple_id != undefined){
		if(isZeroEvd){
			sdata = [];
			aevds.splice(0,1);
			isZeroEvd = false;
		}
		var mevdNo = loadedObj.evidence_multiple_stage.indexOf(text_count);
		if(mevdNo != -1) sdata.push(loadedObj.evidence_multiple_id[mevdNo]);
	}
	if(isSuji)text_count = textar_length;
	await text();
	text_count ++
	}else{//すべて選択させる場合
	//背景は常に変える
	if(loadedObj.plus != undefined && loadedScenarioList.indexOf(loadedObj.plus_jump) == -1){
		if(loadedScenarioList.indexOf(loadedObj.text[loadedObj.plus_depends]) != -1){
			if(loadedObj.number == 2 && beforeJumpListSub.indexOf(loadedObj.plus_jump) == -1){
			beforeJumpListSub.push(loadedObj.plus_jump);
			beforeOptionListSub.push(loadedObj.plus);
			}else if(beforeJumpList.indexOf(loadedObj.plus_jump) == -1){
			beforeJumpList.push(loadedObj.plus_jump);
			beforeOptionList.push(loadedObj.plus);
			}
		}
		}
	if(beforeOptionList.length == 0 && loadedObj.number != 2){//ループから抜ける
		scenarioFile = loadedObj.jump[1];
		repeatSelectorIsFirst = true; 
		await main();
		return;
	}else if(beforeOptionListSub.length == 0 && loadedObj.number == 2){
		scenarioFile = loadedObj.jump[1];
		repeatSelectorIsFirstSub = true; 
		await main();
		return;
	}
	var selection = await slct(loadedObj.number == 2 ? beforeOptionListSub : beforeOptionList);
	scenarioFile = loadedObj.number == 2 ? beforeJumpListSub[selection]:beforeJumpList[selection];
	if(loadedObj.number == 2){
	beforeJumpListSub.splice(selection,1);
	beforeOptionListSub.splice(selection,1);
	}else{
	beforeJumpList.splice(selection,1);
	beforeOptionList.splice(selection,1);
	}
	text_count = 0;
	await main();
	return;
	}
	await show();
}
async function commandToDisp(command_list){//命令の指定を画面に反映させる関数
	if(img.style.opacity!=="0"){
		img.style.animation="fadeout .7s";
		img.style.opacity="0";
		var chr_f=true;
	}
	for(var i=0;i<command_list.length;i++){
		if(command_list[i].value == "") {alert("エラー:\n命令「" + command_list[i].command + "」の右辺には何も指定されていません"); continue;}
		switch(command_list[i].command){
			case "bg":
				if(command_list[i].value==="black_screen.png")document.getElementById("bgm").pause();
				if(document.body.style.background=="black")document.body.style.background="";
				document.body.style.backgroundImage="url('bg/" + command_list[i].value +"')";
				currentBg = command_list[i].value;
				break;
			case "bgm":
				playBgm("bgm/"+command_list[i].value);
				currentBgm = command_list[i].value;
				break;
			case "img":
				chr("chr/"+command_list[i].value,chr_f);
				break;
			case "spd":
				speed = command_list[i].value;
				currentSpd = command_list[i].value;
				break;
			case "col":
			//証拠集め
				eval(await(await fetch("scene/"+command_list[i].value+".js")).text());
				await run();
				break;
			case "script":
				//シナリオからのスクリプト読み出し
				//.jsはいらない
				load("scene",command_list[i].value);
				break;
			case "":
				alert("エラー:\n命令は空にはできません");
				break;
			default:
				alert("エラー:\n命令「"+command_list[i].value+"」は有効ではありません。")
		}
	}
}
function charNoise(path,playing){//文字の音再生関数
	var chnoiseElm = document.getElementById("chrnoise");
	chnoiseElm.src = /^Mozilla\/5\.0 \(iP([ao]d|hone)/.test(navigator.userAgent)?path.replace("_kai",""):path;
	if(playing == true){
		chnoiseElm.play();
	}else{
		chnoiseElm.pause();
		chnoiseElm.currentTime = 0;
	}
	chnoiseElm.loop = true;
}
function playSe(path){//効果音再生関数
	var seElm = new Audio();
	seElm.src = path;
	seElm.play();
}
async function saveObj(){
	/*
	保存するもの
	beforeJumpList系
	repeatSelectorIsFirst系
	scenarioFile
	text_count
	sdata
	loadedscenariolist
	isZeroEvd
	suji_count
	*/
	var saveObj = {
		beforeJumpList : beforeJumpList,
		beforeOptionList : beforeOptionList,
		beforeJumpListSub : beforeJumpListSub,
		beforeOptionListSub : beforeOptionListSub,
		repeatSelectorIsFirst : repeatSelectorIsFirst,
		repeatSelectorIsFirstSub : repeatSelectorIsFirstSub,
		scenarioFile : scenarioFile,
		text_count: text_count,
		sdata : sdata,
		loadedScenarioList : loadedScenarioList,
		isZeroEvd : isZeroEvd,
		suji_count : suji_count,
		currentBg : currentBg,
		currentBgm : currentBgm,
		currentSpd : currentSpd
	}

	localStorage.setItem("gameData",JSON.stringify(saveObj));

}
async function loadObj(){
	var loadedDataObj = JSON.parse(localStorage.getItem("gameData"));
	if(loadedDataObj == null) {alert("セーブデータはありません");return;}
	beforeJumpList = loadedDataObj.beforeJumpList;
	beforeOptionList = loadedDataObj.beforeOptionList;
	beforeJumpListSub = loadedDataObj.beforeJumpListSub;
	beforeOptionListSub = loadedDataObj.beforeOptionListSub;
	repeatSelectorIsFirst = loadedDataObj.repeatSelectorIsFirst;
	repeatSelectorIsFirstSub = loadedDataObj.repeatSelectorIsFirstSub;
	scenarioFile = loadedDataObj.scenarioFile;
	text_count = loadedDataObj.text_count -1 ;
	sdata = loadedDataObj.sdata;
	loadedScenarioList = loadedDataObj.loadedScenarioList;
	isZeroEvd = loadedDataObj.isZeroEvd;
	suji_count = loadedDataObj.suji_count;
	currentBg = loadedDataObj.currentBg;
	if(currentBg != ""){
		document.body.style.backgroundImage="url('bg/" + currentBg +"')";
		if(currentBg == "black_screen.png") document.getElementById("bgm").pause();
	}
	currentBgm = loadedDataObj.currentBgm;
	if(currentBgm != ""&&currentBg != "black_screen.png") playBgm("bgm/" + currentBgm);
	speed = loadedDataObj.currentSpd;
	stopScenario = true;
	isloaded = true;
	await main();
}
