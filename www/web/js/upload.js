u = {
    lastUrlChange: 0,
    loadTimeOut: 500,
    loadedVideoId: false,
    player: null,
    getVideoId: function () {
        var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        var match = $("#youtube-link").val().match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        }
        return false;
    },
    loadVideo: function () {
        if ((new Date()).getTime() - u.lastUrlChange >= u.loadTimeOut) {
            var vid = u.getVideoId(), wrong = $("#wrong-url");
            if (vid) {
                if (u.loadedVideoId != vid) {
                    u.loadedVideoId = vid;
                    wrong.addClass("hide");
                    swfobject.embedSWF(
                        "http://www.youtube.com/v/" + vid + "?hl=en_US&fs=1&enablejsapi=1&playerapiid=ytplayer",
                        "player",
                        "100%", "300",
                        "8",
                        null, null,
                        { allowScriptAccess: 'always' },
                        { id: 'player-swf' }
                    );
                }
            } else {
                u.loadedVideoId = false;
                u.player = null;
                wrong.removeClass("hide");
                $("#player-container").html('<div id="player"></div>');
            }
        }
    },
    onUrlChange: function () {
        u.lastUrlChange = (new Date()).getTime();
        setTimeout(u.loadVideo, u.loadTimeOut)
    },
    onPlayerLoad: function (player) {
        u.player = player;
    }
};

function onYouTubePlayerReady(playerId) {
    u.onPlayerLoad(document.getElementById("player-swf"));
}

$(function () {
    $("#youtube-link").on("blur change keyup", u.onUrlChange);
    $("#player-swf").load(function () {
        console.log(this)
    });
    $("#player-container").on("load", "#player-swf", function () {
        console.log(this)
    })
});