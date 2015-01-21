
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
    $scope.$on('change', function( event ) {
        $scope.roomlist = roomListService.roomlist;
        $scope.$apply();
    });
//pomelo.on("onAdd",function(data){
//    alert(data.rid+"data.myRoomList"+data.username)
//var id=data.rid;
//    var username=data.username;
//        if(!$scope.roomlist[id].roomowner){
//            $scope.roomlist[id].roomowner=data.username;
//        }
//    for(var i=0;i<$scope.roomlist[id].user.length;i++){
//        if($scope.roomlist[id].user[i]==username){
//            return;
//        }
//
//    }
//    $scope.roomlist[id].user.push(username)
//    roomListService.roomlist=$scope.roomlist;
//        $scope.$apply();
//})

    pomelo.on("onChoose",function(data){
        roomListService.roomlist=$scope.roomlist=data.roomList;
        $scope.$apply();

    })


}])


























