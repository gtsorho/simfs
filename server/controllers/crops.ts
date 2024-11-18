import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const cropSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    threshold: Joi.number().required(),
});

export default {
    createCrop: async (req: Request, res: Response) => {
        try {
            const { error } = cropSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            console.log(req.body)
            const crop = await db.crop.create(req.body);
            res.status(201).json(crop);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getCrops: async (req: Request, res: Response) => {
        try {
            const crops = await db.crop.findAll({});
            res.json(crops);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateCrop: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.crop.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'crop not found' });
            }
            const updatedCrop = await db.institution.findByPk(id);
            res.json(updatedCrop);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteCrop: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.crop.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'crop not found' });
            }
            res.json({ message: 'crop deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}