import env from "env-var";
import dotenv from "dotenv";

dotenv.config();

type BotConfigType = {
  token: string;
};

export const BotConfig: BotConfigType = {
  token: env.get("BOT_TOKEN").required().asString(),
};