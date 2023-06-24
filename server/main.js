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
import { AliveRouter } from "./routes/alive.route";
import { ImageStorageService } from "./image-storage.service";
import { writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  await connectDB(process.env.DB_URL);

  const port = process.env.PORT;
  const secret = process.env.AUTH_SECRET;
  const keyJson = process.env.KEY_JSON;
  if (keyJson) {
    await writeFile("./key.json", process.env.KEY_JSON);
  }
  const imageStorageService = new ImageStorageService("./key.json", "dyc");
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use(AliveRouter());

  app.use("/images", express.static(join(__dirname, "images")));

  app.use(loginRouter(secret));

  app.use(RegisterRouter());

  app.use(authMiddleWare(secret));

  app.use(UserRouter());

  app.use(cardsRouter(imageStorageService));

  app.listen(port, () => {
    console.log(`started server on port ${port}`);
  });
}

startServer();
