'use strict';

class PjuploadController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $scope, $log, User) {
    this.User = User;
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    //this.getCurrentUser = Auth.getCurrentUser;
    //console.log(this.user.interests= Auth.getCurrentUser().interests);
    this.user={
    };


  }

  pjupload(form) {
    this.submitted = true;

    if (form.$valid) {
      const user = this.Auth.getCurrentUser();
      //console.log(this.user.interests);
      this.User.update({ id: user._id }, {
        url: this.user.url, 
        gender: this.user.gender, 
        interests: this.user.interests, 
        place: this.user.place, 
        mytype: this.user.mytype,
        yourtype: this.user.yourtype, 
        description: this.user.description 
      }).$promise
      .then(() => {
        //this.$state.go('profile');
        location.reload();
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


