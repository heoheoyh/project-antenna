'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pjlist', {
        url: '/pjlist',
        templateUrl: 'app/pjlist/pjlist.html',
        controller: 'PjlistController',
        controllerAs: 'pjlist'
       // authenticate: true    
      });
  });
