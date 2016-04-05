'use strict';

angular.module('projectHeoApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('partner', {
        url: '/partner',
        templateUrl: 'app/partner/partner.html',
        controller: 'PartnerController',
        controllerAs: 'partner' 
      });
  });
