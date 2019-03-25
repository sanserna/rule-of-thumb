import { Router } from 'express';

import controllers from './vote-item.controllers';
import { protect } from '../../utils/auth';

const router = Router();

// /api/vote-item
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

// /api/vote-item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(protect, controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
