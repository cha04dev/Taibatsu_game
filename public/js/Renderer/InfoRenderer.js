"use strict";

class InfoRenderer {
    static Initialize() {
        this.Container = new PIXI.Container();

        // 処理時間を表すテキストを追加
        this.processNanoSecondsText = new PIXI.Text("Connecting...", {
            fontFamily: "monospace",
            fontSize: 36,
            fill: 0xFFFFFF,
        });
        this.processNanoSecondsText.x = RenderingSettings.SCREEN_WIDTH - 270;
        this.Container.addChild(this.processNanoSecondsText);

        this.hpText = new PIXI.Text("HP:100", {
            fontFamily: "monospace",
            fontSize: 36,
            fill: 0xFFFFFF,
        });
        this.hpText.x = 0;
        this.hpText.y = 0;
        this.Container.addChild(this.hpText);
    }

    static Update(updateObject) {
        // 処理時間を更新
        this.processNanoSecondsText.text = (updateObject.processTimeNanoSeconds * 1e-9).toFixed(9) + " [s]";


    }
}