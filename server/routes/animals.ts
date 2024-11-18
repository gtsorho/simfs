import express from 'express';
import Controller from '../controllers/animals';

const router = express.Router();

router.post('/', Controller.createAnimal);
router.get('/', Controller.getAnimals);
router.put('/:id',  Controller.updateAnimal);
router.delete('/:id', Controller.deleteAnimal);


export default router;
 