'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pjview', {
        url: '/pjview/:pid',
        templateUrl: 'app/pjview/pjview.html',
        controller: 'PjviewController',
        controllerAs: 'vm'
      });
  });
