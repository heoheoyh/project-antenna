'use strict';

class ProfileController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $scope, $log, User, Upload) {
    this.User = User;
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.Upload = Upload;

    $scope.items = [
      'one', 
      'two', 
      'three', 
      'four'
    ].map((v) => ({ name: v }));
    $scope.limit = 3;
    $scope.checkNum = 0;
    $scope.checkChanged = function(item){
      if(item.ischecked) $scope.checkNum++;
      else $scope.checkNum--;
    }
    $scope.mytypes = [
      'good', 
      'bad', 
      'sad', 
      'joy'
    ].map((v) => ({ name: v }));
    $scope.limit2 = 3;
    $scope.checkNum2 = 0;
    $scope.checkChanged2 = function(mytype){
      if(mytype.ischecked) $scope.checkNum2++;
      else $scope.checkNum2--;
    }
    $scope.yourtypes = [
      'developer', 
      'designer', 
      'business', 
      'manager'
    ].map((v) => ({ name: v }));
    $scope.limit3 = 3;
    $scope.checkNum3 = 0;
    $scope.checkChanged3 = function(yourtype){
      if(yourtype.ischecked) $scope.checkNum3++;
      else $scope.checkNum3--;
    }


    $scope.items =  $scope.items.map((item) => {
      item.ischecked = Auth.getCurrentUser().interests.indexOf(item.name) >= 0;
      return item;
    });

    $scope.mytypes =  $scope.mytypes.map((mytype) => {
      mytype.ischecked = Auth.getCurrentUser().mytype.indexOf(mytype.name) >= 0;
      return mytype;
    });

    $scope.yourtypes =  $scope.yourtypes.map((yourtype) => {
      yourtype.ischecked = Auth.getCurrentUser().yourtype.indexOf(yourtype.name) >= 0;
      return yourtype;
    });

    this.user={
      name: Auth.getCurrentUser().name, 
      email: Auth.getCurrentUser().email,
      url: Auth.getCurrentUser().url,
      profileUrl: Auth.getCurrentUser().profileImage,
      gender: Auth.getCurrentUser().gender,
      interests: Auth.getCurrentUser().interests,
      place: Auth.getCurrentUser().place,
      mytype: Auth.getCurrentUser().mytype,
      yourtype: Auth.getCurrentUser().yourtype,
      description: Auth.getCurrentUser().description
    };
    $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'client/app/upload',
        data: { file: file},
      })};

    $scope.map = {
      center: {
        latitude: 50.6278,
        longitude: 3.0583
      },
      zoom: 16,
      markers: [],
      options: {
        scrollwheel:false
      }
    };
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 50.6278,
        longitude: 3.0583
      }
    };

    $scope.searchbox= {
      template: 'searchbox.tpl.html',
      position:'top-right',
      position:'top-left',
      events:'events', 
      parentdiv:'searchBoxParent',
      options: {
        bounds: {},
        visible: true
      },
      events :{
        places_changed: (searchBox) => {
          const place = searchBox.getPlaces()[0];
          this.user.place = place.name;
          console.log(this.user);
          console.log("lat: " + place.geometry.location.lat());
          console.log("lng: " + place.geometry.location.lng());
          $scope.map.center = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };
          $scope.marker.coords = {
            latitude: place.geometry.location.lat(),
            longitude:place.geometry.location.lng()
          };
        }
      }
    };
  }

  editprofile(form) {
    this.submitted = true;
    const gotcha = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    this.user.interests= gotcha;

    const gotcha2 = this.$scope.mytypes
      .filter((mytype) => mytype.ischecked)
      .map((mytype) => mytype.name);
    this.user.mytype= gotcha2;

    const gotcha3 = this.$scope.yourtypes
      .filter((yourtype) => yourtype.ischecked)
      .map((yourtype) => yourtype.name);
    this.user.yourtype= gotcha3;

    if (form.$valid) {
      const user = this.Auth.getCurrentUser();

      this.Upload.upload({
        url: '/api/users/'+ user._id,
        method: 'PUT',
        data: {
          url: this.user.url, 
          profileImage: this.user.profileImage,
          gender: this.user.gender, 
          interests: this.user.interests, 
          place: this.user.place, 
          mytype: this.user.mytype,
          yourtype: this.user.yourtype, 
          description: this.user.description 
        }
      })
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
.controller('ProfileController', ProfileController);

