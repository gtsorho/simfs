import express from 'express';
import Controller from '../controllers/typology';

const router = express.Router();

router.post('/', Controller.createTypology);
router.get('/', Controller.getTypology);
router.put('/:id',  Controller.updateTypology);
router.delete('/:id', Controller.deleteTypology);

export default router;
 