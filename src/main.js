import axios from "axios";


// get values from one country
// create html with list
// create sentence

const countriesList = document.getElementById("countries-list");

async function getCountries() {
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

getCountries();

