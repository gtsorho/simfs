import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const activitiesSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    SystemId: Joi.number().required(),
});

export default {
    createActivity: async (req: Request, res: Response) => {
        try {
            const { error } = activitiesSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const activity = await db.activity.create(req.body);
            res.status(201).json(activity);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getActivities: async (req: Request, res: Response) => {
        try {
            const activities = await db.activity.findAll({});
            res.json(activities);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getActivitiesPerSystem: async (req: Request, res: Response) => {
        try {
            const activities = await db.activity.findAll({where:{FarmSystemId:req.params.id}});
            res.json(activities);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateActivity: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.activity.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            const updatedActivity = await db.institution.findByPk(id);
            res.json(updatedActivity);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteActivity: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.activity.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'activity not found' });
            }
            res.json({ message: 'activity deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}