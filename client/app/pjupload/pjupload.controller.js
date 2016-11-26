'use strict';

class PjuploadController {
  //start-non-standard
  pjupload = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor( Project, $state, $scope, $http) {
    this.Project = Project;
    this.$state  = $state;
    this.$scope = $scope;
    this.$http = $http;

    $scope.items = [
      'Develop', 
      'Designer', 
      'Business', 
      'art'
    ].map((v) => ({ name: v }));

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

    $scope.loadTags = (query) => {
         return $http.get('/api/projects/get-tags', { 
        params: { q: query }
      }).then((res) => res.data.map((el) => el._id));
    };

  }

  upload(form) {
    this.submitted = true;
    const field = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    this.pjupload.field= field;

      const input_tags = this.$scope.tags
      .map((tag) => tag.text);
    this.pjupload.tags = input_tags; 


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


