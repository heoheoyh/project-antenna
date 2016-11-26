'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';

var LocalSchema = new Schema({
  state    : String,
  local    : String
});

export default mongoose.model('Local', LocalSchema);
