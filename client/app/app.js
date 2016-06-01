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
    'validation.match',
    'ui.materialize',
    'uiGmapgoogle-maps',
   'checklist-model',
   'ngFileUpload'
])
.config(function($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyD_CbgT2wQlWL3ARWKZ9lAFvK9UGtboCqI',
    v: '3.exp', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization,places'
  });

});

