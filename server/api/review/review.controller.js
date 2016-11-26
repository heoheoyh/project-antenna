'use strict';

import Review from './review.model';

export function index(req, res, next) {
  Review.find({})
    .populate('_creator')
    .then((docs) => {
      res.status(200).json(docs); 
    })
    .catch(next);
}

export function create(req, res, next) {
  const review = req.body;
  review._creator = req.user._id;

  Review.create(review)
    .then((doc) => {
      res.status(201).json(doc); 
    })
    .catch(next);
}
export function mine(req, res, next) {
  Review.find({ _creator: req.user._id })
    .then((docs) => {
      res.status(200).json(docs); 
    })
    .catch(next);
}
export function update(req, res, next) {
  Review.findById(req.params.myrvId)
    .then((review) => review.set(req.body).save())
    .then(() => res.status(201).json())
    .catch(next);
}

export function del(req, res, next){
  Review.findById(req.params.myrvId)
    .then((review) => review.set(req.body).remove())
    .then(() => res.status(201).json())
    .catch(next);

}

export function getTags(req, res, next) {
  const query = req.query.q;
  //Review.aggregate([{$match: { $text: { $search: query } }},
  Review.aggregate([
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
  Review.findById(req.params.pid)
    .populate('_creator')
    .then((doc) => {
      console.log('------------------show');
      res.status(200).json(doc); 
    });
}

