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
      'programming', 
      'design', 
      'business', 
      'plan',
      'image',
      'photo',
      'marketing',
      'broadcasting',
      'fashion',
      'economic',
      'volunteer',
      'thesis',
      'education ',
      'welfare',
      'story',
      'idea',
      'sports',
      'finance',
      'advertising'

         ].map((v) => ({ name: v }));

    $scope.tags = [];

   $scope.pjtypes = [
      '개인', 
      '공모전'
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
        $scope.tags = this.pjupdate.tags;

      });

        $scope.loadTags = (query) => {
         return $http.get('/api/projects/get-tags', { 
        params: { q: query }
      }).then((res) => res.data.map((el) => el._id));
    };

  }

  update(form) {
    this.submitted = true;
    const gotcha = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    this.pjupdate.field= gotcha;

    const input_tags = this.$scope.tags
      .map((tag) => tag.text);
    this.pjupdate.tags = input_tags;

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


