function onYouTubePlayerReady(playerid) {

    console.log(document.getElementById(playerid));
}

$(document).ready(function () {

    $("[rel=tooltip]").tooltip();

    $(".label").click(function () {
        $(this).toggleClass("label-on");
    });

    $("#load").click(function () {

    });
});
