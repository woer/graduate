
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
myController.controller('registerCtrl',function($rootScope,$scope,$location){
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
          pomelo.request(route, {
               name: $scope.login_name,
               pass:$scope.login_pass
           }, function (data) {
              if(data.login) {

                  $rootScope.name=data.name;
                  $rootScope.header=data.header;
                  $location.path('/changeRoom');
                  $rootScope.$apply();
              }else{
                  alert("用户名密码不正确")
              }
           })

})
}
})
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

 $scope.roomlist=roomListService.roomlist;
console.log($scope.roomlist)
}])


























