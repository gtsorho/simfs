import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Joi from 'joi';
import db from '../models'; 


const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(15).required(),
});

class UsersController {
  public static async createUser(req: Request, res: Response) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { username, phone } = req.body;

      const newUser = await db.user.create({ username, phone });
      return res.status(201).json(newUser);
    } catch (err:any) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getUsers(req: Request, res: Response) {
    try {
      const { username, phone } = req.query;

      const whereClause: any = {};
      if (username) {
        whereClause.username = { [Op.like]: `%${username}%` };
      }
      if (phone) {
        whereClause.phone = { [Op.like]: `%${phone}%` };
      }

      const users = await db.user.findAll({ where: whereClause });
      return res.status(200).json(users);
    } catch (err:any) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await db.user.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (err:any) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { username, phone } = req.body;

      const user = await db.user.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update({ username, phone });
      return res.status(200).json(user);
    } catch (err:any) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await db.user.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (err:any) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
}

export default UsersController;
