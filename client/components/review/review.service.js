'use strict';

(function(angular) {

  function ReviewResource($resource) {
    return $resource('/api/reviews/:id', { id: '@_id' }, {
      'save':   {
        method:'POST'
      },
      'query':  {
        method:'GET', isArray:true
      },
      'get': {
        method: 'get'
      },
      'update': {
        method:'PUT'
      },
      'mine' : {
        method: 'GET', isArray:true,
        params:{
          id: 'mine' 
        }
      },
      'delete' : {
        method: 'DELETE'
      }
    });
  }

  angular.module('projectHeoApp.auth')
    .factory('Review', ReviewResource);

})(angular);
