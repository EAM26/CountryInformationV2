import axios from "axios";

const singleCountry = document.getElementById("single-country")
const countryForm = document.getElementById("country-form");

countryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchSingleCountry(document.getElementById("input-country").value);
})

async function fetchSingleCountry(searchCountry) {
    let countryInfo = "";
    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${searchCountry}?fields=region,name,flags,population,capital,currencies`);
        console.log(response.data)
        const {region, name: nameCountry, flags: {png: flag}, population: amount, capital, currencies} = response.data[0];
        countryInfo += `<img class="single-flag" src="${flag}" alt=""><span class="single-big-name">${nameCountry}</span>
                        <div class="info-text"><p>${nameCountry} is situated in ${region}. It has a population of ${amount} people.</p>
                        <p>The capital is ${capital} and you can pay with ${getAllCurrenciesMessage(currencies)}</p>
                        <p></p>
                        </div>
                        `
    } catch (e) {
        console.log(`Error in code ${e}`);
    }
    singleCountry.innerHTML = countryInfo;
}

function getAllCurrenciesMessage(currencies) {
    // const currenciesArray = Object.keys(currencies);
    let message = `${currencies[0].name}'s`;
    for (let i = 1; i < currencies.length; i++) {
        message += ` and ${currencies[i].name}'s`
    }
    return message;
}
