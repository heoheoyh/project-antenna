'use strict';

(function(angular) {

  function LocalResource($resource) {
    return $resource('/api/locals/:id', { id: '@_id' }, {
      'get': {
        method: 'get'
      }
    });
  }

  angular.module('projectHeoApp.auth')
    .factory('Local', LocalResource);

})(angular);
