import { Router } from "express";
import cardModel from "../schemas/cards.schema";

export const AliveRouter = () => {
  const router = Router();

  router.get("/is_alive", async (req, res) => {
    const baseResponse = { alive: true, appName: "dyc-server" };
    try {
      await cardModel.findOne();
      res.json({ ...baseResponse, dbConnected: true });
    } catch {
      res.json({ ...baseResponse, dbConnected: false });
    }
  });

  return router;
};
