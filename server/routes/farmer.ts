import express from 'express';
import Controller from '../controllers/farmer';

const router = express.Router();

router.post('/', Controller.createFarmer);
router.get('/', Controller.getFarmers);
router.get('/:id',  Controller.getFarmer);
router.put('/:id',  Controller.updateFarmer);
router.delete('/:id', Controller.deleteFarmer);
router.post('/pivot', Controller.populateCertificationPivot);

export default router;
 