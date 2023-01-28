import { genSaltSync, hashSync } from "bcrypt";
import { Router } from "express";
import { StatusCode } from "status-code-enum";
import userModel from "../schemas/users.schema";
import { validateRegisterUser } from "../validators/user.validator";

export const RegisterRouter = () => {
  const router = Router();

  router.post("/api/users", async (req, res) => {
    try {
      const result = validateRegisterUser(req.body);

      if (result.error) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .send(result.error.message);
      }

      const user = { ...req.body };
      const existingUser = await userModel.findOne({ email: user.email });
      if (existingUser) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .send(`user with email ${user.email} already exists`);
      }

      const saltRounds = 10;
      const salt = genSaltSync(saltRounds);
      user.password = hashSync(user.password, salt);

      await new userModel(user).save();
      res.json({ email: user.email, name: user.name, isBusiness: user.isBusiness });
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  return router;
};
