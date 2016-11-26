'use strict';

import Local from './local.model';

export function state(req, res, next) {
  const query = req.query.q;
  Local.aggregate([
    {$match : { local :{$regex: query}  }},
    {$project: {state:1, _id: 0}}
    ]
  )
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs); 
    })
}

