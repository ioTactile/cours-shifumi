// Initialisation des variables et constantes
const shifumi = ["pierre", "feuille", "ciseaux"];
const player1 = { name: "Jordan", score: 0, isCheating: false };
const player2 = { name: "Laurent", score: 0, isCheating: false };
const scoreToWin = 3;
const separator = "--------------------";
const choicesCount = shifumi.length;
const cheatProbability = 0.2;


// Définition des fonctions
const chooseRandom = () => shifumi[Math.floor(Math.random() * choicesCount)];

const isCheating = () => Math.random() < cheatProbability;

const chooseStartingPlayer = (player1, player2) => [player1, player2][Math.floor(Math.random() * 2)];

const play = (player1, player2) => {
    while(player1.score < scoreToWin && player2.score < scoreToWin) {
        const startingPlayer = chooseStartingPlayer(player1, player2);
        let lastCheater = null;
        let player1Choice = chooseRandom();
        let player2Choice = chooseRandom();

        if (startingPlayer === player1) {
            if (lastCheater !== player2 && isCheating()) {
                player1Choice =
                    shifumi[(shifumi.indexOf(player2Choice) + 1) % choicesCount];
                player1.isCheating = true;
                lastCheater = player1;
                console.log(`${player1.name} triche et choisit ${player1Choice}.`);
            } else {
                console.log(`${player1.name} a choisi ${player1Choice}.`);
            }
            if (lastCheater !== player1 && isCheating()) {
                player2Choice =
                    shifumi[(shifumi.indexOf(player1Choice) + 1) % choicesCount];
                player2.isCheating = true;
                lastCheater = player2;
                console.log(`${player2.name} triche et choisit ${player2Choice}.`);
            } else {
                console.log(`${player2.name} a choisi ${player2Choice}.`);
            }
        } else {
            if (lastCheater !== player1 && isCheating()) {
                player2Choice =
                    shifumi[(shifumi.indexOf(player1Choice) + 1) % choicesCount];
                player2.isCheating = true;
                lastCheater = player2;
                console.log(`${player2.name} triche et choisit ${player2Choice}.`);
            } else {
                console.log(`${player2.name} a choisi ${player2Choice}.`);
            }
            if (lastCheater !== player2 && isCheating()) {
                player1Choice =
                    shifumi[(shifumi.indexOf(player2Choice) + 1) % choicesCount];
                player1.isCheating = true;
                lastCheater = player1;
                console.log(`${player1.name} triche et choisit ${player1Choice}.`);
            } else {
                console.log(`${player1.name} a choisi ${player1Choice}.`);
            }
        }

        if (player1Choice === player2Choice) {
            console.log("égalité");
        } else if (
            (player1Choice === "pierre" && player2Choice === "ciseaux") ||
            (player1Choice === "feuille" && player2Choice === "pierre") ||
            (player1Choice === "ciseaux" && player2Choice === "feuille")
        ) {
            player1.score++;
            console.log(`${player1.name} gagne la manche.`);
        } else {
            player2.score++;
            console.log(`${player2.name} gagne la manche.`);
        }

        if (Math.random() < 0.2 && (player1.isCheating || player2.isCheating)) {
            console.log("Oh non ! Il y a eu une bagarre !");
            const index = Math.floor(Math.random() * 2);
            const fighter = [player1, player2][index];
            const victim = [player1, player2][(index + 1) % 2];

            console.log(`${fighter.name} a frappé ${victim.name} !`);
            
            if (victim === player1) {
                if (player1.score === 0) {
                  console.log(`${player1.name} ne peut pas perdre de points, il est déjà à 0.`);
                } else {
                  player1.score--;
                  console.log(`${player1.name} perd un point !`);
                }
              } else {
                if (player2.score === 0) {
                  console.log(`${player2.name} ne peut pas perdre de points, il est déjà à 0.`);
                } else {
                  player2.score--;
                  console.log(`${player2.name} perd un point !`);
                }
              }
        }

        player1.isCheating = false;
        player2.isCheating = false;
        console.log(`${player1.score} - ${player2.score}`)
        console.log(separator)
        checkForWinner(player1, player2);
    }
}

const checkForWinner = (player1, player2) => {
    if (player1.score === scoreToWin) {
        console.log(`${player1.name} a gagné la partie!`);
        console.log(separator)
        return true;
    } else if (player2.score === scoreToWin) {
        console.log(`${player2.name} a gagné la partie!`);
        console.log(separator)
        return true;
    }
    return false;
}

play(player1, player2);

