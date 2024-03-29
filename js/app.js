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
  currRoundScore: 0,
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
  currRoundScore: 0,
  scoreTotal: 0
}

/*------------------------ Cached Element References ------------------------*/
let startBtnEl = document.getElementById("start-button")
let resetBtnEl = document.getElementById("reset-button")
resetBtnEl.style.display = 'none'
let instructionsBtnEl = document.getElementById("instructions")
let titleEl = document.querySelector('.title')

// let turnEl = document.querySelector('.turn')
let roundEl = document.querySelector('.round')
let playerScoreEl = document.querySelector('.player-score')
let computerScoreEl = document.querySelector('.computer-score')
let messageEl = document.querySelector('.message')

let fieldEl = document.querySelector(".field-cards")
let playerHandEl = document.querySelector(".player-hand")
let computerHandEl = document.querySelector(".computer-hand")
let dealerDeckEl = document.querySelector(".dealer-deck")
let briscolaSuitEl = document.querySelector(".briscola-suit")

/*----------------------------- Event Listeners -----------------------------*/
startBtnEl.addEventListener('click', init)
resetBtnEl.addEventListener('click', resetGame)

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
  startBtnEl.style.display = 'none'
  resetBtnEl.style.display = resetBtnEl.style.display === 'none' ? '' : 'none'
  titleEl.style.color = 'black'

  if (round === 1){
    turn = -1
  }
  render()
}

// S8: Create functions to render player, computer and field hands ref Ian's function on lines 488 - 512
function render(){
  roundEl.innerHTML = `Round: ${round}`
  playerScoreEl.innerHTML = `Your score: ${player.scoreTotal}`
  computerScoreEl.innerHTML = `Opponent's: ${computer.scoreTotal}`
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
    setBriscolaCard()
  }, 3500)
  setTimeout(() => {
    renderFieldCards()
  }, 3000)
  // render field cards
  // check for winner
}

function setBriscolaCard(){
  briscolaSuit = deck.setBriscolaSuit()
  let theBriscolaCard = document.createElement('div')
  theBriscolaCard.id = briscolaSuit
  theBriscolaCard.className = "briscola-card"
  briscolaSuitEl.appendChild(theBriscolaCard)
  deck.deck.pop()
}

