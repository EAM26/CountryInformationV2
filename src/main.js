import axios from "axios";




const countriesList = document.getElementById("countries-list");
const singleCountry = document.getElementById("single-country")

async function fetchSingleCountry() {
    let countryInfo = "";
    try {
        const name = "korea";
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        console.log(response.data[0]);
        const {region, name: {common: nameCountry}, flags: {png: flag}, population: amount, capital, currencies} = response.data[0];
        console.log(region)
        countryInfo += `<div class="info-block"><img src="${flag}" alt=""><span>${nameCountry}</span>
                        <p>${nameCountry} is situated in ${region}. It has a population of ${amount} people.</p>
                        <p>The capital is ${capital} and you can pay with ${currencies.EUR.name}'s</p>
                        <p></p>
                        </div>`
    } catch (e) {
        console.log(`Error in code ${e}`);
    }
    singleCountry.innerHTML = countryInfo;
}

async function fetchCountries() {
    let contentListItem =  "";
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,region");
        const countriesSortedByPopulation = response.data.sort((a, b) => a.population - b.population);

        countriesSortedByPopulation.map((country) => {
            const {region, name: {official: name}, flags: {png: flag}, population: amount} = country;
            const colorClass = getColorByRegion(region);
            contentListItem += `<li><div class="inner-list" ><img class="flag-img" src=${flag} alt="flag of ${name}"><span class='${colorClass} country-name'>${name}</span></div><p>Has a population of ${amount} people</p></li>`
        })

    } catch (e) {
        console.log(`Error in request ${e}`);
    }
    countriesList.innerHTML = contentListItem;
}



function getColorByRegion(region) {
    switch (region) {
        case 'Europe':
            return 'yellow';

        case 'Asia':
            return 'red';
        case 'Americas':
            return 'green';
        case 'Africa':
            return 'blue';
        case 'Oceania':
            return 'purple';
        default:
        return 'gray';
    }
}

// fetchCountries();
fetchSingleCountry();
