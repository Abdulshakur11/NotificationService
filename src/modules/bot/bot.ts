import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { BotConfig } from "../../config/bot";
import { GetUserResponse, Message } from "../../types/types";

export const bot = new TelegramBot(BotConfig.token, {
  polling: true,
});

export async function NoteTelegramBotApi() {
  bot.onText(/\/start/, async (msg) => {
    try {
      const chatId = msg.chat.id;

      const { data } = await axios({
        method: "get",
        url: `http://localhost:3002/users/${chatId}`,
        responseType: "json",
      });

      const userInfo = data as GetUserResponse;

      if (userInfo.status !== true) {
        bot
          .sendMessage(
            chatId,
            "Assalomu alaykum Telegram botimizdan ro'yhatdan o'tish uchun telefon raqamingizni jonating",
            {
              reply_markup: {
                keyboard: [
                  [
                    {
                      text: "Kontaktni jonatish",
                      request_contact: true,
                    },
                  ],
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
              },
            }
          )
          .then((payload) => {
            bot.onReplyToMessage(
              payload.chat.id,
              payload.message_id,
              (message) => {
                updateTelegramId(message.contact.phone_number, chatId);
                bot.sendMessage(chatId, "Muvafaqiyatli ro`yhatdan oringiz.");
              }
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
  });

  bot.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;

      const { data } = await axios({
        method: "get",
        url: `http://localhost:3002/users/${chatId}`,
        responseType: "json",
      });

      const userInfo = data as GetUserResponse;

      if (userInfo.status !== true) {
        bot
          .sendMessage(
            chatId,
            "Assalomu alaykum Telegram botimizdan ro'yhatdan o'tish uchun telefon raqamingizni jonating",
            {
              reply_markup: {
                keyboard: [
                  [
                    {
                      text: "Kontaktni jonatish",
                      request_contact: true,
                    },
                  ],
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
              },
            }
          )
          .then((payload) => {
            bot.onReplyToMessage(
              payload.chat.id,
              payload.message_id,
              (message) => {
                updateTelegramId(message.contact.phone_number, chatId);
                bot.sendMessage(chatId, "Muvafaqiyatli ro`yhatdan oringiz.");
              }
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
  });

  async function updateTelegramId(phoneNumber: string, telegramID: number) {
    try {
      const { data } = await axios({
        method: "put",
        url: `http://localhost:3002/users/${phoneNumber}`,
        responseType: "json",
        data: { telegramID },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export async function Notification(message: Message) {
  bot.sendMessage(message.telegramId, message.message, { parse_mode: "HTML" });
}

bot.on("error", (e) => console.log(e));
bot.on("polling_error", (e) => console.log(e));

function len(arg0: Promise<TelegramBot.Update[]>) {
  console.log(arg0);
  
  // throw new Error("Function not implemented.");
}

