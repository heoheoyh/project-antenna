'use strict';


class PjdeleteController {
  errors = {};

  constructor(Project, $scope, $stateParams, $http, $state) {
    this.Project = Project;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.$state = $state;

    this.Project.get({ id: $stateParams.mypjId}).$promise
      .then((res) => {
        this.pjdelete = res;
        console.log(res);
      });

  }
  del(){
    this.$http.delete('/api/projects/' + this.$stateParams.mypjId, this.pjdelete)
      .then((res) => {
        alert('success');
        this.$state.go('mypjlist');
      })
    .catch(err => {
      err = err.data;
      this.errors = {};

    });

  }
}
angular.module('projectHeoApp')
.controller('PjdeleteController', PjdeleteController);

