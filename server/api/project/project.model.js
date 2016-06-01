'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';

var ProjectSchema = new Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'User' },
  title    : String,
  field    : [],
  link     : String,
  content  : String,
  date     : { type: Date,  default: Date.now   }
});

export default mongoose.model('Project', ProjectSchema);
