
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const bot = new TelegramBot('7053151647:AAGMA3qq280xpibU8f9MKuLQPu0T9WubMX0', {polling: true});

const cityButtons = [
    { text: "Москва", city: "Moscow", image: "1.png" },
    { text: "Париж", city: "Paris", image: "2.png" },
    { text: "Лондон", city: "London", image: "3.png" },
    { text: "Москва", city: "New York", image: "4.png" },
    { text: "Париж", city: "Tokyo", image: "5.png" },
    { text: "Лондон", city: "Krasnodar", image: "6.png" }
];

// Функция для отправки сообщения с кнопками
function sendCityButtons(chatId) {
    const options = {
        reply_markup: JSON.stringify({
            keyboard: cityButtons.map(city => [{ text: city.text }]),
            one_time_keyboard: true
        })
    };
    bot.sendMessage(chatId, 'Выберите город:', options);
}
// Обработчик нажатия на кнопку с названием города
bot.on('message', (msg) => {
    const cityName = msg.text;
    const city = cityButtons.find(city => city.text === cityName);
    if (city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.city}&units=metric&appid=2ed920f2fae3fc09b3a8c000ccde583e`;
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const weather = JSON.parse(body);
                const message = `В городе ${city.text} температура: ${weather.main.temp}°C, ${weather.weather[0].description}`;
                bot.sendMessage(msg.chat.id, message);
            } else {
                bot.sendMessage(msg.chat.id, 'Не удалось получить информацию о погоде для данного города.');
            }
        });
    } else {
        bot.sendMessage(msg.chat.id, 'Пожалуйста, выберите город из предложенных вариантов.');
        sendCityButtons(msg.chat.id);
    }
    
    // Обработчик кликов на кнопки с классом 'button'
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const cityName = button.getAttribute('data-city');
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=2ed920f2fae3fc09b3a8c000ccde583e`;
            request(url, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const weather = JSON.parse(body);
                    const message = `В городе ${cityName} температура: ${weather.main.temp}°C, ${weather.weather[0].description}`;
                    bot.sendMessage(chatId, message);
                } else {
                    bot.sendMessage(chatId, 'Не удалось получить информацию о погоде для данного города.');
                }
            });
        });
    });
});
