import express from 'express';
import Controller from '../controllers/zone';

const router = express.Router();

router.get('/countries', Controller.getCountries);
router.get('/regions', Controller.getRegions);
router.get('/regions/:id', Controller.getRegionsWC);
router.get('/districts/:id', Controller.getDistrictsWR);
router.get('/district/:id', Controller.getDistrict);
router.get('/zone_sys/:id', Controller.getZoneSystems)

export default router;