import express from 'express';
import Controller from '../controllers/systems';

const router = express.Router();

router.post('/', Controller.createSystem);
router.get('/', Controller.getSystems);
router.put('/:id',  Controller.updateSystem);
router.delete('/:id', Controller.deleteSystem);

export default router;
 