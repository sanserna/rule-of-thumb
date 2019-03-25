import { Router } from 'express';
import controllers from './vote-item.controllers';

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
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
