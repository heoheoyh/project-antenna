'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pjreview', {
        url: '/pjreview',
        templateUrl: 'app/pjreview/pjreview.html',
        controller: 'PjreviewController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
