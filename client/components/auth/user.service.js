'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    query: {
      method:'GET', isArray:true
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    update: {
      method:'PUT',
    }
  });
}

angular.module('projectHeoApp.auth')
  .factory('User', UserResource);

})();
