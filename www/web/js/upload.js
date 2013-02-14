function onYouTubePlayerReady(playerId) {
    player = document.getElementById("zebra");
    console.log(player);
//            player.playVideo();
}
function getVideoId() {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;

    var match = $("#youtube-link").val().match(regExp);
    console.log(match)
    if (match && match[2].length == 11) {
        return match[2];
    }
    return false;
}

function loadVideo() {
    var vid = getVideoId();
    console.log(vid)
}

$(function () {

    $("#youtube-link").on("blur change keyup", loadVideo);

    swfobject.embedSWF(
        "http://www.youtube.com/v/qCTLCNmnlKU?hl=en_US&fs=1&enablejsapi=1&playerapiid=ytplayer",
        "player",
        "100%", "300",
        "8",
        null, null,
        { allowScriptAccess: 'always' },
        { id: 'zebra' }
    );
});