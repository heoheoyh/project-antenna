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
   //this.getCurrentUser = Auth.getCurrentUser;

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
      this.User.update({ id: user._id }, { url: this.user.url }).$promise
        .then(() => {
          this.$state.go('profile');
          // Account created, redirect to home
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

