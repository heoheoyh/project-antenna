'use strict';

class ReviewUpdateController {
  //start-non-standard
  review_update = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor( Review, $scope, $stateParams, $http, $state) {
    this.Review = Review;
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

    $scope.tags = [
      'just',
      'taga'
    ];

    const Checker = (limit) => {
      return (items) => {
        const itemNum = items.filter((item) => item.ischecked).length;
        return itemNum === limit;
      };
    };

    $scope.ItemsOver = Checker(3);

    this.Review.get({ id: $stateParams.myrvId}).$promise
      .then((res) => {
        this.rvupdate = res;
        $scope.items =  $scope.items.map((item) => {
          item.ischecked = this.rvupdate.field.indexOf(item.name) >= 0;
          return item;

        });
         $scope.tags = this.rvupdate.tags;

      });
  }

  update(form) {
    this.submitted = true;
    const checked_field = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    this.rvupdate.field= checked_field;

    const input_tags = this.$scope.tags
    .map((tag) => tag.text);
    this.rvupdate.tags = input_tags;

    if (form.$valid) {
      this.$http.put('/api/reviews/' + this.$stateParams.myrvId, this.rvupdate)
        .then((res) => {
          alert('success');
          this.$state.go('myreview');

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
.controller('ReviewUpdateController', ReviewUpdateController);


