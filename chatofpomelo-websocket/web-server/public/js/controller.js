
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
    $scope.stage='';
    $scope.width=100;
    $scope.text='天黑了，杀手出来杀人吧'
    $scope.textShow=false;
    $scope.back=true;
    $scope.myType='info'
    $scope.roomlist=null;
    $scope.myaction="";
    $scope.remain='';
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
        console.log("onChoose"+roomListService.roomlist)
        $scope.toReady=true;
        $scope.dounReady=false;
        $scope.users=data.roomList[rid].user;
        $scope.roomowner=roomListService.roomlist[rid].roomowner;

        $scope.start = true;
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

    function timer(){
        var tim=setInterval(function(){
            console.log($scope.width)
            $scope.width=$scope.width-2;
            if($scope.width==0){
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


    pomelo.on("doStart",function(data){
        timer();
        $scope.textShow=true;
        $timeout(function(){
            $scope.textShow=false;
        },3000);
        $scope.stage='black';
        $scope.toReady=false;
        $scope.dounReady=false;
        $scope.users=data.roomList.user;

        $scope.remain=data.roomList.remain;
        $scope.back=false;
        var users=$scope.users;
        for(var i=0;i<20;i++){
            if(users[i].name==$scope.username){
                     $scope.myaction=users[i].action;
            }

        }
        $scope.$apply();

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

























