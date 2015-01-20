var MyDirective=angular.module('MyDirective',['MyServices'])
MyDirective.directive('room',['roomListService',function(roomListService) {
    return {
        restrict : 'EA',
        scope:{
            id : '=',
            roomowner : '=',
            states : '='
        },
        template : '<div class="room text-center" >'
            + '<div class="roomImg"><img src="img/18.png"></div>'
            + '<div style="margin-top: 30px;"><span class="h4 text-left">房间号:{{id}}</span>'
            + '<h4 >房主:{{roomowner}}</h4>'
            + '<h4 >状态:{{states}}</h4></div>'
            + '</div>',
        link:function(scope, element, attrs){
            element.bind( "click", function() {

                 var route = "connector.entryHandler.enter";
                roomListService.longRequest(route,{rid:scope.id,username:roomListService.username})

            });
        }
    }
}]);