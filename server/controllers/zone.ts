import { Request, Response } from 'express';
import db from '../models/index'
const { QueryTypes } = require('sequelize');

export default {
    getCountries: async (req: Request, res: Response) => {
        try {
            const countries = await db.country.findAll({});
            res.json(countries);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getRegionsWC: async (req: Request, res: Response) => {
        try {
            const regions = await db.region.findAll({where:{ CountryId : req.params.id}});
            res.json(regions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getRegions: async (req: Request, res: Response) => {
        try {
            const regions = await db.region.findAll({});
            res.json(regions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getDistrictsWR: async (req: Request, res: Response) => {
        try {
            const districts = await db.district.findAll({
                where:{ RegionId : req.params.id},
                include:[{
                    model:db.zone
                }]
            });
            res.json(districts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getDistrict: async (req: Request, res: Response) => {
        try {
            const district = await db.district.findOne({
                where:{ RegionId : req.params.id},
                include:[{
                    model:db.zone
                }]
            });
            res.json(district);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getZoneSystems: async (req: Request, res: Response)=>{
        try {
            const systems = await db.system.findAll({
                include: [
                  {
                    model: db.farmer,
                    required: true,
                    attributes: [],
                    include: [
                      {
                        model: db.zone,
                        where: { id: req.params.id },
                        attributes: [] 
                      }
                    ],
                    through: {
                        model: db.farmer_pivot,
                        attributes: []
                    } 
                  }
                ]
              })
              res.json(systems);
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}