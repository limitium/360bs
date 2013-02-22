var bs = angular.module('bs', []);

bs.directive("rel", function () {
    return {
        restrict: 'A',
        link: function (scope, el, attr) {
            if (attr.rel == "tooltip") {
                $(el).tooltip();
            }
        }
    }
});

bs.controller("TagController", function ($scope) {
    var selected = [];

    $scope.toggleTag = function (id) {
        var indx = selected.indexOf(id);
        if (indx == -1) {
            selected.push(id);
        } else {
            selected.splice(indx, 1);
        }
    };
    $scope.isSelected = function (id) {
        return selected.indexOf(id) == -1 ? "label-off" : "label-on";
    };
});
bs.factory("YouTubeService", function () {
    return {
        getVideoId: function (url) {
            var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            }
            return false;
        }
    }
});

bs.controller("YtController", function ($scope, $window, YouTubeService) {
    $window.onYouTubePlayerReady = function () {
        console.log("player loaded");
        $scope.$apply(function () {
            $scope.player = document.getElementById("player-swf");
        })
    };

    $scope.videoUrl = "";
    $scope.player = null;

    $scope.isValidUrl = function () {
        return !!YouTubeService.getVideoId($scope.videoUrl);
    };

    $scope.loadVideo = function () {
        var vid = YouTubeService.getVideoId($scope.videoUrl);
        if (vid) {
            if (!$scope.player) {
                swfobject.embedSWF(
                    "http://www.youtube.com/v/" + vid + "?hl=en_US&fs=1&enablejsapi=1&playerapiid=ytplayer",
                    "player",
                    "100%", "300",
                    "8",
                    null, null,
                    { allowScriptAccess: 'always' },
                    { id: 'player-swf' }
                );
            } else {

            }
        }
    };
});