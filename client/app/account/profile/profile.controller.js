'use strict';

class ProfileController {
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
    $scope.items = [
      'one', 
      'two', 
      'three', 
      'four'
    ];

    this.user={
      name: Auth.getCurrentUser().name, 
      email: Auth.getCurrentUser().email,
      url: Auth.getCurrentUser().url,
      gender: Auth.getCurrentUser().gender,
      interests: Auth.getCurrentUser().interests,
      place: Auth.getCurrentUser().place,
      mytype: Auth.getCurrentUser().mytype,
      yourtype: Auth.getCurrentUser().yourtype,
      description: Auth.getCurrentUser().description
    };

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
.controller('ProfileController', ProfileController);

