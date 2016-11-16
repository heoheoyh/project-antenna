'use strict';


class ReviewUploadController {

  review_upload = {};

  constructor(Review, $state, $scope, $http) {
    this.Review = Review;
    this.$state  = $state;
    this.$scope = $scope;
    this.$http = $http;

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

    $scope.tags = [
      'just',
      'taga'
    ];
 
    $scope.loadTags = function(query) {
      return this.Review.query().$promise;
     // $http.get('/tags?query=' + query);
    };


  }

  upload(form) {
    this.submitted = true;
    const checked_field = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    this.rvupload.field= checked_field;

    const input_tags = this.$scope.tags
      .map((tag) => tag.text);
    this.rvupload.tags = input_tags; 

    if (form.$valid) {
      //$http.post('/api/projects/', this.pjupload)
      this.Review.save(this.rvupload).$promise
        .then((res) => {
          alert('success');
          this.$state.go('review_list');
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
  .controller('ReviewUploadController', ReviewUploadController);

