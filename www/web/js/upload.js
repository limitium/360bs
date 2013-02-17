u = {
    lastUrlChange: 0,
    loadTimeOut: 500,
    loadedVideoId: false,
    player: null,
    getVideoId: function (url) {
        var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        }
        return false;
    },
    loadVideo: function () {
        const url = $("#yt-url").val();
        if ((new Date()).getTime() - u.lastUrlChange >= u.loadTimeOut && url) {
            var vid = u.getVideoId(url), wrong = $("#wrong-url");
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
                    u.loadMeta();
                }
            } else {
                u.loadedVideoId = false;
                u.player = null;
                wrong.removeClass("hide");
                $("#player-container").html('<div id="player"></div>');
            }
        }
    },
    onLoad: function () {
        setInterval(function () {
            if (u.player) {
                $('#yt-player-position').html(Math.round(u.player.getCurrentTime()));
            }
        }, 500);
    },
    onUrlChange: function () {
        u.lastUrlChange = (new Date()).getTime();
        setTimeout(u.loadVideo, u.loadTimeOut)
    },
    onPlayerLoad: function (player) {
        u.player = player;
        const duration = player.getDuration();
        $("#yt-duration").html(duration);
        $('#yt-scroll').slider({
            range: true,
            min: 0,
            max: duration,
            values: [0, duration],
            slide: function (e, ui) {
                $('#yt-trick-start').val(ui.values[0]).spinner("option", {max: ui.values[1]});
                $('#yt-trick-end').val(ui.values[1]).spinner("option", {min: ui.values[0]});
            }
        });
        $('#yt-player-position').html(0);

        $('#yt-trick-start').val(0);
        $('#yt-trick-end').val(duration).spinner("option", {max: duration});
    },
    loadMeta: function () {
        $.getJSON("http://gdata.youtube.com/feeds/api/videos/" + u.loadedVideoId + "?v=2&alt=json&prettyprint=true", function (resp) {
            console.log(resp.entry);
            $("#yt-title").html(resp.entry.title.$t);
            $("#yt-uploader").html(resp.entry.author[0].name.$t);
            $("#yt-uploaded").html(resp.entry.published.$t);
            $("#yt-views").html(resp.entry.yt$statistics.viewCount);
        });
    }
};

function onYouTubePlayerReady(playerId) {
    u.onPlayerLoad(document.getElementById("player-swf"));
}

$(function () {
    u.onLoad();
    $("#yt-url").on("blur change keyup", u.onUrlChange);
    $("[rel=tooltip]").tooltip();

    var onEndSpinChange = function (e, ui) {
            const start = $('#yt-trick-start').val();
            var end = ui.value;
            const spin = $(this);
            if (!end) {
                end = spin.val();
            }
            if (start > end) {
                spin.val(start);
                end = start;
            }
            const max = spin.spinner("option", "max");
            if (end > max) {
                spin.val(max);
                end = max
            }

            $('#yt-scroll').slider("option", {values: [ start, end] });
        },
        onStartSpinChange = function (e, ui) {
            const end = $('#yt-trick-end').val();
            var start = ui.value;
            if (!start) {
                start = $(this).val();
            }
            if (start > end) {
                $(this).val(end);
                start = end;
            }
            if (start < 0) {
                $(this).val(0);
                start = 0
            }
            console.log(start, end)
            $('#yt-scroll').slider("option", {values: [  start, end] });
        };
    $('#yt-trick-start').spinner({ min: 0,
        change: onStartSpinChange,
        spin: onStartSpinChange
    });
    $('#yt-trick-end').spinner({ min: 0,
        change: onEndSpinChange,
        spin: onEndSpinChange
    });
});