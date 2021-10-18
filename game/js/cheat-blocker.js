var ref = document.referrer
if(ref.indexOf("index.html") == -1) {
    alert("ズルはしないでください。最初に戻ります。")
    location = "../game/";
}