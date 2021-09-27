async function getNumberFact(num) {
    let resp = await axios.get(`http://numbersapi.com/${num}?json`);
    return resp.data.text;
}

async function getMultipleNumberFacts(...nums) {
    console.log(nums); // getting an array but no need to spread in axios request?
    let resp = await axios.get(`http://numbersapi.com/${nums}?json`);
    return resp.data;
}

async function getFourFacts(num) {

    let resp1 = getNumberFact(num);
    let resp2 = getNumberFact(num);
    let resp3 = getNumberFact(num);
    let resp4 = getNumberFact(num);

    let result = await Promise.all([resp1, resp2, resp3, resp4]);
    return result;
}