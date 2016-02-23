'use strict';

angular.module('projectHeoApp', [
  'projectHeoApp.auth',
  'projectHeoApp.admin',
  'projectHeoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
   'ui.materialize'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
