"use strict"
////////////////////////////////////////////////////////////////////////////////
////AXIOS FUNCTIONS

/** Function calls Numbers API with one number and returns 1 fact about number */
async function getNumberFact(num) {
    let resp = await axios.get(`http://numbersapi.com/${num}?json`);
    return resp.data.text;
}


/** Function calls Numbers API with list of numbers and returns facts
 *  about numbers*/
async function getMultipleNumberFacts(...nums) {
    console.log(nums); // getting an array but no need to spread in axios request?
    let resp = await axios.get(`http://numbersapi.com/${nums}?json`);
    return resp.data;
}

/** Function calls Numbers API with one number and returns 4 facts
 *  about number*/
async function getFourFacts(num) {

    let resp1 = getNumberFact(num);
    let resp2 = getNumberFact(num);
    let resp3 = getNumberFact(num);
    let resp4 = getNumberFact(num);

    let result = await Promise.all([resp1, resp2, resp3, resp4]);
    return result;
}

////////////////////////////////////////////////////////////////////////////////
////EVENT FUNCTIONS
/** Function gets fact about number provided in form and displays fact about
 *  number in the HTML.
*/
async function getAndShowOneFactOneNumber(evt) {
    evt.preventDefault()
    $("#results").empty()

    let requestedNumber = $("#number-one-fact").val()
    let fact = await getNumberFact(requestedNumber);
    let $html = $(`<p>${fact}</p>`)

    $("#results").append($html)
}


/** Function gets facts about numbers provided in form and displays facts about
 *  numbers in the HTML.*/
async function getAndShowManyFactsManyNumbers(evt) {
    evt.preventDefault()
    $("#results").empty()

    let requestedNumbers = $("#many-numbers-many-facts")
        .val()
        .split(',')

    let factList = await getMultipleNumberFacts(...requestedNumbers);

    for (let num in factList) {
        let $html = $(`<p>${factList[num]}</p>`)
        $("#results").append($html)
    }
}


/** Function gets 4 facts about number provided in form and displays facts about
 *  number in the HTML.*/
async function getAndShowOneNumberManyFacts(evt) {
    evt.preventDefault()
    $("#results").empty()

    let requestedNumber = $("#one-number-many-facts").val()
    let factList = await getFourFacts(requestedNumber);

    for (let num in factList) {
        let $html = $(`<p>${factList[num]}</p>`)
        $("#results").append($html)
    }
}

//Further study: Helper Function to validate input
//Try:
// int(val)
//Except:
// Print error

/** Event listeners. */
$("#one-number-fact-form").on("submit", getAndShowOneFactOneNumber)
$("#multiple-numbers-fact-form").on("submit", getAndShowManyFactsManyNumbers)
$("#one-number-multiple-facts-form").on("submit", getAndShowOneNumberManyFacts)