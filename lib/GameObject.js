"use strict";

// ゲームオブジェクトクラス
module.exports = class GameObject {
    // コンストラクタ
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // オブジェクトに変換
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
}