
var myController = angular.module("MyController", []);
myController.controller("imageController",function($scope){
var images=["img/2.jpg","img/3.gif","img/4.jpg"]
$scope.show_img=images[0];
    var i=0;
setInterval(function(){
    i=i+1;
    i=i%3
    $scope.$apply(function(){
        $scope.show_img=images[i];
    })
},2000)

})
myController.controller('registerCtrl',['$rootScope','$scope','$location','roomListService',function($rootScope,$scope,$location,roomListService){
    var pomelo=$rootScope.pomelo;

    $scope.register=function() {
       $location.path('/register')
    }
   $scope.login_Sub=function(){
       var route = 'gate.gateHandler.loginValidate';
       pomelo.init({
           host: '127.0.0.1',
           port: 3014,
           log: true
       }, function (data) {
           var username=$scope.login_name;
          pomelo.request(route, {
               name: $scope.login_name,
               pass:$scope.login_pass
           }, function (data) {
           pomelo.disconnect();
              if(data.login) {
                  pomelo.init({
                      host: '127.0.0.1',
                      port: 3051,
                      log: true
                  }, function (data) {
                      $rootScope.header='img/17.jpg';
                      $rootScope.name=username;
                  var route = "connector.entryHandler.enter";
                  pomelo.request(route, {rid:"room",username:username}, function (data) {
                     roomListService.roomlist=data.roomList;
                      roomListService.username=username;
                      $location.path('/changeRoom');
                      $rootScope.$apply();
                  })


                  })
           }else{
                  alert("用户名密码不正确")
              }
           })

})
}
}])
myController.controller('reg_submitCtrl',function($rootScope,$scope,$location){
    var pomelo=$rootScope.pomelo;
    $scope.reg_submit=function() {

      var route = 'gate.gateHandler.queryEntry';
pomelo.init({
    host: '127.0.0.1',
    port: 3014,
    log: true
}, function (data) {

    pomelo.request(route, {
        name: $scope.reg_name,
        pass:$scope.reg_pass,
        email:$scope.reg_email
    }, function (data) {
       pomelo.disconnect();

       $location.path('/index');
        $rootScope.$apply();
    })
})
    }

})

