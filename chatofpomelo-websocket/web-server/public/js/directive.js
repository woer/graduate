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

                var route = "chat.chatHandler.chooseRoom";
                roomListService.roomRequest(route,{rid:scope.id,username:roomListService.username},function(){
                    roomListService.URLto('/gameDesk')
                    roomListService.rid=scope.id;
                })

            });
        }
    }
}]);
MyDirective.directive('user',['roomListService',function(roomListService) {
    return {
        restrict : 'EA',
        scope:{
            name : '=',
            position : '=',
            ready : '='
        },
        template : '<div class="user text-center" >'
            + '<span >{{name}}</span><br>'
            + '<span ><img src="img/18.png"></span><br>'
            + '<span >{{position}}</span><br>'
            + '<span >{{ready}}</span><br>'
            + '</div>',
        link:function(scope, element, attrs){
            element.bind( "click", function() {
      alert("xx")

        });
}
}
}]);

































































