import express from 'express';
import Controller from '../controllers/nuggets';

const router = express.Router();

router.post('/', Controller.createNugget);
router.get('/', Controller.getNuggets);
router.get('/:id', Controller.getNuggetsPerActivity);
router.put('/:id',  Controller.updateNugget);
router.delete('/:id', Controller.deleteNugget);


export default router;
 