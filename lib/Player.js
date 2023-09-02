"use strict";

// モジュール
const GameObject = require("./GameObject");
const SharedSettings = require("../public/js/SharedSettings");
const GameSettings = require("./GameSettings");

// プレイヤークラス
module.exports = class Player extends GameObject {
    constructor(socketid, nickname) {
        // 親クラスのコンストラクタ呼び出し
        super(0, 0, SharedSettings.PLAYER_WIDTH, SharedSettings.PLAYER_HEIGHT);

        // プロパティ
        this.socketid = socketid;
        this.nickname = nickname;
        this.speed = GameSettings.PLAYER_SPEED;
        this.movementObject = {}
        this.direction = "forward";
        this.cx = 0,
            this.cy = SharedSettings.PLAYER_HEIGHT - 6 * 4;
        this.cwidth = SharedSettings.PLAYER_WIDTH;
        this.cheight = 6 * 4;

        // 初期位置の設定
        this.x = Math.random() * (SharedSettings.FIELD_WIDTH - SharedSettings.PLAYER_WIDTH);
        this.y = Math.random() * (SharedSettings.FIELD_HEIGHT - SharedSettings.PLAYER_HEIGHT);
    }

    // 更新
    update(deltaTimeSeconds) {

        // 動作に従って、タンクの状態を更新
        if (this.movementObject["up"]) {
            // 上
            const dy = this.speed * deltaTimeSeconds;
            this.y -= dy;
            this.direction = "back";
        }
        if (this.movementObject["down"]) {
            // 下
            const dy = this.speed * deltaTimeSeconds;
            this.y += dy;
            this.direction = "forward";
        }
        if (this.movementObject["left"]) {
            // 左
            const dx = this.speed * deltaTimeSeconds;
            this.x -= dx;
            this.direction = "left";
        }
        if (this.movementObject["right"]) {
            // 右
            const dx = this.speed * deltaTimeSeconds;
            this.x += dx;
            this.direction = "right";
        }
    }

    // 衝突判定
    checkCollisions() {
        // タイルとの判定

    }

    // オブジェクトに変換
    toJSON() {
        return Object.assign(
            super.toJSON(),
            {
                socketid: this.socketid,
                nickname: this.nickname,
                direction: this.direction
            }
        );

    }
}