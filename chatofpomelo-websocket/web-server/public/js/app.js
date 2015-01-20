var routerApp = angular.module('routerApp', ['ui.router','MyController','MyServices','MyDirective']);
var pomelo=window.pomelo;

routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    pomelo=$rootScope.pomelo= window.pomelo;

});

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/html.html'
                },
                'topbar@index': {
                    templateUrl: 'tpls/topbar.html'
                },
                'main@index': {
                    templateUrl: 'tpls/home.html'
                }
            }
        })
        .state('index.killgame', {
            url: '/killgame',
            views: {
                'main@index': {
                    templateUrl: 'tpls/killgame.html'
                }
            }
        })
        .state('index.introduce', {
            url: '/introduce',
            views: {
                'main@index': {
                    templateUrl: 'tpls/introduce.html'
                }
            }
        })
        .state('index.operate', {
            url: '/operate',
            views: {
                'main@index': {
                    templateUrl: 'tpls/operate.html'
                }
            }
        })
        .state('index.charts', {
            url: '/charts',
            views: {
                'main@index': {
                    templateUrl: 'tpls/charts.html'
                }
            }
        })
        .state('index.video', {
            url: '/video',
            views: {
                'main@index': {
                    templateUrl: 'tpls/video.html'
                }
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'tpls/register.html'


        })
        .state('changeRoom', {
            url: '/changeRoom',
            templateUrl: 'tpls/changeRoom.html'


        })
});
