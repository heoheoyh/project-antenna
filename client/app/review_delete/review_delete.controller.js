'use strict';


class ReviewDeleteController {
  errors = {};

  constructor(Review, $scope, $stateParams, $http, $state) {
    this.Review = Review;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.$state = $state;

    this.Review.get({ id: $stateParams.myrvId}).$promise
      .then((res) => {
        this.rvdelete = res;
        console.log(res);
      });

  }
  del(){
    this.$http.delete('/api/reviews/' + this.$stateParams.myrvId, this.rvdelete)
      .then((res) => {
        alert('success');
        this.$state.go('myreview');
      })
    .catch(err => {
      err = err.data;
      this.errors = {};

    });

  }
}
angular.module('projectHeoApp')
.controller('ReviewDeleteController', ReviewDeleteController);

