"use strict";

class PlayerRenderer {
    static InitializeAsync() {
        return new Promise((resolve) => {
            this.Container = new PIXI.Container();
            this.textures = {}; // テクスチャの連想配列
            this.rPlayers = {}; // キーがソケットIDの描画用プレイヤーの連想配列

            // スプライトの読み込み
            const loader = PIXI.Loader.shared;
            loader.add("player", "./images/player.json").load((loader, resource) => {
                // 前方向テクスチャ
                this.textures["forward"] = [];
                this.textures["forward"].push(PIXI.Texture.from("player_forward_0.png"));
                this.textures["forward"].push(PIXI.Texture.from("player_forward_1.png"));
                this.textures["forward"].push(PIXI.Texture.from("player_forward_0.png"));
                this.textures["forward"].push(PIXI.Texture.from("player_forward_2.png"));
                // 後ろ方向テクスチャ
                this.textures["back"] = [];
                this.textures["back"].push(PIXI.Texture.from("player_back_0.png"));
                this.textures["back"].push(PIXI.Texture.from("player_back_1.png"));
                this.textures["back"].push(PIXI.Texture.from("player_back_0.png"));
                this.textures["back"].push(PIXI.Texture.from("player_back_2.png"));
                // 左方向テクスチャ
                this.textures["left"] = [];
                this.textures["left"].push(PIXI.Texture.from("player_left_0.png"));
                this.textures["left"].push(PIXI.Texture.from("player_left_1.png"));
                this.textures["left"].push(PIXI.Texture.from("player_left_0.png"));
                this.textures["left"].push(PIXI.Texture.from("player_left_2.png"));
                // 右方向テクスチャ
                this.textures["right"] = [];
                this.textures["right"].push(PIXI.Texture.from("player_right_0.png"));
                this.textures["right"].push(PIXI.Texture.from("player_right_1.png"));
                this.textures["right"].push(PIXI.Texture.from("player_right_0.png"));
                this.textures["right"].push(PIXI.Texture.from("player_right_2.png"));

                resolve();
            });
        });

    }

    static Update(updateObject) {

        // プレイヤーのリストを処理
        updateObject.players.forEach((player) => {
            // そのプレイヤーのスプライトが存在しない場合
            if (!this.rPlayers[player.socketid]) {
                // スプライト生成
                this._createSprite(player);
            } else {

                // スプライト更新
                const rPlayer = this.rPlayers[player.socketid]; // 描画用プレイヤーの取得
                rPlayer.container.position.set(player.x, player.y); // 位置更新

                // 方向更新
                // 方向が異なる場合、テクスチャを変更してアニメーション開始
                if (rPlayer.sprite.textures != this.textures[player.direction]) {
                    rPlayer.sprite.textures = this.textures[player.direction];
                    rPlayer.sprite.play();
                }
            }
        });
    }

    static _createSprite(player) {

        // コンテナを生成
        const container = new PIXI.Container();
        container.position.set(player.x, player.y);

        // プレイヤーのスプライトを生成し、表示
        const sprite = new PIXI.AnimatedSprite(this.textures[player.direction]);
        sprite.position.set(0, 0);
        sprite.scale.set(4, 4);
        sprite.animationSpeed = 0.1;
        sprite.play();
        container.addChild(sprite);

        // プレイヤー名のスプライトを生成し、表示
        const nicknameText = new PIXI.Text(player.nickname, {
            fontFamily: "sans-serif",
            fontSize: 43,
            fill: 0xFFFFFF,
            stroke: 0x000000,      // アウトラインの色
            strokeThickness: 3,    // アウトラインの太さ
        });
        nicknameText.position.set(sprite.width / 2 - nicknameText.width / 2, -nicknameText.height);
        container.addChild(nicknameText);

        // コンテナを追加
        this.Container.addChild(container);

        this.rPlayers[player.socketid] = {
            container,
            sprite,
            socketid: player.socketid
        };
    }

    static Remove(socketid) {
        this.Container.stage.removeChild(this.rPlayers[socketid].sprite);
        delete this.rPlayers[socketid];
    }
}