/*
シナリオロード〜解析スクリプト
(C) EnjoySoftware & r02092 All rights reserved.
*/
//ーーーーーーーーーーーローダ部分ーーーーーーーーーーーーーー
const FIRST_SCENARIO = "1ry1.json";//最初に読むシナリオ
async function loadMain(s_file = FIRST_SCENARIO){//シナリオ読み込み(シナリオローダにnullチェック付けたWrapper)
    var jsObj;
    var loadedJson = await loadJson(s_file);
    if(loadedJson == null) {window.dispatchEvent(new Event("errored")); return;}
    try{
        
     jsObj = JSON.parse(JSON.stringify(loadedJson));
    }catch(e){
     alert(e.message);
     window.dispatchEvent(new Event("errored"));
     return;
    }
    return jsObj;
}
//ーーーーーーーーーーーパーサ部分ーーーーーーーーーーーーーー
// sc_textは必ず文字列で、配列の一段ごとである必要がある
//
function getPlainText(sc_text = null){//命令を削除し、プレーンな文字を取り出す関数
    if(sc_text == null) window.dispatchEvent(new Event("errored")); 
    return sc_text.replace(/\[.+?\]/g, "");
}
function getCommand(sc_text = null){//命令とその値のペアを配列形式で取得する関数
    //この関数はJavaScriptオブジェクトを配列形式で返す。
    //commandで命令を、valueでその値を参照できる。
    //サンプルコード:
    //alert(getCommand("こんにちは![Hello=world]です!")[0].command + "、" + getCommand("こんにちは![Hello=world]です!")[0].value);←返り値:"Hello、world"
    if(sc_text == null) window.dispatchEvent(new Event("errored"));
    var command_brackets = sc_text.match(/\[[^\]]*\]/g);//ブラケット付き文字配列\[.+?\]
    var command_nobrackets = [];
    var pairs = [];
    if(command_brackets != null){
    for(var j=0;j<command_brackets.length;j++){
        command_nobrackets.push(command_brackets[j].replace(/[\[|\]]+/g,""));//ブラケット除去
    }
    for(var i=0;i<command_nobrackets.length;i++){//返すための文字列を生成する
    equal_left_right = command_nobrackets[i].split("=");//インデックス0:コマンド。インデックス1:値
    pairs.push({command: equal_left_right[0],value: equal_left_right[1]});
    }
}
    return pairs;
}

