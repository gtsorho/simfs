import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const systemSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
});

export default {
    createSystem: async (req: Request, res: Response) => {
        try {
            const { error } = systemSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const system = await db.system.create(req.body);
            res.status(201).json(system);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getSystems: async (req: Request, res: Response) => {
        try {
            const systems = await db.system.findAll({});

            res.json(systems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateSystem: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.system.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'system not found' });
            }
            const updatedSystem = await db.institution.findByPk(id);
            res.json(updatedSystem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteSystem: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.system.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'system not found' });
            }
            res.json({ message: 'system deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}