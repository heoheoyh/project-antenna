'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';

var PartnerSchema = new Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Partner', PartnerSchema);
