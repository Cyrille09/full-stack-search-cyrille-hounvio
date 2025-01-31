import { Request, Response } from "express";
import { handle400Error, handle500Error } from "../exceptions/errorHandler";
import hotelsServices from "../services/hotelsServices";
import { ERROR_MESSAGES } from "../constants/defaultValues";

export default {
  async gets(req: any, res: Response): Promise<void> {
    try {
      const hotels = await hotelsServices.gets(req.query);
      res.status(200).json(hotels);
    } catch (error: unknown) {
      if (req.logger?.error) req.logger.error("Hotels record fail:", error);
      handle500Error(res, error);
    }
  },

  async get(req: any, res: Response): Promise<void> {
    try {
      const user = await hotelsServices.get(req.params.id);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (req.logger?.error)
        req.logger.error(`${ERROR_MESSAGES.HOTEL_NOT_FOUND}`, error);
      handle400Error(res, error);
    }
  },
};
