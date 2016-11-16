'use strict';

(function(angular) {

  function PartnerResource($resource) {
    return $resource('/api/partners/:id', { id: '@_id' }, {
      'query': {
        method: 'GET', isArray:true
      }
    });
  }

  angular.module('projectHeoApp.auth')
    .factory('Partner', PartnerResource);

})(angular);
