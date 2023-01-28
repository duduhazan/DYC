import { Router } from "express";
import { StatusCode } from "status-code-enum";
import * as jsonWebtoken from "jsonwebtoken";
import { validateLoginUser } from "../validators/user.validator";
import userModel from "../schemas/users.schema";
import { compareSync } from "bcrypt";

const secret = "Asdfkajdf023i";

export const loginRouter = () => {
  const router = Router();

  router.post("/auth", async (req, res) => {
    try {
      const result = validateLoginUser(req.body);

      if (result.error) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .send(result.error.message);
      }

      const user = await userModel.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res
          .status(StatusCode.ClientErrorNotFound)
          .send("user not found in database");
      }

      if (!compareSync(req.body.password, user.password)) {
        return res
          .status(StatusCode.ClientErrorUnauthorized)
          .send("incorrect password!");
      }

      const token = jsonWebtoken.default.sign(
        { email: user.email, name: user.name, id: user.id },
        secret
      );
      res
        .cookie("token", token, {
          secure: true,
          sameSite: "none",
          httpOnly: true,
        })
        .json(user);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  return router;
};
