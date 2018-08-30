/*
 * Create a list that holds all of your cards
 test
 */
let icons = [
              "fa-diamond", "fa-paper-plane", "fa-anchor",
              "fa-bolt", "fa-cube", "fa-bicycle",
              "fa-bomb", "fa-leaf", "fa-diamond",
              "fa-paper-plane", "fa-anchor",
              "fa-bolt", "fa-cube", "fa-bicycle",
              "fa-bomb", "fa-leaf"
              ];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
 *Generate Deck
*/

function genDeck(){
  for (let i = 0; i < icons.length; i++){
    let card = document.createElement('li');
    card.className = "card";
    card.id = "card_" + i;
    deck.appendChild(card);
    card.innerHTML = '<i class="fa ' + icons[i] + '"></i>' ;
    card.addEventListener("click", this.showCard, false);
    console.log(i);
  }
  allCards = document.getElementsByClassName('card');


}


genDeck();

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

 let openCards = [];
 let lockedCards = [];


//shows the clicked cards and contains logic for comparing the two and acting accordingly

function showCard(id){
  clickedCard = event.target.id;
  cardType = document.getElementById(clickedCard).children;
  document.getElementById(clickedCard).className = "card open show unlocked";

  //Control if list has items. if true , execute controlMatch()
  if (openCards.length == 1) {
      controlMatch(cardType[0].classList[1]);
  } else {
      addToOpenList(cardType[0].classList[1]);

  }

}

// Adds clicked card to list of "open" cards

function addToOpenList(cardID){
  openCards.push(cardID);
  console.log("added to open card list :" + openCards);

}

// Controls for duplicates in open card list.

function controlMatch(theCard){
  result = openCards.includes(theCard);
  if (result == true){
    lockCards(openCards);
    openCards = [];
  } else {
    hideCards();
  }
  console.log(result);
}

function lockCards(list){

  console.log("Locking "+ openCards);
  lockedCards.push(openCards);

}

function hideCards(){
  turned = document.querySelectorAll("li.unlocked");
  for (i = 0; i < turned.length; i++){
    turned[i].className = "card";
  }
  console.log("No Match! Hiding both cards!");
  openCards.length = 0;
}
