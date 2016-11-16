'use strict';


class ReviewListController {

  review_list = {};

  constructor(Review, $scope) {
  
    this.Review = Review;
    this.$scope = $scope;

    this.Review.query().$promise
      .then((res) => {
             $scope.rvlist= res;

         console.log(res);
        //$scope.pjlist = Project.query();
      });

  }

}
angular.module('projectHeoApp')
.controller('ReviewListController', ReviewListController);

