'use strict';

class PjupdateController {
  //start-non-standard
  pjupdate = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor( Project, $scope, $stateParams, $http, $state) {
    this.Project = Project;
    this.$scope = $scope;
    this.$stateParams  = $stateParams;
    this.$http = $http;
    this.$state = $state;

    $scope.items = [
      'one', 
      'two', 
      'three', 
      'four'
    ];

    this.Project.get({ id: $stateParams.mypjId}).$promise
      .then((res) => {
        this.pjupdate = res;
        console.log(res);
      });
  }

  update(form) {
    this.submitted = true;

    if (form.$valid) {
      this.$http.put('/api/projects/' + this.$stateParams.mypjId, this.pjupdate)
        .then((res) => {
          alert('success');
          this.$state.go('mypjlist');

        })
      //      this.Project.update({id: this.$stateParams.mypjId}).$promise
      //      .then((res) => {
      //        //alert('success');
      //       // this.$state.go('mypjlist');
      //        console.log(res);
      //      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('projectHeoApp')
.controller('PjupdateController', PjupdateController);


