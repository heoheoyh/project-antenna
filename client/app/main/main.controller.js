'use strict';

(function() {

  class MainController {

    constructor($http, $scope, $stateParams, Project) {
      this.$http = $http;
      this.Project = Project;
      this.$scope = $scope;

      this.Project.query().$promise
        .then((res) => {
          $scope.newPjlist= res;

          //$scope.pjlist = Project.query();
        });

    }
  }
  angular.module('projectHeoApp')
    .controller('MainController', MainController);
})();
