'use strict';

import {Router} from 'express';
import * as controller from './partner.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//router.get('/', controller.index);

router.get('/', auth.isAuthenticated(),  controller.all);




export default router;

