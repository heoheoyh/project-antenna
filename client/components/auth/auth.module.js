'use strict';

angular.module('projectHeoApp.auth', [
  'projectHeoApp.constants',
  'projectHeoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
