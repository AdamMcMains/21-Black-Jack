let BJgame = {
    'you': {'scoreSpan': '#yourscore' , 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealerscore' , 'div': '#dealer-box', 'score': 0},
    
    'cards': ['2-C','3-C','4-C','5-C','6-C','7-C','8-C','9-C','10-C','K-C','Q-C','J-C','A-C','2-D','3-D','4-D','5-D','6-D','7-D','8-D','9-D','10-D','K-D','Q-D','J-D','A-D','2-H','3-H','4-H','5-H','6-H','7-H','8-H','9-H','10-H','K-H','Q-H','J-H','A-H','2-S','3-S','4-S','5-S','6-S','7-S','8-S','9-S','10-S','K-S','Q-S','J-S','A-S'],
    
    'cardsmap': {'2-C':2,'3-C':3,'4-C':4,'5-C':5,'6-C':6,'7-C':7,'8-C':8,'9-C':9,'10-C':10,'K-C':10,'Q-C':10,'J-C':10,'A-C':[1,11],'2-D':2,'3-D':3,'4-D':4,'5-D':5,'6-D':6,'7-D':7,'8-D':8,'9-D':9,'10-D':10,'K-D':10,'Q-D':10,'J-D':10,'A-D':[1,11],'2-H':2,'3-H':3,'4-H':4,'5-H':5,'6-H':6,'7-H':7,'8-H':8,'9-H':9,'10-H':10,'K-H':10,'Q-H':10,'J-H':10,'A-H':[1,11],'2-S':2,'3-S':3,'4-S':4,'5-S':5,'6-S':6,'7-S':7,'8-S':8,'9-S':9,'10-S':10,'K-S':10,'Q-S':10,'J-S':10,'A-S':[1,11]},

    'wins':0,
    'losses':0,
    'draws':0
};

const You = BJgame['you'];
const Dealer = BJgame['dealer'];
var gameStatus;

//deal your starting cards
function dealYou(activeplayer){
    drawCard(activeplayer);
    drawCard(activeplayer);
}

// deal the dealers starting cards
function dealDealer(activeplayer){
    let facedownCard = document.createElement('img');
    facedownCard.setAttribute("id", "faceDownCard");
    facedownCard.src = `/cards/BACK.png`;
    document.querySelector(activeplayer['div']).appendChild(facedownCard);
    drawCard(activeplayer);
}

// Starting Hands
function initDeal(){
    newGame();
    dealYou(You);
    dealDealer(Dealer);
    gameStatus = "inProgress"
}

function drawCard(activeplayer) {
    const randomNumber = Math.floor(Math.random() * (BJgame['cards'].length));
    const currentCard = BJgame['cards'].splice(randomNumber, 1);
    let card = document.createElement('img');
    card.setAttribute("class", "faceUpCard");
    card.src = `/cards/${currentCard}.png`;
    document.querySelector(activeplayer['div']).appendChild(card);
    
    
    // Update Score
    updateScore(currentCard, activeplayer);

    // Show Score
    showScore(activeplayer);
    
}

function revealFacedown(){
    const randomNumber = Math.floor(Math.random() * (BJgame['cards'].length));
    const currentCard = BJgame['cards'].splice(randomNumber, 1);
    let facedownCard = document.getElementById("faceDownCard");
    facedownCard.src = `/cards/${currentCard}.png`;

    updateScore(currentCard, Dealer);

    showScore(Dealer);
}

function updateScore(currentcard, activeplayer){
    // For Ace
    if(currentcard == 'A-C' || currentcard == 'A-D' || currentcard == 'A-H' || currentcard == 'A-S'){
        if((activeplayer['score'] + BJgame['cardsmap'][currentcard][1]) <= 21){

            activeplayer['score'] += BJgame['cardsmap'][currentcard][1];
        }
        else{
            activeplayer['score'] += BJgame['cardsmap'][currentcard][0];
        }
    }
    else{  //For Other Cases
        activeplayer['score'] += BJgame['cardsmap'][currentcard];
    }   
}

//resets game board
function clearTable(){
    let yourimg = document.querySelector('#your-box').querySelectorAll('img');
    let dealerimg = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(let i=0; i<yourimg.length; i++){
        yourimg[i].remove();
    }
    for(let i=0; i<dealerimg.length; i++){
        dealerimg[i].remove();
    }
}


function showScore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color = 'yellow';
    }
    else{
        document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
}

// Compute Winner Function
function findWinner(){
    let winner;

    if(You['score']<=21){
        if(Dealer['score']<You['score'] || Dealer['score']>21){
            BJgame['wins']++;
            winner = You;
        }
        else if(Dealer['score'] == You['score']){
            BJgame['draws']++;
        }
        else{
            BJgame['losses']++;
            winner = Dealer;
        }
    }
    else if(You['score']>21 && Dealer['score']<=21){
        BJgame['losses']++;
        winner = Dealer;
    }
    else if(You['score']>21 && Dealer['score']>21){
        BJgame['draws']++;
    }
    return winner;
}



function showresults(winner){
    if(winner == You){
        document.querySelector('#command').textContent = '';
        document.querySelector('#command').style.color = '';
    }
    else if(winner == Dealer){
        document.querySelector('#command').textContent = "";
        document.querySelector('#command').style.color = '';
    }
    else{
        document.querySelector('#command').textContent = '';
        document.querySelector('#command').style.color = '';
    }

}

// Scoreboard
function scoreboard(){
    document.querySelector('#wins').textContent = BJgame['wins'];
    document.querySelector('#losses').textContent = BJgame['losses'];
    document.querySelector('#draws').textContent = BJgame['draws'];
}


function newGame(){
    clearTable();
    You['score'] = 0;
    Dealer['score'] = 0;
    document.querySelector('#command').textContent = '';
    document.querySelector('#command').style.color = '';

}
// Hit Button (starting)
document.querySelector('#hit').addEventListener('click', BJhit);

function BJhit(){
        if(You['score']<=21){
            drawCard(You);
        }
    }

document.querySelector('#deal').addEventListener('click', function(){
    if (gameStatus == "finished"){
        initDeal();
    }
    else if (gameStatus == "inProgress"){
        alert("Finish current game first")
    }
    else{
        initDeal();
    }
});


// Dealer's Logic (2nd player) OR Stand button
document.querySelector('#stand').addEventListener('click', BJstand)


function BJstand(){
    if(You['score'] == 0){
        alert('Start the game first');
    }
    else{
        revealFacedown();
        showresults(findWinner());
        scoreboard();
        document.querySelector('#deal').textContent = 'New Game'
        gameStatus = "finished"
    
    }
}

document.querySelector('#fold').addEventListener('click', BJfold)

function BJfold(){
        document.querySelector('#command').textContent = "You Folded";
        document.querySelector('#command').style.color = 'Orange';

        document.querySelector('#deal').textContent = 'New Game'
        gameStatus = "finished"
}

