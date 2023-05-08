import axios from "axios";

const singleCountry = document.getElementById("single-country")
const countryForm = document.getElementById("country-form");
const inputSearch = document.getElementById("input-country")

countryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchSingleCountry(inputSearch.value);
})

async function fetchSingleCountry(searchCountry) {
    let countryInfo = "";
    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${searchCountry}?fields=region,name,flags,population,capital,currencies,languages`);
        console.log(response.data)
        const {
            region,
            name: nameCountry,
            flags: {png: flag},
            population: amount,
            capital,
            currencies,
            languages
        } = response.data[0];
        countryInfo += `<img class="single-flag" src="${flag}" alt=""><span class="single-big-name">${nameCountry}</span>
                        <div class="info-text"><p>${nameCountry} is situated in ${region}. It has a population of ${amount} people.</p>
                        <p>The capital is ${capital} and you can pay with ${getAllCurrenciesMessage(currencies)}</p>
                        <p>The speak ${getAllLanguagesMessage(languages)}</p>
                        </div>
                        `
    } catch (e) {
        if(e.response.status === 404) {
            countryInfo += `<p>No country found with name: ${searchCountry}</p>`
        }


    }
    singleCountry.innerHTML = countryInfo;
    inputSearch.value = "";
}

function getAllCurrenciesMessage(currencies) {
    let message = `${currencies[0].name}'s`;
    for (let i = 1; i < currencies.length; i++) {
        message += ` and ${currencies[i].name}'s`
    }
    return message;
}

function getAllLanguagesMessage(languages) {
    let message = `${languages[0].name}`;
    for (let i = 1; i < languages.length; i++) {
        message += ` and ${languages[i].name}`
    }
    return message;
}


