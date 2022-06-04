const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const Weather = await getWeather(cityDetails.Key);
  return { cityDetails, Weather };
};

const updateUI = (data) => {
  if (card.classList.contains("d-none")) card.classList.remove("d-none");

  const { cityDetails, Weather } = data;

  details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
                        <div class="my-3">${Weather.WeatherText}</div>
                        <div class="display-4 my-4">
                        <span>${Weather.Temperature.Metric.Value}</span>
                        <span>&deg;C</span>
                        </div>`;

  if (Weather.IsDayTime) time.src = "imgs/day.svg";
  else {
    time.src = "imgs/night.svg";
  }
  icon.src = `icons/${Weather.WeatherIcon}.svg`;
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
