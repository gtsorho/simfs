import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const nuggetSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().required(),
    msg: Joi.string().required(),
    ActivityId: Joi.number().required(),
});

export default {
    createNugget: async (req: Request, res: Response) => {
        try {
            const { error } = nuggetSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const nugget = await db.nugget.create(req.body);
            res.status(201).json(nugget);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getNuggets: async (req: Request, res: Response) => {
        try {
            const nuggets = await db.nugget.findAll({});
            res.json(nuggets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getNuggetsPerActivity: async (req: Request, res: Response) => {
        try {
            const nuggets = await db.nugget.findAll({where:{ActivityId:req.params.id}});
            res.json(nuggets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateNugget: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.nugget.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            const updatedNugget = await db.institution.findByPk(id);
            res.json(updatedNugget);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteNugget: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.nugget.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'nugget not found' });
            }
            res.json({ message: 'nugget deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}