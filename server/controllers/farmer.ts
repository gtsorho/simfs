import { Request, Response } from 'express';
import db from '../models/index'
import Joi from 'joi';
const { QueryTypes } = require('sequelize');

const farmerSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    household_size: Joi.string().required(),
    no_trees: Joi.string().required(),
    no_economic_trees: Joi.string().required(),

});

const farmerPivotSchema = Joi.object({
    AnimalId: Joi.number().required(),
    CropId: Joi.number().required(),
    TypologyId: Joi.number().required(),
    FarmerId: Joi.number().required(),
    FarmSystemId: Joi.number().required(),
    no_crops: Joi.number().required(),
    no_animals: Joi.number().required(),
});

export default {
    createFarmer: async (req: Request, res: Response) => {
        try {
            const { error } = farmerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const farmer = await db.farmer.create(req.body);
            res.status(201).json(farmer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getFarmer: async (req: Request, res: Response) => {
        try {
            const farmer = await db.farmer.findOne({
                where:{
                    id:req.params.id
                },
                include: [
                    {
                        model:db.region,
                        include:[
                            {
                            model:db.country
                            }
                        ]
                    },
                    {   
                        model:db.farmer_pivot,
                        include:[
                            {
                              model: db.crop
                            },
                            {
                              model: db.animal
                            },
                            {
                              model: db.typology
                            },
                            {
                              model: db.system
                            },
                        ]
                    }
                ],
              });
            res.json(farmer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getFarmers: async (req: Request, res: Response) => {
        try {
            const farmers = await db.farmer.findAll({
                include: [
                    {
                        model:db.farmer_pivot,
                        include:[
                            {
                              model: db.crop
                            },
                            {
                              model: db.animal
                            },
                            {
                              model: db.typology
                            },
                            {
                              model: db.system
                            },
                        ]
                    }
                ],
              });
            res.json(farmers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateFarmer: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const [updated] = await db.farmer.update(req.body, { where: { id } });
            if (!updated) {
                return res.status(404).json({ message: 'farmer not found' });
            }
            const updatedFarmer = await db.institution.findByPk(id);
            res.json(updatedFarmer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteFarmer: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleted = await db.farmer.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: 'farmer not found' });
            }
            res.json({ message: 'farmer deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    populateCertificationPivot: async (req: Request, res: Response) => {
        const { AnimalId, CropId, TypologyId, FarmerId, FarmSystemId, no_animals, no_crops } = req.body;
    
        try {
            const { error } = farmerPivotSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            if (!FarmerId || !FarmSystemId) {
                return res.status(400).json({ message: 'farmer and system are required in the query' });
            }
    
            const farmer = await db.farmer.findByPk(FarmerId);
            if (!farmer) {
                return res.status(404).json({ message: 'farmer not found' });
            }
    
            const system = await db.system.findByPk(FarmSystemId);
            if (!system) {
                return res.status(404).json({ message: 'system not found' });
            }
    
            const existingEntry = await db.farmer_pivot.findOne({
                where: { FarmerId, FarmSystemId }
            });
    
            if (existingEntry) {
                return res.status(409).json({ message: 'Duplicate entry. system already exists for this farmer.' });
            }
    
            const farmer_pivot = await db.farmer_pivot.create({
                FarmerId,
                FarmSystemId,
                AnimalId,
                CropId,
                TypologyId,
                no_animals,
                no_crops
            });
    
            // const count = await db.farmer_pivot.count({
            //     where: { FarmerId }
            // });
    
            // await db.farmer.update({ count: count }, { where: { id: FarmerId } });
    
            res.status(201).json(farmer_pivot);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}