"use strict";

// スクリーンクラス
class Screen {
    // コンストラクタ
    constructor(socket) {

        this.socket = socket;
        this.app = null;
        this.initCompleted = false; // 初期化が完了したか

        // PixiJSの初期化
        this.initPixiJS();

        // 描画関係の初期化
        this.initRenderer();

        // ソケットの初期化
        this.initSocket();
    }

    // ソケットの初期化
    initSocket() {
        // 接続確立時の処理
        this.socket.on("connect", () => {
            console.log(`[${this.socket.id}]接続しました`);

            // サーバーからの更新通知の処理
            this.socket.on("update", (updateObject) => {
                this.updateRenderer(updateObject);
            })

            // 退室通知の処理
            this.socket.on("exit-game", (socketid) => {
                console.log(socketid);
                PlayerRenderer.Remove(socketid);
            });
        });
    }

    // PixiJSの初期化
    initPixiJS() {
        // PixiJSの設定
        PIXI.TextMetrics.BASELINE_SYMBOL += "あ"; // 日本語の文字描画に必要な計測文字列を定義
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // 画像を拡大したときに補完処理を行わないようにする

        // PixiJSのインスタンスを作成
        this.app = new PIXI.Application({
            width: RenderingSettings.SCREEN_WIDTH,
            height: RenderingSettings.SCREEN_HEIGHT,
            transparent: false,
            antialias: false,
        });

        // 背景色の設定
        this.app.renderer.backgroundColor = 0x23395D;

        // bodyに追加
        this.app.view.id = "main_canvas";
        document.getElementById("main").appendChild(this.app.view);
    }

    // 描画関係の初期化
    initRenderer() {
        // マップ描画の初期化
        MapRenderer.InitializeAsync().then(() => {
            // プレイヤー描画の初期化
            return PlayerRenderer.InitializeAsync();
        }).then(() => {
            // 待機が必要な初期化がすべて終了

            // 情報描画の初期化
            InfoRenderer.Initialize();

            // 描画を適用(下層レイヤーから)
            this.app.stage.addChild(MapRenderer.Container);
            this.app.stage.addChild(PlayerRenderer.Container);
            this.app.stage.addChild(InfoRenderer.Container);

            // 初期化完了
            this.initCompleted = true;
        });
    }

    // 描画関係の更新
    updateRenderer(updateObject) {
        // 初期化が完了していない場合は処理しない
        if (!this.initCompleted) return;

        // プレイヤー描画の更新
        PlayerRenderer.Update(updateObject);

        // 情報描画の更新
        InfoRenderer.Update(updateObject);
    }
}