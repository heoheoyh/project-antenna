'use strict';

import Project from './project.model';

export function index(req, res, next) {
  Project.find({})
    .populate('_creator')
    .then((docs) => {
      res.status(200).json(docs); 
    })
  .catch(next);
}

export function create(req, res, next) {
  const project = req.body;
  project._creator = req.user._id;

  Project.create(project)
    .then((doc) => {
      res.status(201).json(doc); 
    })
  .catch(next);
}
export function mine(req, res, next) {
  Project.find({ _creator: req.user._id })
    .then((docs) => {
      res.status(200).json(docs); 
    })
  .catch(next);
}
export function update(req, res, next) {
  Project.findById(req.params.mypjId)
     .then((project) => project.set(req.body).save())
     .then(() => res.status(201).json())
   .catch(next);
}

export function del(req, res, next){
  Project.findById(req.params.mypjId)
    .then((project) => project.set(req.body).remove())
    .then(() => res.status(201).json())
    .catch(next);

}


export function show(req, res, next) {
  Project.findById(req.params.pid)
    .populate('_creator')
    .then((doc) => {
      console.log('------------------show');
      res.status(200).json(doc); 
    });
}

