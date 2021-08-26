//シナリオローダ(JSONから読み込み)
if (window.navigator.userAgent.toUpperCase().indexOf('MSIE') != -1 || window.navigator.userAgent.toUpperCase().indexOf('TRIDENT') != -1) {
alert("Internet Explorerからのアクセスです。このゲームはInternet Explorerでは正常に動作しない可能性があります。");
}
 async function loadJson(jsonPath){//これはメインスクリプトから直接呼び出さない
  return new Promise((resolve,reject)=>{
      $.ajax({
        type: "GET",
        url: jsonPath,
        dataType : "json"
      })
      // Ajaxリクエストが成功した場合
      .done(function(data){
        resolve(data);
      })
      // Ajaxリクエストが失敗した場合
      .fail(function(XMLHttpRequest, textStatus, errorThrown){
        alert("エラー。\n申し訳ありません。サーバへの問い合わせに失敗しました。\n\n\n" + errorThrown);
        reject(errorThrown);
      });
      });
      }