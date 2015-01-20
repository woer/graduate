var myServices = angular.module("MyServices", []);
myServices.service( 'roomListService', [ '$rootScope','$location' ,function( $rootScope,$location ) {
    var pomelo=$rootScope.pomelo;
    var service = {
        pomelo:pomelo,
        roomlist:[],
        username:"",
        longRequest: function (route,data,port) {
            pomelo.init({
                host: '127.0.0.1',
                port: port,
                log: true
            }, function () {

                pomelo.request(route, data, function(data) {

                    service.roomlist=data.roomList;
                    $rootScope.$broadcast('change');
                    $location.path("/index")
                    $rootScope.$apply();
                })
            })

        }
    }
    return service;
}]);



