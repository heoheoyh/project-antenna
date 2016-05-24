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
    ];
    $scope.limit = 3;
    $scope.checked = 0;
    $scope.checkChanged = function(item){
      if(item.winner) $scope.checked++;
      else $scope.checked--;
      console.log($scope.checked)
    }

  }

  upload(form) {
    this.submitted = true;

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


