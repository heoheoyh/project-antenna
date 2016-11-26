'use strict';

import {Router} from 'express';
import * as controller from './local.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//router.get('/', controller.index);

router.get('/state', auth.isAuthenticated(), controller.state);

export default router;

