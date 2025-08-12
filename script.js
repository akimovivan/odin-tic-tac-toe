"use strict";

const gameObject = function () {
        let fieldObj;
        let playingField = [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "],
        ];

        let currentMove = "x";

        const checkGameState = () => {
                for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                                if (playingField[i][j] == " ") {
                                        return true;
                                }
                        }
                }
                return false;
        }

        const move = (id) => {
                const { i, j } = translateIdToIndexes(id);
                if (playingField[i][j] != " ") {
                        return "illegal move";
                }

                playingField[i][j] = currentMove;
                currentMove = (currentMove == "x") ? "o" : "x";

                let victor = checkVictory();

                if (victor != " ") {
                        return victor;
                };

                if (!checkGameState()) {
                        return "draw";
                }

                renderField()
        };

        const checkVictory = () => {
                for (let i = 0; i < 3; i++) {
                        let checkValue = playingField[i][0];
                        for (let j = 0; j < 3; j++) {
                                if (checkValue != playingField[i][j]) {
                                        break;
                                }
                                if (j == 2 && checkValue != " ") return checkValue;
                        }
                }

                for (let j = 0; j < 3; j++) {
                        let checkValue = playingField[0][j];
                        for (let i = 0; i < 3; i++) {
                                if (checkValue != playingField[i][j]) {
                                        break;
                                }
                                if (i == 2 && checkValue != " ") return checkValue;
                        }
                }

                if (playingField[0][0] != " " &&
                        playingField[0][0] == playingField[1][1] &&
                        playingField[1][1] == playingField[2][2]) {
                        return playingField[0][0];
                }

                if (playingField[2][0] != " " &&
                        playingField[2][0] == playingField[1][1] &&
                        playingField[1][1] == playingField[0][2]) {
                        return playingField[2][0];
                }

                return " ";
        };

        const createField = (el) => {
                for (let i = 0; i < 9; i++) {
                        const newDiv = document.createElement("div");
                        newDiv.className = "cell";
                        newDiv.dataset.id = i;
                        el.appendChild(newDiv);
                }
                fieldObj = el;
        }
        const renderField = () => {
                const children = fieldObj.children;
                for (const child of children) {
                        const childId = child.dataset.id;
                        let { i, j } = translateIdToIndexes(childId);
                        child.innerText = playingField[i][j];
                }
        }
        const translateIdToIndexes = (id) => {
                const i = Math.floor(id / 3);
                const j = id - 3 * i;
                return { i, j }
        }

        const printField = () => { console.table(playingField) };
        return { move, checkVictory, renderField, createField, printField };
}()

window.addEventListener('DOMContentLoaded', function () {
        const fieldObj = document.getElementById("field");
        gameObject.createField(fieldObj);

        fieldObj.addEventListener("click", (e) => {
                if (e.target.dataset.id === "undefined") {
                        console.error("Help me");
                }
                const state = gameObject.move(e.target.dataset.id);

                if (state == "illegal move") {
                        alert("illegal move");
                } else if (state == "draw") {
                        alert("draw");
                } else if (state == "x" || state == "y") {
                        alert(`${state} has won`);
                        console.log("sas");
                }
        })
});
