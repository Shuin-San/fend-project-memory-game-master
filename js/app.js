/*
 * Create a list that holds all of your cards
 */
let icons = [
    "fa-diamond", "fa-paper-plane", "fa-anchor",
    "fa-bolt", "fa-cube", "fa-bicycle",
    "fa-bomb", "fa-leaf", "fa-diamond",
    "fa-paper-plane", "fa-anchor",
    "fa-bolt", "fa-cube", "fa-bicycle",
    "fa-bomb", "fa-leaf"
];

//calculate total pairs based on icons list
let totalPairs = icons.length / 2;

//Launch welcoming Modal
function showModal(){
$('#startLabel').modal({
  escapeClose: false,
  clickClose: false,
  showClose: false
});
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return icons;
}

shuffle(icons);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.getElementById('mainDeck');

/*
 *Generate Deck HTML
 */

function genDeck() {
    document.getElementById("totalPairs").innerHTML = totalPairs;
    for (let i = 0; i < icons.length; i++) {
        let card = document.createElement('li');
        card.className = "card animated fadeIn  delay-0.1s";
        card.id = "card_" + i;
        deck.appendChild(card);
        card.innerHTML = '<i class="fa ' + icons[i] + '"></i>';
        card.addEventListener("click", this.showCard, false);
        console.log(i);
    }
    allCards = document.getElementsByClassName('card');
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// first lets set all the variables needed for the logic
let openCards = [];
let lockedCards = [];
let firstCard = "";
let clickedCard = "";
let cardType = "";
let moves = 0;
let pairs = 0;
let score = 1500;
let stars = 3;
let bgm = document.getElementById("bgm");
let time = 0;
let theTimer;


//shows the clicked cards and contains logic for comparing the two and acting accordingly

function showCard(id) {
    var audio = new Audio('sound/click.mp3');
    audio.play();
    clickedCard = event.target.id;
    cardType = document.getElementById(clickedCard).children;
    document.getElementById(clickedCard).className = "card open show cardTurned animated faster rubberBand delay-2s";
    //Control if list has items. if true , execute controlMatch()
    if (openCards.length == 1 && firstCard != clickedCard) {
        controlMatch(cardType[0].classList[1]);
        countMove();
        firstCard = "";
    } else if (firstCard == clickedCard) {
        console.log("duplicate click detected!");
        openCards = [];
        document.getElementById(firstCard).className = "card";
        firstCard = "";
    } else {
        addToOpenList(cardType[0].classList[1]);
        firstCard = clickedCard;

    }

}

// Adds clicked card to list of "open" cards

function addToOpenList(cardID) {
    openCards.push(cardID);
    console.log("added to open card list :" + openCards);

}

// Controls for duplicates in open card list.

function controlMatch(theCard) {
    result = openCards.includes(theCard);
    if (result == true && firstCard != clickedCard) {
        lockCards(openCards);
        pairs += 1;
        openCards = [];
        checkWin();
    } else {
        setTimeout(hideCards, 750);
    }
    console.log(result);
}

// If the cards are matching , lock them open !
function lockCards(list) {

    console.log("Locking " + openCards);
    lockedCards.push(openCards);
    turned = document.querySelectorAll("li.cardTurned");
    for (i = 0; i < turned.length; i++) {
        turned[i].className = "card open show match animated infinite pulse delay-2s"
    }

}

// if the cards dont match , hide them again

function hideCards() {
    turned = document.querySelectorAll("li.cardTurned");
    for (i = 0; i < turned.length; i++) {
        turned[i].className = "card";
    }
    console.log("No Match! Hiding both cards!");
    openCards.length = 0;
    score -= 75;
}

// count the moves
function countMove() {
    moves++;
    document.getElementById("moveCounter").innerHTML = moves;
    document.getElementById("pairCounter").innerHTML = pairs;
    updateRating();
}

// lazy reload solution :)
function resetGame() {
    window.location.reload();
}

// calculate stars depending on score.
function updateRating() {
    if (score >= 1000) {
        stars = 3;
    } else if (score <= 999 && score >= 500) {
        stars = 2;
    } else {
        stars = 1;
    }
    genStars(stars);
}

// generate stars html
function genStars(numstar) {
    rating = "";
    for (i = 0; i < numstar; i++) {
        rating += "<i class='fa fa-star'></i>"
    }
    document.getElementById("starRating").innerHTML = rating;
}

// start/stop background music
function playMusic(status) {
    if (status === "start") {
        document.getElementById("bgm").play();
    } else if (status === "stop") {
        document.getElementById("bgm").pause();
    }
}

// start timer function. shows seconds into the game
function startTimer(){
  var theTimer = setInterval(function(){
    time++;
    document.getElementById("seconds-counter").innerHTML = time;
    },1000);
}

// stops the timer !
function stopTimer(){
  clearInterval(theTimer);
}

// checks if all conditions to win are met !
function checkWin(){
  if (pairs === totalPairs) {
    document.getElementById("mainDeck").innerHTML = "<div class='alert alert-light col' role='alert'>Congrats! You won the game! <br> Score : "+ score +"</h1> <br>Your time was : "+ time +" seconds.";
    stopTimer()
  }
}

// starts the game when player clicks on start
function startGame(){

  let theButton = document.getElementById("startButton");
  theButton.parentNode.removeChild(theButton);
  genDeck();
  startTimer();
}
