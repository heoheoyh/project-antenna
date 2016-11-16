'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('review_upload', {
        url: '/review_upload',
        templateUrl: 'app/review_upload/review_upload.html',
        controller: 'ReviewUploadController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
