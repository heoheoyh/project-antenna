'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('myreview', {
        url: '/myreview',
        templateUrl: 'app/myreview/myreview.html',
        controller: 'MyreviewController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
