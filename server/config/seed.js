/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Project from '../api/project/project.model';

import Review from '../api/review/review.model';

Project.remove({})
  .then(() => {
    console.log('finished removing projects');
  });

Review.remove({})
  .then(() => {
    console.log('finished removing reviews');}
  );

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    })
    .then(() => {
      console.log('finished populating things');
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }, {
      provider: 'local',
      name: 'yunhee',
      email: 'yunhee9485@gmail.com',
      password:'1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'female',
      myField:['designer'],
      local: '서울특별시',
      state: '용산구',
      mytype: '1~2month',
      partnerField:['programmer'],
      description: '안녕하세요 함께 프로젝트 할 개발자 구합니다'
    }, {
      provider: 'local',
      name:'jin',
      email: 'heoheoyh@gmail.com',
      password:'1234',
      url: 'https://project-antenna.herokuapp.com/',
      gender: 'male',
      myField:['programmer'],
      local: '서울특별시',
      state: '용산구',
      mytype: '1~2month',
      partnerField:['programmer','designer'],
      description:'디자이너와 개발자 구합니다!'
    }, {
      provider: 'local',
      name: 'young',
      email: 'abcedf@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'female',
      myField:['programmer', 'planner'],
      local: '서울특별시',
      state: '용산구',
      mytype: '1~2month',
      partnerField:['designer'],
      description: '안녕하세요 함께 프로젝트 할 디자이너 구합니다'
    },{
provider: 'local',
      name: 'yun',
      email: 'abcd@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'female',
      myField:['designer', 'planner'],
      local: '서울특별시',
      state: '광진구',
      mytype: '2~3month',
      partnerField:['programmer'],
      description: '안녕하세요 함께 프로젝트 할 팀원 구합니다'
    },{
    provider: 'local',
      name: 'jun',
      email: 'abcedf@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'male',
      myField:['programmer', 'planner'],
      local: '서울특별시',
      state: '광진구',
      mytype: '2~3month',
      partnerField:['designer'],
      description: '안녕하세요 함께 프로젝트 할 디자이너 구합니다'
    },{
     provider: 'local',
      name: 'kelly',
      email: 'abc@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'female',
      myField:['programmer', 'business'],
      local: '서울특별시',
      state: '광진구',
      mytype: '2~3month',
      partnerField:['designer'],
      description: '안녕하세요 함께 프로젝트 할 디자이너 구합니다'
    },{
      provider: 'local',
      name: 'park',
      email: 'aaa@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'male',
      myField:['disginer', 'business'],
      local: '서울특별시',
      state: '용산구',
      mytype: '1~2month',
      partnerField:['programmer','planner'],
      description: '안녕하세요 함께 프로젝트 할 프로그래머 구합니다'
    },{
     provider: 'local',
      name: 'Kim',
      email: 'bbb@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'male',
      myField:['disginer', 'planner'],
      local: '서울특별시',
      state: '용산구',
      mytype: '1~2month',
      partnerField:['programmer'],
      description: '안녕하세요 함께 프로젝트 할 프로그래머 구합니다'
    },{
     provider: 'local',
      name: 'LeeMin',
      email: 'ccc@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'female',
      myField:['programmer', 'planner'],
      local: '서울특별시',
      state: '광진구',
      mytype: '1~2month',
      partnerField:['designer'],
      description: '안녕하세요 함께 프로젝트 할 디자이너 구합니다'
    },{
      provider: 'local',
      name: 'Heo',
      email: 'ddd@gmail.com',
      password: '1234',
      url: 'https://project-antenna.herokuapp.com/profile',
      gender: 'male',
      myField:['programmer', 'designer'],
      local: '서울특별시',
      state: '광진구',
      mytype: '1~2month',
      partnerField:['programmer'],
      description: '안녕하세요 함께 프로젝트 할 프로그래머 구합니다'
    }
    
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
