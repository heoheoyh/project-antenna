'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pjdelete', {
        url: '/pjdelete/:mypjId',
        templateUrl: 'app/pjdelete/pjdelete.html',
        controller: 'PjdeleteController',
        controllerAs: 'vm'
      });
  });
