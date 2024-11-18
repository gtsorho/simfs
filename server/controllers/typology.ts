import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const typologySchema = Joi.object({
    id: Joi.string().optional(),
    category: Joi.string().required(),
    household_size: Joi.number().required(),
    livestock_diversity: Joi.number().required(),
    crop_yield: Joi.number().required(),
    parcel_of_land: Joi.number().required(),
    land_size: Joi.number().required(),
    livestock_holding: Joi.number().required(),
    no_trees: Joi.number().required(),
    no_economic_trees: Joi.number().required()
});

export default {
    createTypology: async (req: Request, res: Response) => {
        try {
            const { error } = typologySchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const typology = await db.typology.create(req.body);
            res.status(201).json(typology);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getTypology: async (req: Request, res: Response) => {
        try {
            const typology = await db.typology.findAll({});

            res.json(typology);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateTypology: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.typology.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'typology not found' });
            }
            const updatedTypology = await db.institution.findByPk(id);
            res.json(updatedTypology);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteTypology: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.typology.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'typology not found' });
            }
            res.json({ message: 'typology deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}