myController.controller('roomListCtrl',['$rootScope','$scope','$location','roomListService',function($rootScope,$scope,$location,roomListService){
    var pomelo=$rootScope.pomelo;
    $scope.name=$rootScope.name;
    $scope.header=$rootScope.header;
 $scope.roomlist=roomListService.roomlist;
    $rootScope.roomlist=roomListService.username;
    $scope.$on('change', function( event ) {
        $scope.roomlist = roomListService.roomlist;
        $scope.$apply();
    });

    pomelo.on("onChoose",function(data){
        roomListService.roomlist=$scope.roomlist=data.roomList;

        console.log("onChoose"+roomListService.roomlist)

        $scope.$apply();

    })


}])
myController.controller('userListCtrl',['$timeout','$rootScope','$scope','$location','roomListService',function($timeout,$rootScope,$scope,$location,roomListService){
    var pomelo=$rootScope.pomelo;
     var rid=roomListService.rid;
    $scope.tips=[];
    $scope.privatemessages=[];
    $scope.stage='';
    $scope.police='警察';
    $scope.killer='杀手';
    $scope.farmer='平民';
    $scope.width=50;
    $scope.text='天黑了，杀手出来杀人吧'
    $scope.textShow=false;
    $scope.back=true;
    $scope.myType='info'
    $scope.roomlist=null;
    $scope.myaction="";
    $scope.priChannel=false;
    $scope.remain='';
    $scope.policelightMessage="";
    $scope.lightMessage='';
    $scope.gameStart=false;
    $scope.start=true;
    $scope.toReady=true;
    $scope.dounReady=false;
    $scope.username=roomListService.username;
    $scope.users=roomListService.roomlist[rid].user;
    $scope.roomowner=roomListService.roomlist[rid].roomowner;
    $scope.$on('change', function( event ) {
       $scope.roomlist = roomListService.roomlist;
        $scope.$apply();
    });
    pomelo.on("onChoose",function(data){
        roomListService.roomlist=$scope.roomlist=data.roomList;
        console.dir(roomListService.roomlist)
        $scope.toReady=true;
        $scope.dounReady=false;
        $scope.users=data.roomList[rid].user;
        $scope.roomowner=roomListService.roomlist[rid].roomowner;

        $scope.start = true;
        $scope.$apply();

    });

    pomelo.on('onTip',function(data){
        $scope.tips=data.tips;
        $scope.$apply();
    })


    pomelo.on("onSend",function(data){
        console.log("onSend"+roomListService.roomlist)
        $scope.send="";
        $scope.messages=roomListService.message=data.message;
        $scope.$apply();
    })
    $scope.unReady=function(){
        var route = "chat.chatHandler.unReady";
        roomListService.roomRequest(route,{
            name:$scope.username,
            rid:rid
        },function(){
            $scope.toReady=true;
            $scope.dounReady=false;
            $scope.$apply();
        })


    }

    $scope.doReady=function(){

        var route = "chat.chatHandler.doReady";
        roomListService.roomRequest(route,{
            name:$scope.username,
            rid:rid
        },function(){
            $scope.toReady=false;
            $scope.dounReady=true;

            $scope.$apply()
        })
    }

    $scope.doStart=function(){
        var route = "chat.chatHandler.doStart";
        roomListService.roomRequest(route,{
            rid:rid
        },function(){
            $scope.start=true;
            $scope.$apply();

        })
    }

    function light(){
        var route = "chat.chatHandler.doLight";
        roomListService.roomRequest(route,{
            rid:rid
        },function(){
        })




    }


    function timer(states){
        var tim=setInterval(function(){
            $scope.width=$scope.width-2;
            if($scope.width==0){
                if(states=='black'){
                    $scope.back=true;
                    $scope.tips=[];
                    if($scope.roomowner==$scope.username){
                        light();
                    }
                    $scope.$apply();
                }else{
                    $scope.back=false;
                    $scope.$apply();

                }
                clearInterval(tim)
            }
            if($scope.width<50&&$scope.width>15){
                $scope.myType='warning'
            }
            if($scope.width<15){
                $scope.myType='danger'
            }
            $scope.$apply();

        },1000);
    }
    pomelo.on('doLight',function(data){
        console.log(data.user);
        $scope.users=data.user;
        $scope.tips=[];
        $scope.back=true;
        $scope.stage='white'

        $scope.textShow=true;
        $scope.text='天亮了，选出你所认为的杀手吧'
        $timeout(function(){
            $scope.textShow=false;
        },3000);
        $scope.lightMessage="("+data.message.beKilled+")被杀了：身份-->"+data.message.killAction;
       if(data.message.beKilled.length==0){
           $scope.lightMessage="";
       }

        if($scope.myaction=='警察'){
            $scope.policelightMessage="验证（"+data.message.policeTip+"）的身份-->"+data.message.policeAction;
        }
        if(data.message.policeTip.length==0){
            $scope.policelightMessage="";
        }

        $scope.width=100;
        timer($scope.stage);
        $scope.$apply();

    })





    pomelo.on("doStart",function(data){

        $scope.textShow=true;
        $timeout(function(){
            $scope.textShow=false;
        },3000);
        $scope.stage='black';
        timer($scope.stage);
        $scope.toReady=false;
        $scope.dounReady=false;
        $scope.users=data.roomList.user;
        $scope.gameStart=true;
        $scope.remain=data.roomList.remain;
        $scope.back=false;
        var users=$scope.users;
        for(var i=0;i<20;i++){
            if(users[i].name==$scope.username){
                     $scope.myaction=users[i].action;
                if(users[i].action=='警察'||users[i].action=='杀手'){
                    $scope.priChannel=true;
                }

            }

        }
        $scope.$apply();

    })

    pomelo.on("onPriSend",function(data){
        $scope.privatemessages.push({
            username:data.username,
            message:data.message
        });
        $rootScope.$apply();

    })
    pomelo.on("onReady",function(data){
        console.dir(roomListService);
        console.log("onReady"+roomListService.roomlist)
        $scope.users=data.user;
        $rootScope.$apply();
           for (var i = 1; i < 20; i++) {
                if ($scope.users[i].ready) {
                    if ($scope.users[i].ready != 'ready') {
                        $scope.start=true;
                       return;
                    }
                }
            }
       $scope.start = false;
        $rootScope.$apply();
    })

    pomelo.on("unReady",function(data){
        console.log("unReady"+roomListService.roomlist)
        $scope.users=data.user;
        $scope.start = true;
        $scope.$apply();
        $rootScope.$apply();
    })






}])

























