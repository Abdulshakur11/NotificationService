import env from 'env-var';
import dotenv from "dotenv";

dotenv.config();

type ServerConfigType = {
  port: number;
};

export const ServerConfig: ServerConfigType = {
  port: env.get('PORT').required().asInt()
}