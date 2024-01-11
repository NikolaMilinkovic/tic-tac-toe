
/*
    Created by Nikola Milinkovic
    nikolamilinkovic221@gmail.com

    As part of the oding project curriculum.
*/



// ======================================[ PLAYER ]======================================
const Player = (sign) => {

    let playerMoves = []
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    const updatePlayerMove = (move) => {
        playerMoves.push(move);
    }

    const getPlayerMoves = () => {
        return playerMoves;
    }

    const resetMoves = () => {
        playerMoves = [];
    }

    return { getSign, updatePlayerMove, getPlayerMoves, resetMoves };
};
// ======================================[ \ PLAYER ]======================================







// ======================================[ DISPLAY CONSTROLER ]======================================
const displayControler = (() => {

    const fieldReferences = document.querySelectorAll('.cell');


    // Adds event listener to each field on the board
    const cellEventListeners = (() => {
        fieldReferences.forEach(element => {
            element.addEventListener('click', (event) => {

                if (event.target.classList.contains('clicked')) return;

                // Adds mark depending on the free-field class present on the element
                if (event.target.classList.contains('free-field-x')){
                    event.target.classList.add('player-x');
                }else{
                    event.target.classList.add('player-o');  
                }
                
                // Click class disables multiple click on the same field
                element.classList.add('clicked');

                // Upon field click, plays the round
                gameControler.playRound(gameControler.playerTurn(), parseInt(event.target.dataset.value));
            });
            
        });

    })();

    // Toggles the class necessary for :hover classes to work
    const setFreeField = (player) => {
        if (player === 'O'){
            fieldReferences.forEach(element => {
                if (element.classList.contains('clicked')) return;
                else{
                    element.classList.remove('free-field-o');
                    element.classList.add('free-field-x');
                }
            });
        }else{
            fieldReferences.forEach(element => {
                if (element.classList.contains('clicked')) return;
                else{
                    element.classList.remove('free-field-x');
                    element.classList.add('free-field-o');
                }
            });
        }
    }

    // Resets all the classes on board elements thus preparing it for the next round
    const resetBoard = () => {
        fieldReferences.forEach(element => {
            element.classList.remove('clicked');
            element.classList.remove('player-o');
            element.classList.remove('player-x');
            element.classList.remove('free-field-x');
            element.classList.remove('free-field-o');
            element.classList.add('free-field-x');
        });
    }
    
    // Resets the board and resets the game values
    const button = document.getElementById('btn-reset');
    button.addEventListener('click', () => {
        resetBoard();
        gameControler.gameReset();
    })


    return { resetBoard, setFreeField };
})();
// ======================================[ \ DISPLAY CONSTROLER]======================================








// ======================================[ GAME CONTROLER ]======================================
const gameControler = (() => {
    const playerX = Player('X');
    const playerY = Player('O');
    let round = 0;

    // Resets the board and applies required classes
    displayControler.resetBoard();



    // Logic for playing each round depending on active player
    // It will update the current playerMoves array with fieldValue
    // Evaluate on each move for win condition
    // Announce a winner if one is present
    // Toggle setFreeField classes for the next move
    const playRound = (player, fieldValue) => {
        if (player === 'X'){
            playerX.updatePlayerMove(fieldValue);
            evaluateMoves(playerX.getPlayerMoves(), player);
            displayControler.setFreeField(player);
        }else{
            playerY.updatePlayerMove(fieldValue);
            evaluateMoves(playerY.getPlayerMoves(), player);
            displayControler.setFreeField(player);
        }

    }

    // Function for determening the current active player
    const playerTurn = () => {
        round++;
        return round%2 === 1 ? 'X' : 'O';
    }

    // Function for evaluating the player moves array
    // Compares win conditions and if the winner is found
    // Handles the win logic
    const evaluateMoves = (playerMoves, playerSign) => {
        const winConditions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];
        for (const condition of winConditions){
            if (condition.every(move => playerMoves.includes(move))){


                // Add player win logic here!
                // To do:
                //   - Display Winner message
                //   - Darken the background
                //   - Display Reset button



                alert("The winner is " + playerSign + "!");
            }
        }
    }

    // Resets the game rounds value and player moves
    const gameReset = () => {
        round = 0;
        playerX.resetMoves();
        playerY.resetMoves();
    }

    return { playRound, playerTurn, gameReset };
})();
// ======================================[ \ GAME CONTROLER ]======================================