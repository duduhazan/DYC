import { Router } from "express";
import userModel from "../schemas/users.schema";
import { StatusCode } from "status-code-enum";

export const UserRouter = () => {
  const router = Router();

  router.get("/user", async (req, res) => {
    const user = await userModel.findById(req.user.id);
    res.json(user);
  });

  router.post("/user-cards/:id/like", async (req, res) => {
    const userId = req.user.id;
    const cardId = req.params.id;
    try {
      const user = await userModel.findById(userId);

      const index = user.cardLikes.indexOf(cardId);

      if (index !== -1) {
        user.cardLikes.splice(index, 1);
      } else {
        user.cardLikes.push(cardId);
      }
      await userModel.findByIdAndUpdate(userId, user);

      res.status(StatusCode.SuccessCreated).json(user);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  return router;
};
