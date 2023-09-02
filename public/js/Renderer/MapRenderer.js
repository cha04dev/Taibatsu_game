"use strict";

class MapRenderer {
    static InitializeAsync() {
        return new Promise((resolve) => {
            this.Container = new PIXI.Container();
            this.texture = []; // テクスチャの連想配列

            // スプライトの読み込み
            const loader = PIXI.Loader.shared;
            loader.add("maptile", "./images/maptile.json").load((loader, resource) => {
                // テクスチャ定義
                for (let j = 0; j < 2; j++)
                    for (let i = 0; i < 11; i++) {
                        this.texture.push(PIXI.Texture.from(`maptile_${i}_${j}.png`));
                    }

                // マップタイル描画
                for (let x = 0; x < 16; x++)
                    for (let y = 0; y < 16; y++) {
                        // タイルのスプライトを生成し、表示
                        const sprite = new PIXI.Sprite(this.texture[SharedSettings.MAPTILE[y][x]]);
                        sprite.position.set(x * 16 * 4, y * 16 * 4);
                        sprite.scale.set(4, 4);
                        this.Container.addChild(sprite);
                    }

                resolve();
            });
        });
    }

    static Update(updateObject) {

    }
}