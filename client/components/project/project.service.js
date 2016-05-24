'use strict';

(function(angular) {

  function ProjectResource($resource) {
    return $resource('/api/projects/:id', { id: '@_id' }, {
      'save':   {
        method:'POST'
      },
      'query':  {
        method:'GET', isArray:true
      },
      'get': {
        method: 'GET'
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
    .factory('Project', ProjectResource);

})(angular);
