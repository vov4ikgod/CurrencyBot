const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('5487547588:AAFgxnav-SjV3F3eidTIcwldgkd3SI0UsK4');
const axios = require('axios');
const cc = require('currency-codes');

bot.start((ctx) => ctx.reply(`Привет🖐🏻 ${ctx.message.from.first_name}, тут ты можешь посмотреть курс самых популярных валют💸`));

bot.on('text', async (ctx) => {    
    const clientCurCode = ctx.message.text;
    const currency = cc.code(clientCurCode);

    if(!currency) {
        return ctx.reply('Я не знаю такую валюту💸')
    }

    try {
        const currencyObject = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');

        const foundCurrency = currencyObject.data.Valute[clientCurCode];
        return ctx.reply(`
Имя:${foundCurrency.Name}
Курс: ${foundCurrency.Value}
        `);
    } catch (error) {
        console.log('Err');
        return ctx.reply(error);
    }
});

bot.launch();   