import { AssigneesRequest } from "../../types/types";
import { bot } from "../bot/bot";

export async function Assignees(req: AssigneesRequest, res: any) {
  try {
    const { message, telegramId } = req;

    bot.sendMessage(telegramId, message);
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.log(error);
  }
}
