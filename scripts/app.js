const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const updateUI = (data) => {
  //without destructuring
  //   console.log(data);
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  //destructure properties
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `
   <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;c</span>
          </div>
  `;
  //update the night &day images and icons images

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //Ternary operator example
  //   const result = true ? 'value 1' : 'value 2';
  //   console.log(result);

  let timeSrc = null; //source for the img day and night
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
  time.setAttribute("src", timeSrc); //Ternary operator used instead

  // Ternary operator method
  //   let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset(); //to reset the form after sumbitting

  //update the UI with the new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
