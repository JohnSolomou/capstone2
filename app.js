// api key :

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
// app data

const weather = {};
weather.temperature = {
  unit: "celsius",
};
// api request
const kelvin = 273;
// api key
const key = "4e64e973592d3b5c38fadf4da403b3d3";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}
// set users position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
// show error when there is an issue with geolocation

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - kelvin);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

// display weather to ui

function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;

  descElement.innerHTML = weather.description;

  locationElement.innerHTML = `${weather.city},${weather.country}`;
}

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit === "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

// recipe api

const submit = document.querySelector(".submit");
const input = document.querySelector(".input");
const newsList = document.querySelector(".news-list");
let topic = "";

newsList.innerHTML = "";

const apiKey = "9051922ae5d94903aa4c1ad16d25086d";
// let topic = input.value;

async function retrieve(topic) {
  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${topic}&apiKey=${apiKey}&cuisine=&fillIngredients=false&addRecipeInformation=true&maxReadyTime=120&ignorePantry=flase&number=20&intolerances=gluten&sourceUrl=http://www.foodista.com`;

  const response = await fetch(url);
  const recipe = await response.json();
  return recipe;
}

submit.addEventListener("click", async (e) => {
  topic = input.value;
  console.log(input.value);
  e.preventDefault();
  var data = await retrieve(topic);

  data.results.forEach((results) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let btn = document.createElement("button");

    // styling
    div.className = "newsdiv";
    img.className = "newsimg";
    btn.className = "btns";

    li.style.width = "300px";
    a.setAttribute("href", results.sourceUrl);
    a.setAttribute("target", "_blank");
    img.setAttribute("src", results.image);

    div.textContent = results.title;

    div.appendChild(a);
    div.prepend(img);
    li.prepend(div);
    btn.textContent = "Get Recipe";
    div.appendChild(btn);
    a.appendChild(btn);
    newsList.appendChild(li);
  });
});

// jquery for autocomplete
$(function () {
  var availableTags = [
    " African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "vietnamese",
  ];

  $("#tags").autocomplete({
    source: availableTags,
  });
});

// random quote generator
let btn = document.getElementById("btn");
let output = document.getElementById("output");
let quotes = [
  "'Learning to season in cooking is like learning to stickhandle in hockey, it's absolutely fundamental.' - Rob Feenie",
  "'If you don't follow your dream, who will?' - Emeril Lagasse",
  "'It's okay to play with your food.' - Emeril Lagasse",
  "'You could probably get through life without knowing how to roast a chicken, but the question is, would you want to?' - Nigella Lawson",
  "'No rules. Don't be afraid to do whatever you want. Cooking doesn't have to have rules. I don't like it that way.' - Masaharu Morimoto",
  "'Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it's how you combine them that sets you apart.' - Wolfgang Puck",
  "  'When you have made as many mistakes as I have then you can be as good as me.' - Wolfgang Puck",
  "'You don't need a silver fork to eat good food.' - Paul Prudhomme",

  "'Remember, it is never the knife's fault.' - Daniel Boulud",

  "'There's no bigger pain anywhere in the world than a vegetarian.' - Gordon Ramsay",

  "'Initially let your food do the talking. You'll be surprised how far you go in a short period of time.' - Gordon Ramsay",

  "'When you're running a restaurant, you have to change with the times; otherwise, the times will change you.' - Gordon Ramsay",

  "'Don't try to be the next Rachael Ray or Bobby Flay, we already have those people. We want someone who is going to make their own mark on Food Network.' - Bobby Flay",

  "'Cooking is a subject you can never know enough about. There is always something new to discover.' - Bobby Flay",

  "'Working in a restaurant means being part of a family, albeit usually a slightly dysfunctional one. Nothing is accomplished independently.' - Joe Bastianich",

  "'I believe it's a cook's moral obligation to add more butter given the chance.' - Michael Ruhlman",

  "'I believe that there is always something new to learn, in fact, that is one of the three reasons that I chose to become a chef, that my education is never over.' - Anne Burrell",
];

