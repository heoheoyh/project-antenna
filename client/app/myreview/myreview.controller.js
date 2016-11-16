'use strict';


class MyreviewController {

  constructor(Review,$scope) {
    this.Review = Review;
    this.$scope = $scope;

    this.Review.mine().$promise
      .then((res) => {
        $scope.myreview = res;
      });


  }

}
angular.module('projectHeoApp')
  .controller('MyreviewController', MyreviewController);

