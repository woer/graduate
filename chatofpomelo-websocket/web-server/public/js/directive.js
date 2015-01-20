var MyDirective=angular.module('MyDirective',[])
MyDirective.directive('room',[function() {
    return {
        restrict : 'EA',
        scope:{


        },
        templateUrl : 'tpls/room.html',
        link:function(){

        }
    }
}]);