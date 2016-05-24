'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('mypjlist', {
        url: '/mypjlist',
        templateUrl: 'app/mypjlist/mypjlist.html',
        controller: 'MypjlistController',
        controllerAs: 'vm',
        authenticate: true    
      });
  });
