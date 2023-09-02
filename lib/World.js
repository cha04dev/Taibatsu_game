"use strict";

// モジュール
const Player = require("./Player");

// ワールドクラス
module.exports = class World {
    // コンストラクタ
    constructor(io) {
        this.io = io;
        this.playerSet = new Set(); // プレイヤーのリスト
    }

    // 更新処理
    update(deltaTimeSeconds) {
        // オブジェクトの更新
        this.updateObjects(deltaTimeSeconds);

        // 衝突チェック
        this.checkCollisions();

        // 新たな行動
        this.doNewActions();
    }

    updateObjects(deltaTimeSeconds) {
        // プレイヤーの更新処理
        this.playerSet.forEach((player) => player.update(deltaTimeSeconds));
    }

    checkCollisions() {

    }

    doNewActions(deltaTimeSeconds) {

    }

    // プレイヤーを生成
    createPlayer(socketid, nickname) {
        // プレイヤーの生成
        const player = new Player(socketid, nickname);

        // プレイヤーリストへの登録
        this.playerSet.add(player);

        // 生成したプレイヤーを返す
        return player;
    }

    // プレイヤーを削除
    removePlayer(player) {
        // プレイヤーリストから削除
        this.playerSet.delete(player);
    }
}