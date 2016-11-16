'use strict';

class ReviewViewController {

  constructor(Review, $scope, $stateParams) {
    this.Review = Review;
    this.$scope = $scope;

    this.Review.get({ id: $stateParams.pid }).$promise
      .then((res) => {
        this.rvview = res;
      });
  }


}
angular.module('projectHeoApp')
.controller('ReviewViewController', ReviewViewController);

