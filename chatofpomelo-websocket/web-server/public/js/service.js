var myServices = angular.module("MyServices", []);
myServices.service( 'roomListService', [ '$rootScope', function( $rootScope ) {
    var service = {
        roomlist: [
            {id:0, roomowner: "", number: 0 ,states:""},
            {id:1, roomowner: "", number: 0 ,states:""},
            { id:2,roomowner: "", number: 0 ,states:""},
            { id:3,roomowner: "", number: 0 ,states:""},
            { id:4,roomowner: "", number: 0 ,states:""},
            { id:5,roomowner: "", number: 0 ,states:""}

        ],

        change: function ( roomList ) {
            service.roomList=roomList;
            $rootScope.$broadcast( 'books.update' );
        }
    }
    return service;
}]);

