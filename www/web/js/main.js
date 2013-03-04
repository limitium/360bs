var bs = angular.module('bs', []);

bs.directive("rel", function () {
    return {
        restrict: "A",
        link: function (scope, el, attr) {
            if (attr.rel == "tooltip") {
                $(el).tooltip();
            }
        }
    }
});

bs.directive("ngToggleClass", function () {
    return {
        restrict: "A",
        scope: {
            toggle: "=ngToggleClass",
            on: "@",
            off: "@"
        },
        link: function (scope, el, attr) {
            scope.$watch("toggle", function () {
                el
                    .removeClass(scope.toggle ? scope.on : scope.off)
                    .addClass(scope.toggle ? scope.off : scope.on);
            });
        }
    }
});

bs.directive("ngSpinner", function ($timeout) {
    return {
        restrict: "A",
        scope: {
            spinner: "=ngSpinner"
        },
        link: function (scope, el, attr) {
            scope.$watch("spinner", function () {
                $timeout(function () {
                    el.val(scope.spinner)
                }, 50);
            });

            el
                .spinner({
                    min: 0,
                    change: function () {
                        scope.$apply(function () {
                            scope.spinner = el.val();
                        });
                    },
                    spin: function (e, ui) {
                        scope.$apply(function () {
                            scope.spinner = ui.value;
                        });
                    }
                })
                .val(scope.spinner);
        }
    }
});

bs.directive("ngSlider", function () {
    return {
        restrict: "A",
        scope: {
            slider: "=ngSlider",
            max: "="
        },
        link: function (scope, el, attr) {
            scope.$watch("slider.start+slider.end", function () {
                el.slider("option", {values: [  scope.slider.start, scope.slider.end] })
            });
            scope.$watch("max", function () {
                el.slider("option", "max", scope.max);
            });

            el.slider({
                range: true,
                min: 0,
                max: scope.max,
                values: [scope.slider.start, scope.slider.end],
                slide: function (e, ui) {
                    scope.$apply(function () {
                        scope.slider.start = ui.values[0]
                        scope.slider.end = ui.values[1]
                    });
                }
            })
        }
    }
});

bs.filter("tagName", function (TagService) {
    return function (input) {
        return TagService.getName(input);
    }
});


bs.factory("TagService", function ($http) {
    var tags = {};
    $http.get('tags').success(function (responseTags) {
        tags = responseTags;
    });
    var selected = [];
    return {
        getName: function (id) {
            return tags[id];
        },
        toggleTag: function (id) {
            var indx = selected.indexOf(id);
            if (indx == -1) {
                selected.push(id);
            } else {
                selected.splice(indx, 1);
            }
        },
        isSelected: function (id) {
            return selected.indexOf(id) == -1;
        },
        getSelected: function () {
            return selected;
        },
        setTags: function (tags) {
            selected = tags;
        }
    }
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
        },
        loadMeta: function (vid, cb) {
            $.getJSON("http://gdata.youtube.com/feeds/api/videos/" + vid + "?v=2&alt=json&prettyprint=true", cb);
        }
    }
});
bs.controller("TagController", function ($scope, TagService) {
    $scope.toggleTag = TagService.toggleTag;
    $scope.isSelected = function (id) {
        return TagService.isSelected(id) ? "label-off" : "label-on";
    };
});

bs.controller("YtController", function ($scope, $http, $timeout, $window, YouTubeService, TagService) {

    $scope.videoUrl = "";

    $scope.video = {
        id: "",
        player: null,
        position: 0,
        status: "",
        duration: 0,
        title: "",
        uploader: "",
        uploaded: "",
        views: "",
        preview: false,
        playback: false
    };

    $scope.trick = {
        start: 0,
        end: 0,
        adding: false
    };

    $scope.tricks = [];

    $scope.isValidUrl = function () {
        return !!YouTubeService.getVideoId($scope.videoUrl);
    };

    $scope.loadVideo = function () {
        var vid = YouTubeService.getVideoId($scope.videoUrl);
        if (vid) {
            $scope.video.id = vid;
            $scope.video.preview = false;

            YouTubeService.loadMeta(vid, function (resp) {
                $scope.video.title = resp.entry.title.$t;
                $scope.video.duration = resp.entry.media$group.yt$duration.seconds;
                $scope.video.uploader = resp.entry.author[0].name.$t;
                $scope.video.uploaded = resp.entry.published.$t;
                $scope.video.views = resp.entry.yt$statistics.viewCount;
                $scope.$apply();
            });
            $scope.loadTricks();

            if (!$scope.video.player) {
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
                $scope.video.player.loadVideoById(vid);
            }
        }
    };

    $scope.togglePlay = function () {
        if ($scope.video.playback) {
            $scope.video.player.stopVideo();
        } else {
            $scope.video.player.playVideo();
        }
    };

    $scope.previewVideo = function () {
        $scope.video.player.seekTo($scope.trick.start, true);
        $scope.video.player.playVideo();
        $scope.video.preview = true;
    };

    $scope.setTrick = function (trick) {
        $scope.trick.start = trick.start;
        $scope.trick.end = trick.end;
        angular.forEach(trick.tags, function (val, i, tags) {
            tags[i] = val.toString();
        });
        TagService.setTags(trick.tags);
        $scope.previewVideo();
    };
    $scope.loadTricks = function () {
        $http({
            method: "GET",
            url: "tricks/" + $scope.video.id
        }).success(function (tricks) {
                $scope.tricks = tricks
            });
    };

    $scope.addVideo = function () {
        $scope.trick.adding = true;
        $http({
            method: "POST",
            url: "trick/" + $scope.video.id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                "bs_videobundle_tricktype[Video][vid]": $scope.video.id,
                "bs_videobundle_tricktype[Video][name]": $scope.video.title,
                "bs_videobundle_tricktype[Video][duration]": $scope.video.duration,
                "bs_videobundle_tricktype[start]": $scope.trick.start,
                "bs_videobundle_tricktype[end]": $scope.trick.end,
                "bs_videobundle_tricktype[Tags][]": TagService.getSelected()
            })
        }).success(function (tricks) {
                $scope.tricks = tricks
                $scope.trick.adding = false;
            }).error(function () {
                $scope.trick.adding = false;
            });
    };

    $scope.Math = $window.Math;

    $window.onYouTubePlayerReady = function () {
        var player = document.getElementById("player-swf");
        $scope.$apply(function () {
            $scope.video.player = player;
        });

        player.addEventListener("onStateChange", "onStateChange");

        function setCurrentTime() {
            $scope.video.position = player.getCurrentTime();
            if ($scope.video.preview && $scope.video.position >= $scope.trick.end) {
                $scope.video.preview = false;
                $scope.video.player.pauseVideo();
            }
            $timeout(setCurrentTime, 200);
        }

        setCurrentTime();

        player.playVideo();
    };
    $window.onStateChange = function (status) {
        $scope.video.playback = status == 1 || status == 3;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.$watch("video.duration", function () {
        $scope.trick.start = 0;
        $scope.trick.end = $scope.video.duration;
    });
    $scope.$watch("trick.start", function () {
        if ($scope.trick.start < 0) {
            $scope.trick.start = 0;
        }
        if ($scope.trick.start > $scope.trick.end) {
            $scope.trick.start = $scope.trick.end;
        }
    });
    $scope.$watch("trick.end", function () {
        if ($scope.trick.end > $scope.video.duration) {
            $scope.trick.end = $scope.video.duration;
        }
        if ($scope.trick.end < $scope.trick.start) {
            $scope.trick.end = $scope.trick.start;
        }
    });
});