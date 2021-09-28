"use strict"

const BASE_URL = "http://deckofcardsapi.com/api/deck";

/** make request to cards api and get a deck of cards, return deck id */
async function getADeck() {
    let resp = await axios({
        url: `${BASE_URL}/new/shuffle/`,
        method: "get",
        params: {
            deck_count: 1
        }
    })
    return resp.data.deck_id;
}
/** make request to cards api to draw one card from given deck, return card obj with value and suit */
async function drawACard(deckId) {
    let resp = await axios({
        url: `${BASE_URL}/${deckId}/draw/`,
        method: "get",
        params: {
            count: 1
        }
    })
    let card = resp.data.cards[0];
    return { value: card.value, suit: card.suit }
}

/** get a fresh deck and draw one card, console.log card info */
async function getCardFromNewDeck() {
    let deckId = await getADeck();
    let card = await drawACard(deckId);
    console.log(`${card.value} of ${card.suit}`)
}

/** get a fresh deck and draw two cards, console.log cards info */
async function getTwoCardsFromNewDeck() {
    let deckId = await getADeck();
    let card1 = await drawACard(deckId);
    let card2 = await drawACard(deckId);
    console.log(`${card1.value} of ${card1.suit}, ${card2.value} of ${card2.suit}`)
}