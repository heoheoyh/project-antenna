'use strict';


class PjdeleteController {
  errors = {};
  submitted = false;

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
  del(form){
    this.submitted = true;

    if(form.$valid) {
      this.$http.delete('/api/projects/' + this.$stateParams.mypjId, this.pjdelete)
        .then((res) => {
          alert('success');
          this.$state.go('mypjlist');
        })
      .catch(err => {
        err = err.data;
        this.errors = {};

        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}
angular.module('projectHeoApp')
.controller('PjdeleteController', PjdeleteController);

