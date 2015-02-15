'use strict';

describe('Controller: AppController', function () {

  // load the controller's module
  beforeEach(module('allegroIoApp'));

  var AppController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppController = $controller('AppController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toEqual('one');
  });
});
