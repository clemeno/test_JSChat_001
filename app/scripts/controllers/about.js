'use strict';

/**
 * @ngdoc function
 * @name testJschat001App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testJschat001App
 */
angular.module('testJschat001App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
