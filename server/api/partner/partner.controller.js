'use strict';

import Partner from './partner.model';

export function index(req, res, next) {
  Parnter.find({})
    .populate('_creator')
    .then((docs) => {
      res.status(200).json(docs); 
    })
  .catch(next);
}

