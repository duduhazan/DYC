import { Router } from "express";
import { StatusCode } from "status-code-enum";
import cardModel from "../schemas/cards.schema";

export const SampleCards = () => {
  const router = Router();

  router.get("/sampleCards", async (req, res) => {
    const cards = await cardModel.find();
    
    if (!cards?.length) {
        return res
        .status(StatusCode.ClientErrorNotFound)
        .send("There are no cards in the data server");
    }
    
    const slicedCards = cards.slice(0, 6);
    res.json(slicedCards);
  });

  return router;
};
