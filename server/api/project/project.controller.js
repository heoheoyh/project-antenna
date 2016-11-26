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

export function getMytags(req, res, next) {
   Project.find({ _creator: req.user._id})
  .distinct( "tags" )
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs); 
    })
}

export function getProjects(req, res, next) {
  const query = req.query.q;
  console.log(query);
   Project.find({ tags: { $in: query }})
    .populate('_creator')
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs); 
    })
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

export function getTags(req, res, next) {
  const query = req.query.q;
  //Review.aggregate([{$match: { $text: { $search: query } }},
  Project.aggregate([
    {$project: {text: '$tags', _id: 0}},
    { $unwind : "$text"  },
    { $match : { text :{$regex: query}  }},
    { $group : { _id : '$text'} }
  ]
  )
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
}


export function show(req, res, next) {
  Project.findById(req.params.pid)
    .populate('_creator')
    .then((doc) => {
      console.log('------------------show');
      res.status(200).json(doc); 
    });
}

