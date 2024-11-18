import express from 'express';
import Controller from '../controllers/crops';

const router = express.Router();

router.post('/', Controller.createCrop);
router.get('/', Controller.getCrops);
router.put('/:id',  Controller.updateCrop);
router.delete('/:id', Controller.deleteCrop);


export default router;
 