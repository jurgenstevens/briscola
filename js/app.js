import Deck from "./deck.js"
/*---------------------------- Variables (state) ----------------------------*/
// S4: Set up the necessary variables
// S4a: Set up the visibile variables like deck, field, turn, round, winner
let deck, field, briscolaSuit, turn, round, roundWinner, firstCardRendered, gameWinner

// S4a: Set up the player with its necessary properties
let player = {
  playerName: "Player",
  hand: [],
  selectedCard: null,
  selectedCardIdx: null,
  collectedCards: [],
  roundsWon: 0,
  scoreTotal: 0
}

// S4b: Set up the computer with its necessary properties
let computer = {
  playerName: "Computer",
  hand: [],
  selectedCard: null,
  selectedCardIdx: null,
  collectedCards: [],
  roundsWon: 0,
  scoreTotal: 0
}

/*------------------------ Cached Element References ------------------------*/
let startBtnEl = document.getElementById("start-button")
let resetBtnEl = document.getElementById("reset-button")
let instructionsBtnEl = document.getElementById("instructions")

let turnEl = document.querySelector('.turn')
let roundEl = document.querySelector('.round')
let messageEl = document.querySelector('.message')

let fieldEl = document.querySelector(".field-cards")
let playerHandEl = document.querySelector(".player-hand")
let computerHandEl = document.querySelector(".computer-hand")
let dealerDeckEl = document.querySelector(".dealer-deck")
let briscolaSuitEl = document.querySelector(".briscola-suit")

/*----------------------------- Event Listeners -----------------------------*/
startBtnEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

// S7 - Create a new deck and shuffle it by initializing the game and setting the turn and round to 1
function init(){
  round = 1
  roundWinner = null
  firstCardRendered = false
  deck = new Deck()
  deck.reset()
  deck.shuffle()
  field = []
  player.hand = deck.dealPlayer()
  computer.hand = deck.dealComputer()
  if (round === 1){
    turn = -1
  }
  render()
}

// S8: Create functions to render player, computer and field hands ref Ian's function on lines 488 - 512
function render(){
  roundEl.innerHTML = `Round: ${round}`
  // render computer cards
  setTimeout(() => {
    renderComputerCards()
  }, 1500)
  // render player cards
  setTimeout(() => {
    renderPlayerCards()
  }, 2000)
  // use setTimeout to push the last card in the deck after dealing to be the Briscola suit
  setTimeout(() => {
    // set the briscola suit to the suit of the last card in the dealer's deck after dealing to the computer and player
    briscolaSuit = deck.setBriscolaSuit()
    deck.deck.pop()
    briscolaSuitEl.innerHTML = `Current round suit: ${briscolaSuit}`
  }, 2500)
  setTimeout(() => {
    renderFieldCards()
  }, 3000)
  // render field cards
  // check for winner
}

// S9: Render the three (upside down later) opponent cards
function renderComputerCards(){
  computerHandEl.innerHTML = ""
  computer.hand.forEach((card) => {
    let computerCard = document.createElement('div')
    computerCard.className = card
    computerCard.id = card
    computerCard.textContent = `${card}`
    computerHandEl.appendChild(computerCard)
  })
  if(round === 1){
    setTimeout(() => {
      if(!firstCardRendered){
        firstCardRendered = true
        let computerDealsFirstCard = computer.hand.pop()
        console.log(computer.hand)
        field.push(computerDealsFirstCard)
        renderComputerCards()
      }
    }, 1000)
  }
}

// S10: Render the three player cards.
function renderPlayerCards(){
  playerHandEl.innerHTML = ""
  player.hand.forEach((card) => {
    let playerCard = document.createElement('div')
    playerCard.className = card
    playerCard.id = card
    playerCard.textContent = `${card}`// => "suit" + "suitValue" 
    playerHandEl.appendChild(playerCard)
  })
}

// S11: Create a function to render the four field cards
function renderFieldCards(){
  fieldEl.innerHTML = ""
  field.forEach((card) => {
    let fieldCard = document.createElement('div')
    fieldCard.className = card
    fieldCard.id = card
    fieldCard.textContent = `${card}`
    fieldEl.appendChild(fieldCard)
    //! Eventually create a function for the computer to match cards on its own.
  })
}























// Step 1 - Define the required variables used to track the state of the game
// ✓ 1a) Use a variable named `deck` to represent the state of the deck.
// ✓ 1b) Use a variable named `players` to represent the state of the players.
// ✓ 1c) Use a variable named `highSuit` to track the high suit card.
// ✓ 1d) Use a variable named `roundWinner` to represent the winner of the current round.
// ✓ 1e) Use a variable named `gameWinner` to represent the winner of the entire game.
// ✓ 1f) Use a variable named `turn` to track whose turn it is.

// Step 2 - Store cached element references.
// ✓ 2a) In a constant called `playerEls`, store the elements representing the players on the page.
// ✓ 2b) In a constant called `messageEl`, store the element that displays the game's status on the page.

// Step 3 - Upon loading, the game state should be initialized, and a function should be called to render this game state.
// ✓ 3a) Create a function called `init`.
// ✓ 3b) Call this `init` function when the start button is clicked.
// 3c) Set the `deck` variable to an array containing a deck of cards.
// 3d) Shuffle the `deck`.
// 3e) Deal cards to players.
// 3f) Set the `highSuit` to the top card of the remaining deck.
// 3g) Set the `roundWinner` to null.
// 3h) Set the `gameWinner` to null.
// 3i) Set `turn` to a random player.
// 3j) Call a function called `render` at the end of the `init` function.

// Step 4 - The state of the game should be rendered to the user
// 4a) Create a function called `render`, then set it aside for now.
// 4b) Create a function called `updatePlayers`.
// 4c) In the `updatePlayers` function, loop over `players` and update the display of each player's cards.
// 4d) Create a function called `updateMessage`.
// 4e) In the `updateMessage` function, render a message based on the current game state.
// 4f) Invoke both the `updatePlayers` and the `updateMessage` functions inside of your `render` function.

// Step 5 - Define the required constants
// 5a) In a constant called `cardValues` define the values of the cards.
// 5b) In a constant called `cardSuits` define the suits of the cards.

// Step 6 - Handle a player playing a card with a `playCard` function
// 6a) Create a function called `playCard` that takes a player index and a card index as parameters.
// 6b) Check if the played card is a valid move.
// 6c) Update the game state based on the played card.
// 6d) Check for the round winner.
// 6e) Check for the game winner.
// 6f) Switch to the next player's turn.
// 6g) Call the `render` function to update the UI.

// Step 7 - Create Reset functionality
// 7a) Add a reset button to the HTML document.
// 7b) Store the new reset button element as a cached element reference in
//     a constant named `resetBtnEl`.
// 7c) Attach an event listener to the `resetBtnEl`. On the `'click'` event
//     it should call the `init` function you created in step 3.
