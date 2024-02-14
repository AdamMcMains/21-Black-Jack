let blackJack = {
    'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},

    'cards' : ['2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AC','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AD','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AH','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AS'],

    'cardsMap' : {'2C': 2,'3C': 3,'4C': 4,'5C': 5,'6C': 6,'7C': 7,'8C': 8,'9C': 9,'10C': 10,'KC': 10,'QC': 10,'JC': 10,'AC': [1,11],'2D': 2,'3D': 3,'4D': 4,'5D': 5,'6D': 6,'7D': 7,'8D': 8,'9D': 9,'10D': 10,'KD': 10,'QD': 10,'JD': 10,'AD': [1,11],'2H': 2,'3H': 3,'4H': 4,'5H': 5,'6H': 6,'7H': 7,'8H': 8,'9H': 9,'10H': 10,'KH': 10,'QH': 10,'JH': 10,'AH': [1,11],'2S': 2,'3S': 3,'4S': 4,'5S': 5,'6S': 6,'7S': 7,'8S': 8,'9S': 9,'10S': 10,'KS': 10,'QS': 10,'JS': 10,'AS': [1,11]},

    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
 };

 const YOU = blackJack['you'];
 const DEALER = blackJack['dealer'];

 function drawCard(){
    const randomNumber = Math.floor(Math.random()*(blackJack['cards'].length));
    const currentCard = blackJack['cards'].splice(randomNumber,1);
    let card = document.createElement('img');
    card.src = `cards/${currentCard}.png`;
    document.querySelector(YOU['div']).appendChild(card);

    updatedScore(currentCard,YOU);

    showScore(YOU);


 }

 function updatedScore(currentCard,activePlayer){
    //Ace
    if(currentCard === 'AC' || currentCard === 'AD' || currentCard === 'AH' || currentCard === 'AS'){
        if(activePlayer['score'] + blackJack['cardsMap'][currentCard][1] <= 21){
            activePlayer['score'] += blackJack['cardsMap'][currentCard][1];
        }else{
            activePlayer['score'] += blackJack['cardsMap'][currentCard][0];
        }
    }
    else{
        activePlayer['score'] += blackJack['cardsMap'][currentCard];
    }
    
 }

    function showScore(activePlayer){
        if(activePlayer['score'] > 21){
            document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
            document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        }else{
            document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
        }
    }

    function findWinner() {
        let winner;

        if(YOU['score']<21){
            if(DEALER['score']<YOU['score'] || DEALER['score']>21){
                winner = YOU;
                blackJack['wins']++;
        }
        else if (DEALER['score'] == YOU['score']){
            blackJack['draws']++;
        }
        else{
            blackJack['losses']++;
            winner = DEALER;
        }
    }
    else if (YOU['score']>21 && DEALER['score']<=21){
        winner = DEALER;
        blackJack['losses']++;
    }
    else if (YOU['score']>21 && DEALER['score']>21){
        blackJack['draws']++;
    }
    return winner;
    }

    //Results
    function showResults(winner){
        if (winner === YOU){
            document.querySelector('#blackjack-result').textContent = 'You win!';
            document.querySelector('#blackjack-result').style.color = 'green';
        }
        else if (winner === DEALER){
            document.querySelector('#blackjack-result').textContent = 'You lost!';
            document.querySelector('#blackjack-result').style.color = 'red';
        }
        else{
            document.querySelector('#blackjack-result').textContent = "It's a Draw!";
            document.querySelector('#blackjack-result').style.color = 'black';
        }
    }

    function scoreboard(){
        document.querySelector('#wins').textContent = blackJack['wins'];
        document.querySelector('#losses').textContent = blackJack['losses'];
        document.querySelector('#draws').textContent = blackJack['draws'];
    }

    //hit button
    document.querySelector('#hit').addEventListener('click', hit);

    function hit(){

        if(YOU['score']=== 0){
            alert('Please click on the "hit" button to start the game');
        }
        else if(DEALER['score']===0){
            alert('Please click on the "stand" button to start the game');
        }
        else{
            let yourimg = document.querySelector('#your-box').querySelectorAll('img');
            let dealerimg = document.querySelector('#dealer-box').querySelectorAll('img');

            for(let i=0;i<yourimg.length;i++){
                yourimg[i].remove();
            }
            for(let i=0;i<dealerimg.length;i++){
                dealerimg[i].remove();
            }
        }

        blackJack['cards'] = ['2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AC','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AD','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AH','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AS'];

        YOU['score'] = 0;
        document.querySelector(YOU['scoreSpan']).textContent = YOU['score'];
        document.querySelector(YOU['scoreSpan']).style.color = 'white';

        DEALER['score'] = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#command').textContent = "Let's Play!";
        document.querySelector('#command').style.color = 'black';
    }

    //stand button

    document.querySelector('#stand').addEventListener('click', stand);

    function stand(){
        if(YOU['score']=== 0){
            alert('Please click on the "hit" button to start the game');
        }
        else{
            while(DEALER['score']<16){
                drawCard(DEALER);
            }
            setTimeout(function(){
                showResults(findWinner());
                scoreboard();
            }, 1000);
        }
    }


    
