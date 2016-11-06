'use strict';

class ProfileController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $scope, $log, User, Upload, user) {
    this.User = User;
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.Upload = Upload;
    this.user = user;

    this.user={
      name: user.name, 
      email: user.email,
      url: user.url,
      profileUrl: user.profileImage,
      gender: user.gender,
      myField: user.myField,
      place: user.place,
      mytype: user.mytype,
      partnerField: user.partnerField,
      description: user.description
    };

    $scope.items = [
      'developer', 
      'designer', 
      'business', 
      'manager'
    ].map((v) => ({ name: v }));

    const genOverflowChecker = (limit) => {
      return (items) => {
        const itemNum = items.filter((item) => item.ischecked).length;
        return itemNum === limit;
      }; 
    };

    $scope.areItemsOverflowed = genOverflowChecker(3);

    $scope.mytypes = [
      'good', 
      'bad', 
      'sad', 
      'joy'
    ].map((v) => ({ name: v }));

    $scope.partnerField = [
      'developer', 
      'designer', 
      'business', 
      'manager'
    ].map((v) => ({ name: v }));

    $scope.items =  $scope.items.map((item) => {
      item.ischecked = this.user.myField.indexOf(item.name) >= 0;
      return item;
    });

    $scope.mytypes =  $scope.mytypes.map((mytype) => {
      mytype.ischecked = this.user.mytype.indexOf(mytype.name) >= 0;
      return mytype;
    });

    $scope.partnerField =  $scope.partnerField.map((partnerField) => {
      partnerField.ischecked = this.user.partnerField.indexOf(partnerField.name) >= 0;
      return partnerField;
    });

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
    this.user.myField= gotcha;

    const gotcha2 = this.$scope.mytypes
      .filter((mytype) => mytype.ischecked)
      .map((mytype) => mytype.name);
    this.user.mytype= gotcha2;

    const gotcha3 = this.$scope.partnerField
      .filter((partnerField) => partnerField.ischecked)
      .map((partnerField) => partnerField.name);
    this.user.partnerField= gotcha3;

    if (form.$valid) {
      this.Upload.upload({
        url: '/api/users/'+ this.user._id,
        method: 'PUT',
        data: {
          url: this.user.url, 
          profileImage: this.user.profileImage,
          gender: this.user.gender, 
          myField: this.user.myField, 
          place: this.user.place, 
          mytype: this.user.mytype,
          partnerField: this.user.partnerField, 
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