btn.addEventListener("click", function () {
  var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  output.innerText = randomQuote;
});

let chefs = [
  {
    name: "Rob Feenie",
    quote:
      "Learning to season in cooking is like learning to stickhandle in hockey, it's absolutely fundamental.",
  },
  {
    name: "Emeril Lagasse",
    quote: "If you don't follow your dream, who will?",
  },
  {
    name: "Emeril Lagasse",
    quote: "It's okay to play with your food.",
    TVShow: "Emeril Live",
  },
  {
    name: "Nigella Lawson",
    quote:
      "You could probably get through life without knowing how to roast a chicken, but the question is, would you want to? ",
  },
  {
    name: " Masaharu Morimoto",
    quote:
      "No rules. Don't be afraid to do whatever you want. Cooking doesn't have to have rules. I don't like it that way.",
  },
  {
    name: "Wolfgang Puck",
    quote:
      "Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it's how you combine them that sets you apart.",
  },
  {
    name: "Wolfgang Puck",
    quote:
      "When you have made as many mistakes as I have then you can be as good as me.",
  },
  {
    name: "Paul Prudhomme",
    quote: "'You don't need a silver fork to eat good food. ",
  },
  {
    name: "Daniel Boulud",
    quote: "Remember, it is never the knife's fault.",
  },
  {
    name: "Gordon Ramsay",
    quote:
      "Initially let your food do the talking. You'll be surprised how far you go in a short period of time. ",
  },
  {
    name: "Gordon Ramsay",
    quote:
      "When you're running a restaurant, you have to change with the times; otherwise, the times will change you. ",
    TVShow: "Kitchen Nightmares",
  },
  {
    name: "Bobby Flay",
    quote:
      "Don't try to be the next Rachael Ray or Bobby Flay, we already have those people. We want someone who is going to make their own mark on Food Network.",
  },
  {
    name: "Bobby Flay",
    quote:
      "Cooking is a subject you can never know enough about. There is always something new to discover.",
  },
];
const listOfTvShows = document.querySelector(".tvList");
const addList = (array, Element) => {
  array.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.TVShow;
    Element.appendChild(li);
  });
};

const filteredArray = chefs.filter((name) => name.TVShow);
addList(filteredArray, listOfTvShows);

// news feed

// const searchForm = document.querySelector(".search");
// const input = document.querySelector(".input");
// const newsList = document.querySelector(".news-list");
// input.value = "";
// searchForm.addEventListener("submit", retrieve);

// function retrieve(e) {
//   // if (input.value == "") {
//   //   alert("Input field is empty! Please add a topic to search for. Thank You.");
//   //   return;
//   // }

//   newsList.innerHTML = "";

//   e.preventDefault();

//   const apiKey = "9051922ae5d94903aa4c1ad16d25086d";
//   let topic = input.value;

//   let url = `https://api.spoonacular.com/recipes/complexSearch?query=${topic}&apiKey=${apiKey}&cuisine=&fillIngredients=false&addRecipeInformation=true&maxReadyTime=120&ignorePantry=flase&number=20&intolerances=gluten&sourceUrl=http://www.foodista.com`;

//   fetch(url)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       data.results.forEach((results) => {
//         let li = document.createElement("li");
//         let a = document.createElement("a");
//         let div = document.createElement("div");
//         let img = document.createElement("img");
//         let btn = document.createElement("button");
//         // let br = document.createElement("br");

//         // styling
//         div.className = "newsdiv";
//         img.className = "newsimg";
//         btn.className = "btns";

//         li.style.width = "300px";
//         a.setAttribute("href", results.sourceUrl);
//         a.setAttribute("target", "_blank");
//         img.setAttribute("src", results.image);

//         div.textContent = results.title;
//         // btn.prepend(br);
//         div.appendChild(a);
//         div.prepend(img);
//         li.prepend(div);
//         btn.textContent = "Get Recipe";
//         div.appendChild(btn);
//         a.appendChild(btn);
//         newsList.appendChild(li);
//       });
//       // .catch((error) => {
//       //   console.log(error);
//       // });
//     });
// }
