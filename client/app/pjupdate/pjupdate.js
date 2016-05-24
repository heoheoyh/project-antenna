'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pjupdate', {
        url: '/pjupdate/:mypjId',
        templateUrl: 'app/pjupdate/pjupdate.html',
        controller: 'PjupdateController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
