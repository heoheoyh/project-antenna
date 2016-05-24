'use strict';

import {Router} from 'express';
import * as controller from './project.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);

router.get('/mine', auth.isAuthenticated(), controller.mine);
router.put('/:mypjId', auth.isAuthenticated(), controller.update);
router.delete('/:mypjId', auth.isAuthenticated(), controller.del);
router.get('/:pid', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);

export default router;

