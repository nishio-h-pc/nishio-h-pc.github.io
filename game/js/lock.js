document.addEventListener("touchstart",(e)=>{ // ピンチイン・ピンチアウトによる拡大縮小を禁止
	if(e.touches.length>1)e.preventDefault();
},{passive:false});
document.addEventListener("touchmove",(e)=>{ // スクロールを禁止
	var id_e=document.getElementById("e");
	if(e.target.className!=="pic"&&(e.target.id[0]!=="e"||id_e.clientHeight===id_e.scrollHeight))e.preventDefault();
},{passive:false});
var time=0;
document.addEventListener("touchend",(e)=>{ // ダブルタップによる拡大縮小を禁止
	var now=new Date().getTime();
	if((now-time)<350)e.preventDefault();
	time=now;
},false);