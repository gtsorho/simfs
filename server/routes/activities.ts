import express from 'express';
import Controller from '../controllers/activites';

const router = express.Router();

router.post('/', Controller.createActivity);
router.get('/', Controller.getActivities);
router.get('/:id', Controller.getActivitiesPerSystem);
router.put('/:id',  Controller.updateActivity);
router.delete('/:id', Controller.deleteActivity);


export default router;
 