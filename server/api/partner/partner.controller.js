'use strict';

import Partner from './partner.model';

//export function index(req, res, next) {
//  Partner.find({})
//    .populate('_creator')
//    .then((docs) => {
//      res.status(200).json(docs); 
//    })
//  .catch(next);
//}
//
export function all(req, res, next) {
  let myfield = req.user.myField;
  let partnerfield = req.user.partnerField;
  console.log(myfield);
  console.log(partnerfield);

  Partner.find({ 
    myField:{$in: partnerfield},
    partnerField: {$in: myfield}
  })
  .then(docs => {
    res.status(200).json(docs);
  })
  .catch(next);
}


