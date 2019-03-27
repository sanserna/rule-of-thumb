import { Router } from 'express';

import { updateMe, getUserData } from './user.controllers';
import { protect } from '../../utils/auth';

const router = Router();

router.put('/', protect, updateMe);
router.get('/:id', getUserData);

export default router;
