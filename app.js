(function($) {
    angular.module('ProjectApp', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngMessages', 'ngIdle', 'ngCookies', 'ProjectAuth', 'nvd3']);
    /*
     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
    ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
    ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
    ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝*/
    angular.module('ProjectApp').config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, IdleProvider){
        $stateProvider.state('webapp', {
            abstract: true,
            url: '/app',
            templateUrl: 'partials/layout/layout.html'
        });

        $stateProvider.state('webapp.dashboard', {
            url: '',
            templateUrl: 'partials/dashboard/dashboard.html'
        });

        if(window.history && window.history.pushState){
            $locationProvider.html5Mode(true);
        }

        /* Add New States Above */
        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push([
            '$q', '$templateCache', '$injector',
            function($q, $templateCache, $injector) {
                var modifiedTemplates = {}; // Keep track which HTML templates have already been modified.
                var HAS_FLAGS_EXP = /data-(keep|omit)/; // Tests if there are any keep/omit attributes.
                return {
                    request: function(config) {
                        config.requestTimestamp = new Date().getTime();
                        return config;
                    },
                    response: function(response) {
                        var url = response.config.url, responseData = response.data;
                        response.config.responseTimestamp = new Date().getTime();
                        $templateCache.put(url, response.data);
                        return response;
                    },
                    responseError: function(response) {
                        if(response.data){
                            switch (response.data.code) {
                                case 401:
                                    location.href = '/auth';
                                    break;
                                case 500:
                                    console.log('Elías ha sido notificado del error. Intenta de nuevo más tarde.');
                                    break;
                                case 400:
                                case 404:
                                    break;
                                default:
                                    if (!response.config.requestNumberTries) {
                                        response.config.requestNumberTries = 0;
                                    }
                                    if (response.config.requestNumberTries <= 3) {
                                        console.debug('Error desconocido, reintentando...');
                                        response.config.requestNumberTries++;
                                        var $http = $injector.get('$http');
                                        return $http(response.config);
                                    }
                                    break;
                            }
                        }
                        return $q.reject(response);
                    }
                };
            }
        ]);

        // configure Idle settings
        IdleProvider.idle(600); // in seconds
        IdleProvider.timeout(60); // in seconds
    });
    /*
    ██████╗ ██╗   ██╗███╗   ██╗
    ██╔══██╗██║   ██║████╗  ██║
    ██████╔╝██║   ██║██╔██╗ ██║
    ██╔══██╗██║   ██║██║╚██╗██║
    ██║  ██║╚██████╔╝██║ ╚████║
    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝*/
    angular.module('ProjectApp').run(function($rootScope){
        $(document).on('click', function(event) {
            $rootScope.$apply(function() {
                $rootScope.$emit('global:clickListen', event);
            });
        });

        $(window).on('keydown keypress', function(event) {
            var keyCode = event.charCode || event.keyCode || event.which;
            if (keyCode === 27) {
                $rootScope.$apply(function() {
                    $rootScope.$emit('global:cancelPressed');
                });
            }
        });
    });
    /*
     ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ 
    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗
    ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██████╔╝
    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██╔══██╗
    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██║  ██║
     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝*/
    angular.module('ProjectApp').controller('InitialController', function($scope){
        /*var modal = {
            open: function() {
                pbAlert.open($scope.idleTitle || 'Session Idle', $scope.idleText || 'Session will expire due to inactivity:');
            },
            close: function() {
                pbAlert.close();
            }
        };

        $scope.$on('IdleStart', function() {
            modal.open();
        });

        $scope.$on('IdleTimeout', function(){
            modal.close();
            if($state.current.name.toLowerCase().includes("millasparaelretiro")){
                $state.go('expired', {expired: 'millasparaelretiro'});
            }
            else{
                $state.go('expired', {expired: 'expired'});
            }
        });

        $scope.$on('IdleEnd', function() {
            modal.close();
        });*/
    });
}(jQuery));
