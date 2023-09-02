"use strict";

// オブジェクト
const socket = io.connect();

// 描画クラス
const screen = new Screen(socket);

// ページがリロードされるときの処理
window.onbeforeunload = () => {

    socket.disconnect(); // 切断する
};

// スタートボタンの処理
document.getElementById("join-button").onclick = () => {
    // サーバーにenter-gameを送信
    socket.emit("enter-game", document.getElementById("nickname").value);
    document.getElementById("start-screen").style.display = "none";
};

// キーの入力（キーダウン、キーアップ）の処理
let movementObject = {};	// 動作
window.onkeydown = window.onkeyup = (event) => {
    const KeyToCommand = {
        "ArrowUp": "up",
        "ArrowDown": "down",
        "ArrowLeft": "left",
        "ArrowRight": "right",
    };
    const command = KeyToCommand[event.key];
    if (command) {
        if (event.type === "keydown") {
            movementObject[command] = true;
        }
        else // if( event.type === 'keyup' )
        {
            movementObject[command] = false;
        }

        // サーバーに イベント名'change-my-movement'と、objMovementオブジェクトを送信
        socket.emit("movement", movementObject);
    }
};