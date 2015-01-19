var myServices = angular.module("MyServices", []);
myServices.controller("imageController",function($scope,$timeout){
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

