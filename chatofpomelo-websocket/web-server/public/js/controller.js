


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
myController.controller('registerCtrl',function($scope,$location){
    $scope.register=function() {
       $location.path('/register')
    }

})


myController.controller('reg_submitCtrl',function($rootScope,$scope){
    var pomelo=$rootScope.pomelo;
    if($scope.reg_pass==$scope.reg_repass){
        $scope.repasstest=true;
    }
    else{
        $scope.repasstest=false;
    }


    $scope.reg_submit=function() {
        alert($scope.reg_name)
var route = 'gate.gateHandler.queryEntry';
pomelo.init({
    host: '127.0.0.1',
    port: 3014,
    log: true
}, function (data) {
    pomelo.request(route, {
        name: $scope.reg_name,
        pass:$scope.reg_pass
    }, function (data) {

    })
})
    }

})




























