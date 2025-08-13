"use strict";

const gameObject = function () {
        let fieldObj;
        let playingField = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        let players = {
                "x": { name: "player1", score: 0, element: document.getElementById("scoreX") },
                "o": { name: "player2", score: 0, element: document.getElementById("scoreY") },
        };

        let currentMove = "x";
        let startingMove = "x";

        const tieElement = document.getElementById("scoreTie");
        let tieScore = 0;

        const turnXElement = document.getElementById("turnX");
        const turnOElement = document.getElementById("turnO");

        const changeActiveMove = () => {
                turnXElement.classList.toggle("active");
                turnOElement.classList.toggle("active");
                currentMove = (currentMove == "x") ? "o" : "x";
        }
        const checkGameState = () => {
                for (let i = 0; i < 9; i++) {
                        if (playingField[i] == " ") {
                                return true;
                        }
                }
                return false;
        }

        const move = (id) => {
                if (playingField[id] != " ") {
                        alert("Illegal move");
                        return;
                }

                playingField[id] = currentMove;
                changeActiveMove();

                const victor = checkVictory();
                const isDraw = checkGameState();

                if (victor != " ") {
                        players[victor].score++;
                        players[victor].element.innerText = players[victor].score;
                        clearPlayingField();
                        return;
                };

                if (!isDraw) {
                        tieElement.innerText = ++tieScore;
                        clearPlayingField();
                        return;
                }

                renderField();
        };

        const checkVictory = () => {
                // Check rows
                for (let i = 0; i < 3; i++) {
                        if (
                                playingField[i * 3] != " " &&
                                playingField[i * 3] == playingField[i * 3 + 1] &&
                                playingField[i * 3 + 1] == playingField[i * 3 + 2]
                        )
                                return playingField[i * 3];
                }

                // Check columns
                for (let i = 0; i < 3; i++) {
                        if (
                                playingField[i] != " " &&
                                playingField[i] == playingField[3 + i] &&
                                playingField[3 + i] == playingField[6 + i]
                        )
                                return playingField[i];
                }

                if (
                        playingField[0] != " " &&
                        playingField[0] == playingField[4] &&
                        playingField[4] == playingField[8]
                ) {
                        return playingField[0];
                }

                if (
                        playingField[2] != " " &&
                        playingField[2] == playingField[4] &&
                        playingField[4] == playingField[6]
                ) {
                        return playingField[2];
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
                        child.innerText = playingField[childId];
                }
        }

        const setPlayers = (player1, player2) => {
                players["x"].name = player1;
                players["o"].name = player2;
                playerScoreX.innerText = player1;
                playerScoreY.innerText = player2;
        }


        const getPlayers = () => { return players; }

        const clearPlayingField = () => {
                currentMove = (startingMove == "x") ? "o" : "x";
                startingMove = currentMove;
                if (currentMove == "x") {
                        turnXElement.classList.add("active");
                        turnOElement.classList.remove("active");
                } else {
                        turnOElement.classList.add("active");
                        turnXElement.classList.remove("active");
                }
                for (let i = 0; i < 9; i++) {
                        playingField[i] = " ";
                }
                renderField();
        }

        return {
                move,
                createField,
                setPlayers,
        };
}()

window.addEventListener('DOMContentLoaded', function () {
        const fieldObj = document.getElementById("field");
        gameObject.createField(fieldObj);

        const userForm = document.querySelector("form");
        userForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const myFormData = new FormData(e.target);
                const formDataObj = Object.fromEntries(myFormData.entries());
                gameObject.setPlayers(formDataObj.player1, formDataObj.player2);
        })

        fieldObj.addEventListener("click", (e) => {
                if (e.target.dataset.id === "undefined") {
                        console.error("Help me");
                }
                gameObject.move(e.target.dataset.id);
        })
});
