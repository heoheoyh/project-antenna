'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('review_delete', {
        url: '/review_delete/:myrvId',
        templateUrl: 'app/review_delete/review_delete.html',
        controller: 'ReviewDeleteController',
        controllerAs: 'vm'
      });
  });
