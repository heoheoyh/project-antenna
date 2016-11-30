'use strict';

class ProfileController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $scope, $log, User, Upload, user,$http) {
    this.User = User;
    this.Auth = Auth;
    this.$state = $state;
    this.$log = $log;
    this.$scope = $scope;
    this.Upload = Upload;
    this.user = user;
    this.$http = $http;

    this.user={
      name: user.name, 
      email: user.email,
      url: user.url,
      profileUrl: user.profileImage,
      gender: user.gender,
      myField: user.myField,
      local: user.local,
      state: user.state,
      mytype: user.mytype,
      partnerField: user.partnerField,
      description: user.description
    };

    $scope.items = [
      'programmer', 
      'designer', 
      'business', 
      'planner',
      'image',
      'photo',
      'marketing',
      'broadcasting',
      'fashion',
      'economic',
      'volunteer',
      'thesis',
      'education ',
      'welfare',
      'story',
      'idea',
      'sports',
      'finance',
      'advertising'
    ].map((v) => ({ name: v }));

    const genOverflowChecker = (limit) => {
      return (items) => {
        const itemNum = items.filter((item) => item.ischecked).length;
        return itemNum === limit;
      }; 
    };

    $scope.areItemsOverflowed = genOverflowChecker(3);

    $scope.mytypes = [
      '~1month',
      '1~2month', 
      '2~3month', 
      '3~4month', 
      '4~5month',
      '5~6month',
      '6~month'
    ];

    $scope.partnerField = [
      'programmer', 
      'designer', 
      'business', 
      'planner',
      'image',
      'photo',
      'marketing',
      'broadcasting',
      'fashion',
      'economic',
      'volunteer',
      'thesis',
      'education ',
      'welfare',
      'story',
      'idea',
      'sports',
      'finance',
      'advertising'

    ].map((v) => ({ name: v }));

    $scope.items =  $scope.items.map((item) => {
      item.ischecked = this.user.myField.indexOf(item.name) >= 0;
      return item;
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

    $scope.locals = [
      '서울특별시',
      '경기도',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '강원도',
      '충청북도',
      '충청남도',
      '전라북도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도'  
    ];


    $scope.changedValue= (item) => {
      const q = item;
      $http.get('/api/locals/state', {
        params: { q: item}
      }).success(function(data)
        {
          $scope.states = data;
        });
    }  

  }

  editprofile(form) {
    this.submitted = true;
    const myField = this.$scope.items
      .filter((item) => item.ischecked)
      .map((item) => item.name);
    this.user.myField= myField;


    const partnerField = this.$scope.partnerField
      .filter((partnerField) => partnerField.ischecked)
      .map((partnerField) => partnerField.name);
    this.user.partnerField= partnerField;


    if (form.$valid) {
      this.Upload.upload({
        url: '/api/users/'+ this.user._id,
        method: 'PUT',
        data: {
          url: this.user.url, 
          profileImage: this.user.profileImage,
          gender: this.user.gender, 
          myField: this.user.myField, 
          local: this.user.local, 
          state: this.user.state,
          mytype: this.user.mytype,
          partnerField: this.user.partnerField, 
          description: this.user.description 
        }
      })
        .then(() => {
          alert('프로필이 등록되었습니다'); 
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

