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

bs.controller("YtController", function ($scope) {

});