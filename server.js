"use strict";

// モジュール
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Game = require("./lib/Game.js");

// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 1337;

// ゲームの作成と開始
const game = new Game();
game.start(io);

// 公開フォルダの指定
app.use(express.static(__dirname + "/public"));

// サーバーの起動
server.listen(PORT, () => {
    console.log(`[Server] ${PORT} 番でサーバーを起動しました`);
});