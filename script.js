"use strict";

const playingField = function () {
        let fieldObject = [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "],
        ];

        let currentMove = "x";

        const checkGameState = () => {
                for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                                if (fieldObject == " ") {
                                        return true;
                                }
                        }
                }
                return false;
        }
        const move = (x, y) => {
                if (fieldObject != " ") {
                        return "illegal move";
                }
                fieldObject[x][y] = currentMove;
                currentMove = (currentMove == "x") ? "o" : "x";

                let victor = checkVictory();

                if (victor != " ") {
                        return victor;
                };

                if (!checkGameState) {
                        return draw;
                }
        };

        const checkVictory = () => {
                for (let i = 0; i < 3; i++) {
                        let checkValue = fieldObject[i][0]
                        for (let j = 0; j < 3; j++) {
                                if (checkValue != fieldObject[i][j]) {
                                        continue;
                                }
                                if (j == 2) return checkValue;
                        }

                }
                for (let j = 0; j < 3; j++) {
                        let checkValue = fieldObject[0][j]
                        for (let i = 0; i < 3; i++) {
                                if (checkValue != fieldObject[i][j]) {
                                        continue;
                                }
                                if (j == 2) return checkValue;
                        }

                }
                if (fieldObject[0][0] == fieldObject[1][1] == fieldObject[2][2]) {
                        return fieldObject[0][0];
                }
                if (fieldObject[2][0] == fieldObject[1][1] == fieldObject[0][2]) {
                        return fieldObject[2][0];
                }
                return " ";
        };
        const printField = () => console.table(fieldObject);
        return { move, checkVictory, printField };
}()
