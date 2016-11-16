'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('review_update', {
        url: '/review_update/:myrvId',
        templateUrl: 'app/review_update/review_update.html',
        controller: 'Review_updateController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
