"use strict";

// モジュール
const World = require("./World.js");
const GameSettings = require("./GameSettings.js");

// ゲームクラス
module.exports = class Game {
    // 開始
    start(io) {
        // 変数
        const world = new World(io);
        let lastTime = Date.now();

        // 接続時の処理
        io.on("connection", (socket) => {
            console.log(`[${socket.id}] 新規接続を受け入れました`);

            // 接続ごとにつくられるオブジェクト
            let player = null;

            // ゲーム参加時の処理の指定
            socket.on("enter-game", (nickname) => {
                console.log(`[${nickname}(${socket.id})] ゲームに参加しました`);

                // 自プレイヤーの生成
                player = world.createPlayer(socket.id, nickname);
            });

            // 移動コマンド受信時の処理の指定
            socket.on("movement", (movementObject) => {
                // 自プレイヤーがない場合何もしない
                if (!player) return;

                // 自プレイヤーの動作を指定
                player.movementObject = movementObject;
            });

            // 切断時の処理の指定
            socket.on("disconnect", () => {
                console.log(`[${player?.nickname}(${socket.id})] 切断しました`);

                // 自プレイヤーがない場合何もしない
                if (!player) return;

                // 自プレイヤーの削除
                world.removePlayer(player);
                player = null;

                // 通知
                io.emit("exit-game", socket.id);
            });
        });

        // メインループ
        setInterval(() => {
            // 前回処理からの時間を算出
            const currentTime = Date.now();
            const deltaTimeSeconds = (currentTime - lastTime) * 0.001; // 秒に変換
            lastTime = currentTime;

            // 処理時間計測用
            const hrtime = process.hrtime();

            // ゲームワールドの更新
            world.update(deltaTimeSeconds);

            // 処理時間を算出
            const hrtimeDiff = process.hrtime(hrtime);
            const processTimeNanoSeconds = hrtimeDiff[0] * 1e9 + hrtimeDiff[1];

            // 最新状況をクライアントに送信
            io.emit("update", {
                processTimeNanoSeconds,
                players: Array.from(world.playerSet),
            });

        }, 1000 / GameSettings.FRAMERATE);
    }
}