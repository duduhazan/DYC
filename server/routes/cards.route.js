import { Router } from "express";
import { StatusCode } from "status-code-enum";
import validateCard from "../validators/card.validator";
import cardModel from "../schemas/cards.schema";
import userModel from "../schemas/users.schema";
import multer from "multer";

var storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    cb(null, `${req.body.name}_${req.body.imageName}`);
  },
});

export const cardsRouter = (imageStorageService) => {
  const router = Router();
  const upload = multer({ storage });

  router.get("/cards", async (req, res) => {
    try {
      const cardIds = req.query.ids;
      const userId = req.query.userId;
      let cards = [];
      if (userId) {
        cards = await cardModel.find({ userId });
      } else if (cardIds?.length) {
        cards = await cardModel.find({ _id: { $in: cardIds } });
      } else {
        cards = await cardModel.find();
      }

      if (cardIds?.length && !cards?.length) {
        return res
          .status(StatusCode.ClientErrorNotFound)
          .send("card not found in database");
      }

      const cardsImages = {};
      await Promise.all(
        cards.map(async (c) => {
          const imageUrl = await imageStorageService.getUrl(c.imageUrl);
          cardsImages[c._id] = imageUrl;
        })
      );
      for (const card of cards) {
        card.imageUrl = cardsImages[card._id];
      }

      res.json(cards);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  router.get("/cards/:id", async (req, res) => {
    try {
      const card = await cardModel.findOne({
        _id: req.params.id,
      });

      if (!card) {
        return res
          .status(StatusCode.ClientErrorNotFound)
          .send("card wasn't found in database");
      }

      const imageUrl = await imageStorageService.getUrl(card.imageUrl);
      card.imageUrl = imageUrl;

      res.json(card);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  router.post("/cards", upload.single("image"), async (req, res) => {
    try {
      const result = validateCard(req.body);

      if (result.error) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .send(result.error.message);
      }

      const localImagePath = `images/${req.body.name}_${req.body.imageName}`;
      const imageName = await imageStorageService.upload(localImagePath);

      const newCard = {
        ...req.body,
        imageUrl: imageName,
        userId: req.user.id,
      };
      const card = await new cardModel(newCard).save();

      res.status(StatusCode.SuccessCreated).json(card);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  router.put("/cards/:id", upload.single("image"), async (req, res) => {
    try {
      const result = validateCard(req.body);

      if (result.error) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .send(result.error.message);
      }
      const card = await cardModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
        imageUrl: `images/${req.body.name}_${req.body.imageName}`,
      });

      res.json(card);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  router.delete("/cards/:id", async (req, res) => {
    try {
      const cardId = req.params.id;
      const card = await cardModel.findByIdAndDelete(cardId);
      if (!card) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .json("card not exist!");
      }
      await imageStorageService.delete(card.imageUrl);
      const users = await userModel.find({ cardLikes: cardId });
      const userIds = users.map((u) => u._id);
      await userModel.updateMany(
        { _id: { $in: userIds } },
        { $pull: { cardLikes: cardId } }
      );

      res.status(StatusCode.SuccessNoContent).send();
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  return router;
};
