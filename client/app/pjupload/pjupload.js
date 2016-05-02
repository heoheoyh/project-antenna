'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pjupload', {
        url: '/pjupload',
        templateUrl: 'app/pjupload/pjupload.html',
        controller: 'PjuploadController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
