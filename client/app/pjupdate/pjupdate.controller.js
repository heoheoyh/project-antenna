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
    ].map((v) => ({ name: v }));

    const Checker = (limit) => {
      return (items) => {
        const itemNum = items.filter((item) => item.ischecked).length;
        return itemNum === limit;
      };
    };

    $scope.ItemsOver = Checker(3);

    this.Project.get({ id: $stateParams.mypjId}).$promise
      .then((res) => {
        this.pjupdate = res;
        $scope.items =  $scope.items.map((item) => {
          item.ischecked = this.pjupdate.field.indexOf(item.name) >= 0;
          return item;
        });

      });
  }

  update(form) {
    this.submitted = true;
    const gotcha = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    console.log(gotcha);
    this.pjupdate.field= gotcha;

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


