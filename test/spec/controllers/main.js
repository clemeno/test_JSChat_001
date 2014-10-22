'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('testJschat001App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should should have no messages to the scope', function () {
    expect(scope.messages.length).toBe(0);
  });
});
