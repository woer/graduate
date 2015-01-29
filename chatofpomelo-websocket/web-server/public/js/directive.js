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
                roomListService.rid=scope.id;
                var route = "chat.chatHandler.chooseRoom";
                roomListService.roomRequest(route,{rid:scope.id,username:roomListService.username},function(data){
                    roomListService.URLto('/gameDesk')
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
            bypolicevote : '=',
            bykillervote:'=',
            voteWho : '=votewho',
            allvote:'=',
            lastword:'='
        },
        template : '<div class="user text-center" ng-show="name">'
            + '<span ng-if="allvote&&stage==sta" class="beVote badge" style="background-color: #5f9ea0">{{allvote}}票</span>'
            + '<span ng-if="bypolicevote&&myaction==police" class="beVote badge" style="background-color: #5f9ea0">{{bypolicevote}}票</span>'
            + '<span ng-if="bykillervote&&myaction==killer" class="beVote badge" style="background-color: #5f9ea0">{{bykillervote}}票</span>'
            + '<span ng-if="voteWho" class="voteWho">{{voteWho}}</span>'
            + '<br><span class="badge">{{name}}</span><br><br>'
            + '<span ng-if="!action||alive" class="img"><img src={{pic}}></span>'
            +'<span class="lastWord img-rounded text-center" ng-if="!alive&&action"><textarea  ng-if="name==myname" ng-show="!lastword" send placeholder="请发表遗言，按回车确定" style="max-width: 95px;max-height: 91px;height: 91px"></textarea>{{lastword}}</span><br><br>'
            + '<span class="badge">{{position}}</span><br>'
            + '<span class="badge" ng-show="ready&&name!=roomowner" >ready</span><br>'
            + '<span class="badge" ng-if="action==myaction&&action!=farmer||(!alive&&action)">{{action}}</span><br>'
            + '</div>',
        link:function(scope, element, attrs){
           scope.sta='white';
            scope.police='警察';
            scope.killer='杀手';
            scope.farmer='平民';
            scope.myname=roomListService.username
            var pic=(scope.position+100)
            if(pic>110){
                pic=99;
            }
            pic=parseInt(pic);
            scope.pic="img/"+pic+".png";

            console.log("======"+element)
                element.bind("click", function () {
                      if(roomListService.myalive==false){
                            return;
                        }

                    if(!scope.alive&&scope.action){
                        return
                    }
                    if (scope.stage == 'black' && scope.myaction == '平民') {
                        return;
                    }
                    if (scope.stage == 'white' && scope.action) {
                       var route = "chat.chatHandler.ChooseKill";
                        var data = {
                            lastChoose: roomListService.lastchoose,
                            action: scope.myaction,
                            myaction: scope.myaction,
                            stage: scope.stage,
                            beChooseName: scope.name,
                            rid: roomListService.rid,
                            chooseName: roomListService.username
                        }

                        roomListService.roomRequest(route, data, function (data) {
                            roomListService.lastchoose = scope.name;
                        })
                        return;
                    }
                    if (scope.stage == 'black' && scope.myaction != '平民') {

                        var route = "chat.chatHandler.toChoose";
                        var data = {
                            lastChoose: roomListService.lastchoose,
                            action: scope.myaction,
                            myaction: scope.myaction,
                            stage: scope.stage,
                            beChooseName: scope.name,
                            rid: roomListService.rid,
                            chooseName: roomListService.username
                        }
                        roomListService.roomRequest(route, data, function () {
                            roomListService.lastchoose = scope.name;
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
             if(roomListService.lastworded){
                 return;
             }
             if(event.which==13){
                 if(element.val().length){
                 var route = "chat.chatHandler.send";
                 var data={
                     alive:roomListService.myalive,
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
              if(!roomListService.myalive){
                  return;
              }
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




























































