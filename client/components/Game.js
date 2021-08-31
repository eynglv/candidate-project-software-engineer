import React from 'react';

class Deck {
  constructor() {
    this.cards = {
      heart: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      diamond: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      spade: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      club: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    };
  }
  deal(handOne, handTwo) { 
      //shuffle first
      //split the deck (randomly)
  }
  shuffle() {
      // call build deck 
      // shufffle big ass array
  }
  buildDeck(){
      //create big ass array
  }
}

class Game {
    constructor(playerOne, playerTwo){
        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.playerOneHand = []
        this.playerTwoHand = []
    }
    startGame(){
        let deck = new Deck()
        deck.deal(this.playerOneHand, this.playerTwoHand)
    }
    playGame(){
        //runs playHand while both hands are not empty
        // when someone's hand is empty, update winner in the backend 
    }
    playHand(){
        //plays from top of the players queue
        //one play
        //compare cards
        // play War if tie
        // append won cards to winner's queue
    }
    playWar(){
        // array of played cards
    }

}

const Game = () => {
  return (
    <div>
      <h1>where da game at</h1>
    </div>
  );
};

export default Game;