// S9: Render the three (upside down later) opponent cards
function renderComputerCards(){
  computerHandEl.innerHTML = ""
  computer.hand.forEach((card) => {
    let computerCard = document.createElement('div')
    computerCard.className = card
    computerCard.id = card
    // computerCard.textContent = `${card}`
    computerHandEl.appendChild(computerCard)
  })
  if(round === 1){
    setTimeout(() => {
      if(!firstCardRendered){
        firstCardRendered = true
        let computerDealsFirstCard = computer.hand.pop()
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
    playerHandEl.appendChild(playerCard)
    playerCard.addEventListener('click', putPlayerCardDown)
  })
}

// S11: Create a function to render the four field cards
function renderFieldCards(){
  fieldEl.innerHTML = ""
  field.forEach((card) => {
    let fieldCard = document.createElement('div')
    fieldCard.className = card
    fieldCard.id = card
    fieldEl.appendChild(fieldCard)
    //! Eventually create a function for the computer to match cards on its own.
  })
}

// S12: Create a function to push user cards to field
function putPlayerCardDown(event){
  let selectedCard = event.target
  let cardSelectedId = event.target.id
  let computerCardSelected
  console.log(selectedCard.id)
  field.push(cardSelectedId)
  renderFieldCards()
  player.hand = player.hand.filter((card) => card !== cardSelectedId)
  renderPlayerCards()
  
  // push selected card to field - USE SET TIME OUT FOR DELAY
  // call function to compare cards' suits and values
  compareCardsAndSuits(selectedCard)
}

// S13: Create the function invoked in the putPlayerCardDown function 
function compareCardsAndSuits(selectedCard){
  // S13a: Access the card values
  // use regex to split any card's data
  const regex = /([a-z]+)|([FCR][a-z]+)|(\d+)|([A-Z][a-z]*)/g
  // take the selected card and split its data
  let selectedCardData = selectedCard.id.match(regex)
  // take the field card and split its data
  let fieldCardData = field[0].match(regex)
  // take the currentBriscola suit and split its data
  let currentBriscolaCard = briscolaSuit.match(regex)
  // if the selected card's suit is equal the current briscola suit and current field card's suit
  if(selectedCardData[0] === currentBriscolaCard[0] && selectedCardData[0] === fieldCardData[0]){
    // create another if to check to see if the current card's number value is greater than the other
    if(selectedCardData[selectedCardData.length - 1] > fieldCardData[fieldCardData.length - 1] && selectedCardData[selectedCardData.length - 1] === "01" || selectedCardData[selectedCardData.length - 1] === "03"){
      console.log("My card matches the briscola and field suit and is worth more")
      // listing cards from highest value to lowest in points:
    }
  }
  // access by field cards instead.
  if(selectedCardData[0] === currentBriscolaCard[0] && selectedCardData[0] !== fieldCardData[0]){
    // create another if to check to see if the current card's number value is greater than the other
      console.log("My card doesn't match the field's suit but matches the briscola's, points for me!")
  }
  if(selectedCardData[0] !== currentBriscolaCard[0] && selectedCardData[0] !== fieldCardData[0]){
    // create another if to check to see if the current card's number value is greater than the other
      console.log("My card suit doesn't match the Briscola suit or the field card suit, no points for me. Computer's turn!")
  }
  if(selectedCardData[0] == currentBriscolaCard[0] && selectedCardData[0] == fieldCardData[0] && parseInt(selectedCardData[selectedCardData.length - 1]) > parseInt(fieldCardData[fieldCardData.length - 1])){
    // create another if to check to see if the current card's number value is greater than the other
    console.log(parseInt(selectedCardData[selectedCardData.length - 1]))
    console.log(parseInt(fieldCardData[fieldCardData.length - 1]))
    console.log("My card suit matches the briscola and the field suit, but my card's value is higher than the field's. Points for me, my turn still. ")
  }
  if(selectedCardData[0] !== currentBriscolaCard[0] && selectedCardData[0] == fieldCardData[0] && parseInt(selectedCardData[selectedCardData.length - 1]) > parseInt(fieldCardData[fieldCardData.length - 1])){
    // create another if to check to see if the current card's number value is greater than the other
    console.log(parseInt(selectedCardData[selectedCardData.length - 1]))
    console.log(parseInt(fieldCardData[fieldCardData.length - 1]))
    console.log("My card suit doesn't match the briscola, but matches the field suit and my card's value is higher than the field's. Points for me, my turn still. ")
  }
  if(selectedCardData[0] !== currentBriscolaCard[0] && selectedCardData[0] == fieldCardData[0] && parseInt(selectedCardData[selectedCardData.length - 1]) < parseInt(fieldCardData[fieldCardData.length - 1])){
    // create another if to check to see if the current card's number value is greater than the other
    console.log(parseInt(selectedCardData[selectedCardData.length - 1]))
    console.log(parseInt(fieldCardData[fieldCardData.length - 1]))
    console.log("My card suit doesn't match the briscola, but matches the field suit and their card's value is higher than mine. Points for them, computer's turn. ")
  }
}

// create a function called awardPoints that will check the current turn and award the correct points according to the last numbers of the card data array passed as a parameter to the player or the computer
function awardPointsTo(){
  // create two variables to track the player's current field card and the computer's current field card
  let currPlayerFieldCard
  let currComputerFieldCard
  // if the current turn is the computer's, the first card in the field array is theirs, 
  // else it's the player's card.

  // listing cards from highest value to lowest in points:
  // if(selectedCardData[selectedCardData.length -1] === "01"){
  //   01 - ace - 11 points
  //   player.scoreTotal += 11 
  // } else if(selectedCardData[selectedCardData.length -1] === "03"){
  //   03 - three - 10 points
  //   player.scoreTotal += 10
  // } else if(selectedCardData[selectedCardData.length -1] === "10"){
  //   03 - three - 10 points
  //   player.scoreTotal += 10
  // } else if(selectedCardData[selectedCardData.length -1] === "09"){
  //   03 - three - 10 points
  //   player.scoreTotal += 10
  // } else if(selectedCardData[selectedCardData.length -1] === "08"){
  //   03 - three - 10 points
  //   player.scoreTotal += 10
  // }
}

// create a function called dealNewCard, which is called after every comparison that will deal a card after the player and opponent places a card down and have it render a new card on their decks

// create a function called checkForWinner, place it in the putPlayerCardDown function, check to see if there are any cards left in the deck, in the player's or computer's hand, or the field, if there's none, compare points and check who the winner is.

// Computer function EASY mode
  // select any random card and push to the field

// Computer function MEDIUM mode
  // 



function resetGame(){
  fieldEl.innerHTML = ""
  briscolaSuitEl.innerHTML = ""
  computerHandEl.innerHTML = ""
  playerHandEl.innerHTML = ""
  init()
  resetBtnEl.style.display = resetBtnEl.style.display === 'none' ? '' : 'none'
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
