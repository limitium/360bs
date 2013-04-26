var bs = angular.module('bs', []);

bs.config(function ($routeProvider, $locationProvider, URLS) {
    $routeProvider
        .when(URLS.video_filter, {
        });

    $locationProvider.html5Mode(true);
});

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
bs.filter("duration", function () {
    return function (seconds) {
        var h, m, s;
        h = seconds / 3600 | 0;
        seconds = seconds % 3600;
        m = seconds / 60 | 0;
        s = seconds % 60;
        return (h ? h + ":" : "") + (m ? m + ":" : "") + s;
    }
});

bs.service("UrlService", function (URLS) {
    this.url = function (urlName, params) {
        var url = URLS[urlName];
        angular.forEach(params, function (value, key) {
            url = url.replace(":" + key, value);
        });
        return url;
    };
});

bs.factory("TagService", function ($http, UrlService) {
    var tags = {};
    $http.get(UrlService.url("terms")).success(function (responseTags) {
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
    var player;
    var settings;

    $window.onYouTubePlayerReady = function () {
        player = document.getElementById("player-swf");

        $rootScope.$broadcast("YTS_loaded_player", player);

        player.addEventListener("onStateChange", "onStateChange");

        function sendPosition() {
            $rootScope.$broadcast("YTS_change_position", player.getCurrentTime());
            $timeout(sendPosition, 333);
        }

        sendPosition();

        player.playVideo();
    };
    $window.onStateChange = function (state) {
        var playback = state == 1 || state == 3;
        $rootScope.$broadcast("YTS_change_state_player", playback);
    };

    var service = {
        getName: function () {
            return "y"
        },
        setSettings: function (sett) {
            settings = sett
        },
        getVideoUrl: function (vid) {
            return "http://youtube.com/watch?v=" + vid;
        },
        getVideoId: function (url) {
            var regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            }
            return false;
        },
        loadMeta: function (vid, cb) {
            $.getJSON("http://gdata.youtube.com/feeds/api/videos/" + vid + "?v=2&alt=json&prettyprint=true", function (resp) {
                cb({
                    title: resp.entry.title.$t,
                    duration: resp.entry.media$group.yt$duration.seconds,
                    uploader: resp.entry.author[0].name.$t,
                    uploaded: resp.entry.published.$t,
                    views: resp.entry.yt$statistics.viewCount
                });
            });
        },
        play: function (start) {
            if (angular.isNumber(start)) {
                player.seekTo(start, true);
            }
            player.playVideo();
        },
        stop: function () {
            player.stopVideo();
        },
        pause: function () {
            player.pauseVideo()
        },
        loadVideo: function (vid) {
            if (!player) {
                this.loadPlayer(vid);
            } else {
                player.loadVideoById(vid);
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
    return service;
});
bs.factory("PlayerService", function (YouTubeService, $timeout, $rootScope) {
    var service = YouTubeService;
    var video = {
        player: null,
        id: "",
        position: 0,
        duration: 0,
        title: "",
        uploader: "",
        uploaded: "",
        views: "",
        sersvice: service.getName(),
        playback: false
    };
    var settings = {
        height: 100
    };
    service.setSettings(settings);

    $rootScope.$on("YTS_loaded_player", function (e, player) {
        video.player = player;
        $rootScope.$broadcast("PS_loaded_player", player);
    });
    $rootScope.$on("YTS_change_position", function (e, position) {
//        if (video.position != position) {
            video.position = position;
            $rootScope.$broadcast("PS_change_position", position);
//        }
    });
    $rootScope.$on("YTS_change_state_player", function (e, playback) {
        if (video.playback != playback) {
            video.playback = playback;
            $rootScope.$broadcast("PS_change_state_player", playback);
        }
    });

    var api = {
        setHeight: function (height) {
            settings.height = height;
        },
        getVideo: function () {
            return video;
        },
        getVideoUrl: function (vid) {
            return service.getVideoUrl(vid);
        },
        getVideoId: function (url) {
            return service.getVideoId(url);
        },
        loadMeta: function (vid) {
            service.loadMeta(vid, function (resp) {
                angular.extend(video, resp)
                $rootScope.$broadcast("PS_loaded_meta");
            });
        },
        playVideo: function (start) {
            service.play(start)
        },
        togglePlay: function () {
            if (video.playback) {
                service.stop();
            } else {
                service.play();
            }
        },
        pauseVideo: function () {
            service.pause()
        },
        loadVideo: function (vid) {
            video.id = vid;
            service.loadVideo(vid);
        }
    };
    return api;
});

bs.factory("TrickService", function ($http, $rootScope, UrlService) {
    var tricks = [];
    var service = {
        loadTricks: function (vid) {
            $http({
                method: "GET",
                url: UrlService.url("tricks_load", {vid: vid})
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

bs.controller("UploadController", function ($scope, $http, $timeout, $window, PlayerService, TagService, TrickService, UrlService) {
    PlayerService.setHeight("300");

    $scope.videoUrl = "";
    $scope.trick = {
        start: 0,
        end: 0,
        preview: false,
        adding: false
    };
    $scope.tricks = [];
    $scope.video = PlayerService.getVideo();
    $scope.isValidUrl = function () {
        return !!PlayerService.getVideoId($scope.videoUrl);
    };

    $scope.loadVideo = function () {
        var vid = PlayerService.getVideoId($scope.videoUrl);
        if (vid) {
            $scope.videoUrl = PlayerService.getVideoUrl(vid)
            $scope.trick.preview = false;
            TrickService.loadTricks(vid);
            PlayerService.loadMeta(vid);
            PlayerService.loadVideo(vid);
        }
    };

    $scope.togglePlay = PlayerService.togglePlay;

    $scope.previewVideo = function () {
        PlayerService.playVideo($scope.trick.start);
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
            url: UrlService.url("trick_new", {vid: $scope.video.id}),
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
    $scope.$on("PS_change_position", function () {
        if ($scope.trick.preview && $scope.video.position >= $scope.trick.end) {
            $scope.trick.preview = false;
            PlayerService.pauseVideo();
        }
        $scope.$apply();
    });

    $scope.$on("PS_loaded_player", function () {
        $scope.$apply();
    });
    $scope.$on("PS_loaded_meta", function () {
        $scope.$apply();
    });
    $scope.$on("PS_change_state_player", function () {
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

bs.controller("PlaybackController", function ($scope, $http, PlayerService, TrickService, UrlService, $route, $routeParams, $rootScope, $location) {
    PlayerService.setHeight("500");

    $scope.tricks = [];
    $scope.videos = [];
    $scope.filter = "";

    $scope.video = PlayerService.getVideo();

    $scope.loadVideo = function (index) {
        var video = $scope.videos[index];
        PlayerService.loadVideo(video.vid);
        $scope.tricks = video.tricks;
    };

    $scope.setTrick = function (trick) {
        PlayerService.playVideo(trick.start);
    };

    $scope.isActive = function (trick) {
        return TrickService.isIn(trick, $scope.video.position) ? "active" : "";
    };
    $scope.isFilter = function (filter) {
        return $scope.filter == filter ? "active" : "";
    };

    function loadVideos(filter) {
        $http({
            method: "GET",
            url: UrlService.url("video_load", {filter: filter})
        }).success(function (videos) {
                $scope.videos = videos;
            }).error(function () {
                alert("Error");
            });
    }

    $scope.$on("PS_change_position", function () {
        $scope.$apply();
    });
    $scope.$on("TRS_loaded_tricks", function () {
        $scope.tricks = TrickService.getTricks();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    $rootScope.$on("$routeChangeStart", function () {
        $scope.videos.length = 0;
    });
    $rootScope.$on("$routeChangeSuccess", function () {
        loadVideos($routeParams.filter);
        $scope.filter = $routeParams.filter;
    });
});