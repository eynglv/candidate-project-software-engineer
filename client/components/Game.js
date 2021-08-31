import React from 'react';

class Deck {
  constructor() {
    this.cards = {
      heart: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      diamond: [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
        'A',
      ],
      spade: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      club: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    };
  }
  deal(handOne, handTwo) {
    const shuffledCards = this.shuffle();
    for (let i = 0; i < shuffledCards.length; i++) {
      if (i % 2 === 0) {
        handOne.push(shuffledCards[i]);
      } else {
        handTwo.push(shuffledCards[i]);
      }
    }
    return handOne, handTwo;
  }

  shuffle() {
    const allCards = this.buildDeck();
    const cardLength = allCards.length;
    for (let i = cardLength - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = allCards[i];
      allCards[i] = allCards[j];
      allCards[j] = temp;
    }
    return allCards;
  }

  buildDeck() {
    let allCards = [];
    for (const [key, value] of Object.entries(this.cards)) {
      const cardsFromSuit = value.map((num) => [key, num]);
      allCards.push(...cardsFromSuit);
    }
    return allCards;
  }
}

class WarGame {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOneHand = [];
    this.playerTwoHand = [];
    this.royals = { J: '11', Q: '12', K: '13', A: '14' };
  }
  startGame() {
    let deck = new Deck();
    deck.deal(this.playerOneHand, this.playerTwoHand);
    this.playGame();
  }

  playGame() {
    while (this.playerOneHand.length && this.playerTwoHand.length) {
      this.playHand();
    }

    const winner =
      this.playerOneHand.length === 0 ? this.playerTwo : this.playerOne;
    // const losingHand =
    //   winner === this.playerTwo ? this.playerOneHand : this.playerTwoHand;
    // const winningHand =
    //   winner === this.playerTwo
    //     ? this.playerTwoHand
    //     : this.playerOneHand;
    return winner;
  }
  playHand() {
    /* card: [suit <string> , num <string> ] */
    let cardOne = this.playerOneHand.shift();
    let cardTwo = this.playerTwoHand.shift();
    let valueOne = this.royals.hasOwnProperty(cardOne[1])
      ? this.royals[cardOne[1]]
      : cardOne[1];
    let valueTwo = this.royals.hasOwnProperty(cardTwo[1])
      ? this.royals[cardTwo[1]]
      : cardTwo[1];
    valueOne = parseInt(valueOne);
    valueTwo = parseInt(valueTwo);
    if (valueOne < valueTwo) {
      this.playerTwoHand.push(cardOne, cardTwo);
    } else if (valueOne > valueTwo) {
      this.playerOneHand.push(cardTwo, cardOne);
    } else {
      const playedCards = [cardOne, cardTwo];
      this.playWar(playedCards);
    }
  }

  playWar(playedCards) {
    let cardOne;
    let cardTwo;
    if (this.playerOneHand.length < 2 || this.playerTwoHand.length < 2) {
      let losingHand =
        this.playerOneHand.length < 2 ? this.playerOneHand : this.playerTwoHand;
      let winningHand =
        this.playerOneHand === losingHand
          ? this.playerTwoHand
          : this.playerOneHand;
      winningHand.push(...playedCards, ...losingHand);
      if (losingHand === this.playerOneHand){
          this.playerOneHand = []
      } else {
          this.playerTwoHand = []
      }
      return;
    }
    for (let i = 0; i < 2; i++) {
      cardOne = this.playerOneHand.shift();
      cardTwo = this.playerTwoHand.shift();
      playedCards.push(cardOne, cardTwo);
    }
    let valueOne = this.royals.hasOwnProperty(cardOne[1])
      ? this.royals[cardOne[1]]
      : cardOne[1];
    let valueTwo = this.royals.hasOwnProperty(cardTwo[1])
      ? this.royals[cardTwo[1]]
      : cardTwo[1];
    valueOne = parseInt(valueOne);
    valueTwo = parseInt(valueTwo);
    if (valueOne < valueTwo) {
      this.playerTwoHand.push(...playedCards);
    } else if (valueTwo < valueOne) {
      this.playerOneHand.push(...playedCards);
    } else {
      this.playWar(playedCards);
    }
  }
}

const startGame = () => {
  const game = new WarGame('BOB', 'MAY');
  game.startGame();
};

const Game = () => {
  return (
    <div>
      <h1>Play Game</h1>
      <button onClick={startGame}>Blah</button>
    </div>
  );
};

export default Game;
