var myServices = angular.module("MyServices", []);
myServices.service( 'roomListService', [ '$rootScope', function( $rootScope ) {
    var pomelo=$rootScope.pomelo;
    var service = {
        roomlist: [
            { id:0, roomowner: "",states:""},
            { id:1, roomowner: "",states:""},
            { id:2,roomowner: "", states:""},
            { id:3,roomowner: "",states:""},
            { id:4,roomowner: "", states:""},
            { id:5,roomowner: "",states:""},
            { id:6,roomowner: "",states:""},
            { id:7,roomowner: "" ,states:""}

        ],
        username:$rootScope.name,
        change: function ( roomList ) {
            service.roomList=roomList;
            $rootScope.$broadcast('books.update');
        },
        longRequest: function (route,data) {
            pomelo.init({
                host: '127.0.0.1',
                port: 3050,
                log: true
            }, function () {

                pomelo.request(route, data, function() {
                    service.roomlist=[];
                    $rootScope.$broadcast('change');
                })
            })

        }
    }
    return service;
}]);



