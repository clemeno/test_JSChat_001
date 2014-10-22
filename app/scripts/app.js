'use strict';

/**
 * @ngdoc overview
 * @name testJschat001App
 * @description
 * # testJschat001App
 *
 * Main module of the application.
 */
angular
  .module('testJschat001App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('socket', function (socketFactory) {
    return socketFactory({
      prefix: 'please:',
      ioSocket: io.connect('192.168.1.16:8989')
    });
  });
