import { connectDB } from "./connect-to-db";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loginRouter } from "./routes/login.route";
import { RegisterRouter } from "./routes/register.route";
import { cardsRouter } from "./routes/cards.route";
import { UserRouter } from "./routes/user.route";
import { authMiddleWare } from "./middlewares/auth.middleware";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  await connectDB(process.env.DB_URL);

  const port = process.env.PORT;
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use("/images", express.static(join(__dirname, "images")));

  app.use(loginRouter());

  app.use(RegisterRouter());

  app.use(authMiddleWare);

  app.use(UserRouter());

  app.use(cardsRouter());

  app.listen(3500, () => {
    console.log(`started server on port ${port}`);
  });
}

startServer();
