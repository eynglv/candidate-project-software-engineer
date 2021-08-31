import React from 'react';
import axios from 'axios';

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
    this.ids = {};
    this.royals = { J: '11', Q: '12', K: '13', A: '14' };
  }
  startGame() {
    axios
      .get(`api/players/${this.playerOne}`)
      .then((res) => {
        if (!res.data) {
          axios.post('api/players', { name: this.playerOne }).then((res) => {
            this.ids[this.playerOne] = res.data.id;
          });
        } else {
          this.ids[this.playerOne] = res.data.id;
        }
      })
      .then(() =>
        axios.get(`api/players/${this.playerTwo}`).then((res) => {
          if (!res.data) {
            axios
              .post('api/players', { name: this.playerTwo })
              .then((res) => (this.ids[this.playerTwo] = res.data.id));
          } else {
            this.ids[this.playerTwo] = res.data.id;
          }
        })
      )
      .finally(() => {
        axios.post('api/games').then((res) => {
          this.ids['gameId'] = res.data.id;
          let deck = new Deck();
          deck.deal(this.playerOneHand, this.playerTwoHand);
          this.playGame();
        });
      });
  }

  playGame() {
    while (this.playerOneHand.length && this.playerTwoHand.length) {
      this.playHand();
    }
    const winner =
      this.playerOneHand.length === 0 ? this.playerTwo : this.playerOne;
    axios
      .put(`api/games/${this.ids.gameId}`)
      .then(console.log('game has concluded'));
    axios.put(`api/players/${winner}`).then((res) => console.log(res.data));
    axios
      .post(`api/games/result/${this.ids.gameId}/${this.ids[winner]}`)
      .then((res) => console.log('result', res.data));
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
      if (losingHand === this.playerOneHand) {
        this.playerOneHand = [];
      } else {
        this.playerTwoHand = [];
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
  let cp1;
  let cp2;
  while (cp1 === cp2) {
    cp1 = prompt('Please Enter A Name', 'BOB');
    cp2 = prompt('Please enter another name', 'MAY');
  }
  const game = new WarGame(cp1, cp2);
  game.startGame();
};

const Game = () => {
  return (
    <div>
      <h1>This is a Game of War</h1>
      <button onClick={startGame}>Play Game!</button>
    </div>
  );
};

export default Game;
