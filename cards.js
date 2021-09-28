"use strict"

const BASE_URL = "http://deckofcardsapi.com/api/deck";
let DECK_ID;

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
    return card
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


/** Get a new card on click. */
async function getNewCardOnClick(deckId) {
    const newCard = await drawACard(deckId)

    createAndAppendCardHtml(newCard);
}

/** Create the html for a given card */
function createAndAppendCardHtml(card) {

    let $html = $(`<img src=${card.image}>`)

    $("#cards-area").append($html);
}


/** Main function. Gets a new deck. Creates event listener.*/
async function main() {
    const deckId = await getADeck();

    $("#get-a-card").on("click",getNewCardOnClick.bind(null,deckId))
}

main();

//Further study: Validate if the deck still has cards left