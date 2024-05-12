require('dotenv').config();
const { Bot } = require('grammy');
const { Client } = require('@notionhq/client');

// Инициализация Notion клиента
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Инициализация Telegram бота
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Обработчик сообщений
bot.on('message', async (ctx) => {
  const text = ctx.message.text;

  // Добавление задачи в Notion
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.pageId },
      properties: {
        // Здесь укажите свойства в соответствии с вашей базой данных Notion
        Название: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    ctx.reply('Задача добавлена в Notion! 🤖');
  } catch (error) {
    console.error(error.body);
    ctx.reply('Произошла ошибка при добавлении задачи в Notion! ☠️');
  }
});

// Запуск бота
bot.start();
