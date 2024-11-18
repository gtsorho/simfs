import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const animalSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    threshold: Joi.number().required(),
});

export default {
    createAnimal: async (req: Request, res: Response) => {
        try {
            const { error } = animalSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const animal = await db.animal.create(req.body);
            res.status(201).json(animal);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAnimals: async (req: Request, res: Response) => {
        try {
            const animals = await db.animal.findAll({});
            res.json(animals);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateAnimal: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.animal.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            const updatedAnimal = await db.institution.findByPk(id);
            res.json(updatedAnimal);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteAnimal: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.animal.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'animal not found' });
            }
            res.json({ message: 'animal deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}