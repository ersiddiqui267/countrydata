`use strict`;

// Elements
const select = document.querySelector(`.country-select`);
const flag = document.querySelector(`.flag`);
const countryName = document.querySelector(`.name`);
const capital = document.querySelector(`.capital`);
const currency = document.querySelector(`.currency`);
const population = document.querySelector(`.population`);
const mapLink = document.querySelector(`.card-link`);
const countryCard = document.querySelector(`.country-card`);
const errorMessage = document.querySelector(`.error-message`);

// Class
class App {
  constructor() {
    select.addEventListener(`change`, this._loadCountry.bind(this));
    flag.addEventListener(`load`, function () {
      countryCard.classList.remove(`d-none`);
    });
  }

  async _loadCountry() {
    try {
      errorMessage.classList.add(`d-none`);
      countryCard.classList.add(`d-none`);

      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${select.value}`
      );

      if (!response.ok) throw new Error(`Country not found!`);

      const [data] = await response.json();

      flag.src = `${data.flags.png}`;
      countryName.textContent = `${data.name.common}`;
      capital.textContent = `Capital: ${
        data.capital?.[0] ?? `No Capital Info`
      }`;

      if (data.currencies) {
        const sym = Object.values(data.currencies)[0].symbol ?? ``;
        const curr = Object.values(data.currencies)[0].name;
        currency.textContent = `Currency 💰: ${sym} ${curr}`;
      } else {
        currency.textContent = `Currency 💰: No Currency Info`;
      }

      population.textContent = `Population 👥: ${(
        data.population / 1000000
      ).toFixed(3)} M`;

      mapLink.href = `${data.maps.googleMaps}`;
    } catch (err) {
      console.error(err);
      errorMessage.textContent = `${err.message}`;
      countryCard.classList.add(`d-none`);
      errorMessage.classList.remove(`d-none`);
    }
  }
}

const app = new App();
