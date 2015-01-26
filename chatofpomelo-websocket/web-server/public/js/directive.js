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
                roomListService.roomRequest(route,{rid:scope.id,username:roomListService.username},function(data){
//                    roomListService.roomlist=data.roomlist;
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
            alive : '=',
            name : '=',
            position : '=',
            ready : '=',
            roomowner:'=',
            action:'=',
            username:'=',
            stage:'=',
            myaction:'=',
            beVote : '=bevote',
            voteWho : '=votewho'
        },
        template : '<div class="user text-center" ng-show="name">'
            + '<br><span class="badge">{{name}}</span><br><br>'
            + '<span ng-if="!action||alive" class="img"><img src={{pic}}></span>'
            +'<span class="lastWord" ng-if="!alive&&action">遗言：</span><br><br>'
            + '<span ng-if="beVote" class="beVote badge" style="background-color: #5f9ea0">{{beVote}}</span>'
            + '<span ng-if="voteWho" class="voteWho">投{{voteWho}}</span>'
          +'<div class="rela">'
            + '<br><span class="badge">{{position}}</span><br>'
            + '<span class="badge" ng-show="ready" >ready</span><br>'
            + '<span class="badge" ng-if="action==myaction&&action!=farmer">{{action}}</span><br>'
            + '<span class="badge" ng-show="death" >death</span><br>'
            + '</div></div>',
        link:function(scope, element, attrs){

            scope.farmer='平民';
            var pic=(scope.position+100)
            if(pic>110){
                pic=99;
            }
            pic=parseInt(pic);
            scope.pic="img/"+pic+".png";

            console.log("======"+element)
            element.bind( "click", function() {
                if(scope.stage=='black'&&scope.myaction=='平民'){
                    return;
                }
                if(scope.stage=='white'&&scope.action){
                    var route = "chat.chatHandler.ChooseKill";
                    var data={
                        action:scope.myaction,
                        myaction:scope.myaction,
                        stage:scope.stage,
                        beChooseName:scope.name,
                        rid:roomListService.rid,
                        chooseName:roomListService.username
                    }
                    roomListService.roomRequest(route,data,function(){
                        element.val("")
                    })
                    return;
                }
                if(scope.stage=='black'&&scope.myaction!='平民'){
                var route = "chat.chatHandler.toChoose";
                var data={
                    action:scope.myaction,
                    myaction:scope.myaction,
                    stage:scope.stage,
                   beChooseName:scope.name,
                    rid:roomListService.rid,
                    chooseName:roomListService.username
                }
                roomListService.roomRequest(route,data,function(){
                    element.val("")
                })
                    return;
                }
        });
}
}
}]);
MyDirective.directive('send',['roomListService',function(roomListService) {
    return{
        restrict : 'EACM',
        link:function(scope, element, attrs){
         element.bind("keydown",function(event){

             if(event.which==13){
                 if(element.val().length){
                 var route = "chat.chatHandler.send";
                 var data={
                     action:scope.myaction,
                     stage:scope.stage,
                     message:element.val(),
                     rid:roomListService.rid,
                     user:roomListService.username
                 }
                 roomListService.roomRequest(route,data,function(){
                     element.val("")
                 })
                 }
             }
         })
        }


    }

}])
MyDirective.directive('prisend',['roomListService',function(roomListService) {
    return{
        restrict : 'EACM',
        link:function(scope, element, attrs){
            element.bind("keydown",function(event){

                if(event.which==13){
                    if(element.val().length){
                        var route = "chat.chatHandler.priSend";
                        var data={
                            action:scope.myaction,
                            message:element.val(),
                            rid:roomListService.rid,
                            user:roomListService.username
                        }
                        roomListService.roomRequest(route,data,function(){
                            element.val("")
                        })
                    }
                }
            })
        }


    }

}])




























































