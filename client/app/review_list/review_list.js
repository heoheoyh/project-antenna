'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('review_list', {
        url: '/review_list',
        templateUrl: 'app/review_list/review_list.html',
        controller: 'ReviewListController',
        controllerAs: 'vm'
      });
  });
