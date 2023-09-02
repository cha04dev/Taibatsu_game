"use strict";

// 描画設定クラス
class RenderingSettings {

    // 描画画面の大きさ
    static get SCREEN_SCALE() { return 4; }
    static get SCREEN_WIDTH() { return 16 * 16 * this.SCREEN_SCALE; }
    static get SCREEN_HEIGHT() { return 16 * 16 * this.SCREEN_SCALE; }
}