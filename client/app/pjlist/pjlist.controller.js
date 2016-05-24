'use strict';


class PjlistController {

  pjlist = {};

  constructor(Project, $scope) {
    this.Project = Project;
    this.$scope = $scope;

    this.Project.query().$promise
      .then((res) => {
             $scope.pjlist= res;

        // console.log(res);
        //$scope.pjlist = Project.query();
      });

  }

}
angular.module('projectHeoApp')
.controller('PjlistController', PjlistController);

