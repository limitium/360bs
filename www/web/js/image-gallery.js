$(document).ready(function () {

    $("[rel=tooltip]").tooltip();

    $(".label").click(function () {
        $(this).toggleClass("label-on");
    });
});