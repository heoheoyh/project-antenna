'use strict';

class PjviewController {

  constructor(Project, $scope, $stateParams) {
    this.Project = Project;
    this.$scope = $scope;

    this.Project.get({ id: $stateParams.pid }).$promise
      .then((res) => {
        this.pjview = res;
      });
  }


}
angular.module('projectHeoApp')
.controller('PjviewController', PjviewController);

