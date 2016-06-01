'use strict';

class PjuploadController {
  //start-non-standard
  pjupload = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor( Project, $state, $scope) {
    this.Project = Project;
    this.$state  = $state;
    this.$scope = $scope;

    $scope.items = [
      'one', 
      'two', 
      'three', 
      'four'
    ].map((v) => ({ name: v }));
    $scope.limit = 3;
    $scope.checkNum = 0;
    $scope.checkChanged = function(item){
      if(item.ischecked) $scope.checkNum++;
      else $scope.checkNum--;
      console.log($scope.checkNum)
    }

  }

  upload(form) {
    this.submitted = true;
    const gotcha = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    console.log(gotcha);
    this.pjupload.field= gotcha;

    if (form.$valid) {
      //$http.post('/api/projects/', this.pjupload)
      this.Project.save(this.pjupload).$promise
        .then((res) => {
          alert('success');
          this.$state.go('pjlist');
          //location.reload();
          //console.log(res);
        })
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
.controller('PjuploadController', PjuploadController);


