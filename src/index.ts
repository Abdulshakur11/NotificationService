import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { ServerConfig } from "./config/server";
import { connect } from "./consumer";
import { NoteTelegramBotApi } from "./modules/bot/bot";
import { Assignees } from "./modules/assignees/assignees";
import { AssigneesRequest } from "./types/types";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/assignees", (req, res) => {
  Assignees(req.body as AssigneesRequest, res);
});


NoteTelegramBotApi();
connect()


app.listen(ServerConfig.port, () => {
  console.log(`Server is running on port ${ServerConfig.port}`);
});
