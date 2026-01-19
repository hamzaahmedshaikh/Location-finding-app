let btn = document.querySelector(".btn");
let img = document.querySelector(".card-img-top");
let title = document.querySelector(".card-title");
let cardText = document.querySelector(".card-text");

let showData = (data) => {
  let countryData = data[0];
  let flags = countryData.flags;
  let name = countryData.name;

  img.src = flags.png;
  cardText.innerText = flags.alt;
  title.innerText = name.common;
};

let getCountryDetails = async (country) => {
  let response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  let data = await response.json();
  showData(data);
};

let getDetails = (latitude, longitude) => {
  fetch(
    `https://geocode.xyz/${latitude},${longitude}?geoit=JSON&auth=108358676102951920793x73268`
  )
    .then((res) => res.json())
    .then((result) => {
      let country = result.country;
      getCountryDetails(country);
    });
};

let getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    function (success) {
      let latitude = success.coords.latitude;
      let longitude = success.coords.longitude;
      getDetails(latitude, longitude);
    },
    function (error) {
      console.log(error);
    }
  );
};

getLocation();
btn.addEventListener("click", getLocation);
