const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7549917288:AAFTmiDsyCdlaOsSjp1Qb1ytFbffQrmtoXA');

let randomNumber;

bot.command('start', (ctx) => {
    ctx.reply('Добро пожаловать в "Угадай число"! Я загадал число от 1 до 100. Попробуй угадать его!');
    randomNumber = Math.floor(Math.random() * 100) + 1;
});

bot.on('message', (ctx) => {
    const userGuess = parseInt(ctx.message.text);
    
    if (isNaN(userGuess)) {
        ctx.reply('Пожалуйста, введите число от 1 до 100.');
        return;
    }

    if (userGuess < 1 || userGuess > 100) {
        ctx.reply('Ваше число вне диапазона! Пожалуйста, угадайте число от 1 до 100.');
        return;
    }

    if (userGuess === randomNumber) {
        ctx.reply('Поздравляю! Вы угадали число! 🎉');
        ctx.reply('Хотите сыграть снова?', {
            reply_markup: new InlineKeyboard().text('Да', 'play_again').row().text('Нет', 'stop_game'),
        });
    } else if (userGuess < randomNumber) {
        ctx.reply('Мало! Попробуйте снова.');
    } else {
        ctx.reply('Много! Попробуйте снова.');
    }
});

bot.callbackQuery('play_again', (ctx) => {
    ctx.answerCallbackQuery();
    ctx.reply('Отлично! Я загадал новое число. Попробуйте угадать его!');
    randomNumber = Math.floor(Math.random() * 100) + 1;
});

bot.callbackQuery('stop_game', (ctx) => {
    ctx.answerCallbackQuery();
    ctx.reply('Спасибо за игру! Если хотите сыграть снова, просто введите /start.');
});

bot.start();
console.log('Бот запущен.');