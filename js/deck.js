// S2 - Set up the deck class with an emptry deck as the the only property.
// Inspired by Ian's Hanafuda Deck class. Thank you Ian!
class Deck {
  constructor(){
    this.deck = []
  }
  // S3 - Stub up reset method to create cards and push to new deck
  reset(){
    this.deck = []
    const suits = ['clubs', 'spades', 'coins', 'cups']
    const suitsValues = ['01', '02', '03', '04', '05', '06', '07']
    const royaltyValues = ['Fante08', 'Cavallo09', 'Re10']

    for (let suit in suits){
      for (let suitValue in suitsValues){
        this.deck.push(`${suits[suit]}${suitsValues[suitValue]}`)
      }
      
      for (let royalValue in royaltyValues){
        this.deck.push(`${suits[suit]}${royaltyValues[royalValue]}`)
      }
    }
  }
}

export default Deck;