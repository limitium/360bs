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

bs.factory("YouTubeService", function ($window, $timeout, $rootScope) {
    var video = {
            id: "",
            player: null,
            position: 0,
            status: "",
            duration: 0,
            title: "",
            uploader: "",
            uploaded: "",
            views: "",
            playback: false
        },
        settings = {
            height: 100
        };

    $window.onYouTubePlayerReady = function () {
        var player = document.getElementById("player-swf");
        video.player = player;

        $rootScope.$broadcast("YTS_loaded_player");

        player.addEventListener("onStateChange", "onStateChange");

        function setCurrentTime() {
            video.position = player.getCurrentTime();
            $rootScope.$broadcast("YTS_change_position");
            $timeout(setCurrentTime, 333);
        }

        setCurrentTime();

        player.playVideo();
    };
    $window.onStateChange = function (status) {
        video.playback = status == 1 || status == 3;
        $rootScope.$broadcast("YTS_change_state_player");
    };

    var service = {
        setHeight: function (height) {
            settings.height = height;
        },
        getVideo: function () {
            return video;
        },
        getVideoId: function (url) {
            var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            }
            return false;
        },
        loadMeta: function (vid) {
            $.getJSON("http://gdata.youtube.com/feeds/api/videos/" + vid + "?v=2&alt=json&prettyprint=true", function (resp) {
                video.title = resp.entry.title.$t;
                video.duration = resp.entry.media$group.yt$duration.seconds;
                video.uploader = resp.entry.author[0].name.$t;
                video.uploaded = resp.entry.published.$t;
                video.views = resp.entry.yt$statistics.viewCount;
                $rootScope.$broadcast("YTS_loaded_meta");
            });
        },
        playVideo: function (start) {
            if (angular.isNumber(start)) {
                video.player.seekTo(start, true);
            }
            video.player.playVideo();
        },
        togglePlay: function () {
            if (video.playback) {
                video.player.stopVideo();
            } else {
                video.player.playVideo();
            }
        },
        pauseVideo: function () {
            video.player.pauseVideo()
        },
        loadVideo: function (vid) {
            video.id = vid;
            if (!video.player) {
                this.loadPlayer(vid);
            } else {
                video.player.loadVideoById(vid);
            }
        },
        loadPlayer: function (vid) {
            swfobject.embedSWF(
                "http://www.youtube.com/v/" + vid + "?hl=en_US&version=3&autoplay=1&autohide=1&cc_load_policy=1&iv_load_policy=3&enablejsapi=1&fs=1&modestbranding=1&rel=0&theme=light&vq=hd720&playerapiid=ytplayer&showinfo=0",
                "player",
                "100%", settings.height,
                "8",
                null, null,
                { allowScriptAccess: 'always' },
                { id: 'player-swf' }
            );
        }
    };
    return  service;
});

bs.factory("TrickService", function ($http, $rootScope) {
    var tricks = [];
    var service = {
        loadTricks: function (vid) {
            $http({
                method: "GET",
                url: "tricks/" + vid
            }).success(function (responseTags) {
                    tricks = responseTags;
                    $rootScope.$broadcast("TRS_loaded_tricks");
                });
        },
        getTricks: function () {
            return tricks;
        },
        isIn: function (trick, time) {
            return trick.start <= time && time < trick.end;
        }
    };
    return service;
});

bs.controller("TagController", function ($scope, TagService) {
    $scope.toggleTag = TagService.toggleTag;
    $scope.isSelected = function (id) {
        return TagService.isSelected(id) ? "label-off" : "label-on";
    };
});

bs.controller("UploadController", function ($scope, $http, $timeout, $window, YouTubeService, TagService, TrickService) {
    YouTubeService.setHeight("300");

    $scope.videoUrl = "";
    $scope.trick = {
        start: 0,
        end: 0,
        preview: false,
        adding: false
    };
    $scope.tricks = [];
    $scope.video = YouTubeService.getVideo();
    $scope.isValidUrl = function () {
        return !!YouTubeService.getVideoId($scope.videoUrl);
    };

    $scope.loadVideo = function () {
        var vid = YouTubeService.getVideoId($scope.videoUrl);
        if (vid) {
            $scope.videoUrl = "http://youtube.com/watch?v=" + vid;
            $scope.trick.preview = false;
            TrickService.loadTricks(vid);
            YouTubeService.loadMeta(vid);
            YouTubeService.loadVideo(vid);
        }
    };

    $scope.togglePlay = YouTubeService.togglePlay;

    $scope.previewVideo = function () {
        YouTubeService.playVideo($scope.trick.start);
        $scope.trick.preview = true;
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

    $scope.isActive = function (trick) {
        return TrickService.isIn(trick, $scope.video.position) ? "active" : "";
    };

    $scope.addVideo = function () {
        if (!TagService.getSelected().length) {
            alert("Empty tricks");
            return;
        }
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
                $scope.trick.start = $scope.trick.end;
                $scope.trick.end = parseInt($scope.trick.end) + 5;
                TagService.setTags([]);
            }).error(function () {
                $scope.trick.adding = false;
                alert("Error");
            });
    };

    $scope.Math = $window.Math;

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
    $scope.$on("YTS_change_position", function () {
        if ($scope.trick.preview && $scope.video.position >= $scope.trick.end) {
            $scope.trick.preview = false;
            YouTubeService.pauseVideo();
        }
        $scope.$apply();
    });
    $scope.$on("YTS_loaded_player", function () {
        $scope.$apply();
    });
    $scope.$on("YTS_loaded_meta", function () {
        $scope.$apply();
    });
    $scope.$on("YTS_change_state_player", function () {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    $scope.$on("TRS_loaded_tricks", function () {
        $scope.tricks = TrickService.getTricks();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
});

bs.controller("PlaybackController", function ($scope, YouTubeService, TrickService) {
    YouTubeService.setHeight("500");

    $scope.tricks = [];


    $scope.video = YouTubeService.getVideo();

    $scope.loadVideo = function (vid) {
        YouTubeService.loadVideo(vid);
        TrickService.loadTricks(vid);
    };

    $scope.setTrick = function (trick) {
        $scope.tags = trick.tags;
    };

    $scope.isActive = function (trick) {
        return TrickService.isIn(trick, $scope.video.position) ? "active" : "";
    };

    $scope.$on("YTS_change_position", function () {
        $scope.$apply();
    });
    $scope.$on("TRS_loaded_tricks", function () {
        $scope.tricks = TrickService.getTricks();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
});