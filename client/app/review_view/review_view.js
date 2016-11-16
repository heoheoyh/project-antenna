'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('review_view', {
        url: '/review_view/:pid',
        templateUrl: 'app/review_view/review_view.html',
        controller: 'ReviewViewController',
        controllerAs: 'vm'
      });
  });
