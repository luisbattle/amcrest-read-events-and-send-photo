require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
//const nameOfBot = process.env.NAME_OF_BOT;

//get variables from environment
const token = process.env.TOKEN;
//const toChannel = process.env.MY_CHANNEL_NAME;
const AMCREST_USER = process.env.AMCREST_USER;
const AMCREST_PASS = process.env.AMCREST_PASS;
const AMCREST_API = process.env.AMCREST_API;
const AMCREST_API_EVENTS = process.env.AMCREST_API_EVENTS;

//FS
const http = require("http");
const fs = require("fs");

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
  polling: true,
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  let userFrom = msg.from.first_name;
  console.log(msg);
  console.log("ChatId: " + chatId);
  // send a message to the chat acknowledging receipt of their message
  console.log("PROCESANDO NUEVO MENSAJE - " + msg.text);
});

//SALIDA DE ERROR
bot.on("polling_error", (msg) => {
  console.log("error: " + msg);
});

// COMANDOS
bot.onText(/^\/getphotofromhome/, (msg, match) => {
  chatId = msg.chat.id;
  bot.sendMessage(chatId, "Taking a photography... ");
  takePhoto(chatId);
});

function takePhoto(chatId) {
  // Take photo
  filename = `images/photo-${Date.now()}.jpg`;

  var needle = require("needle");

  var options = {
    compressed: true, // sets 'Accept-Encoding' to 'gzip, deflate, br'
    follow_max: 5, // follow up to five redirects
    rejectUnauthorized: true, // verify SSL certificate
    username: AMCREST_USER,
    password: AMCREST_PASS,
    auth: "digest",
  };

  let out = fs.createWriteStream(filename);
  needle
    .get(AMCREST_API, options)
    .pipe(out)
    .on("finish", () => {
      //SEND PHOTO
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      bot
        .sendPhoto(chatId, filename, {
          caption: `Living room ${day}/${month}/${year}`,
        })
        .then(function (data) {
          //console.log(data);
          console.log("Sending photo to Telegram...");
        });
    });
}

bot.onText(/^\hola/, (msg, match) => {
  const chatId = msg.chat.id;
  let userFrom = msg.from.first_name;
  bot.sendMessage(chatId, "Hola " + userFrom + ", en que puedo ayudarte  ?");
});
bot.onText(/^\Hola/, (msg, match) => {
  const chatId = msg.chat.id;
  let userFrom = msg.from.first_name;
  console.log(chatId);
  bot.sendMessage(chatId, "Hola " + userFrom + ", en que puedo ayudarte  ?");
});

const request = require("request");
request
  .get(AMCREST_API_EVENTS, {
    auth: {
      user: AMCREST_USER,
      pass: AMCREST_PASS,
      sendImmediately: false,
    },
  })
  .on("data", function (response) {
    //console.log("STATUS CODE: ", response.statusCode); // 200
    let motionDetected = response.toString("utf8");
    if (motionDetected.includes("action=Start")) {
      console.log(motionDetected);
      sendMessage();
    } else {
      console.log("motion detected ending");
    }
  })
  .end("data", function (data) {
    console.log("END:", data);
  });

function sendMessage() {
  let chatId = 986621556; // CHAT ID to send message
  bot.sendMessage(chatId, "motion detected! ");
  takePhoto(chatId);
}
