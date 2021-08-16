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

// carousel

const cardsContainer = document.querySelector(".card-carousel");
const cardsController = document.querySelector(
  ".card-carousel + .card-controller"
);

class DraggingEvent {
  constructor(target = undefined) {
    this.target = target;
  }

  event(callback) {
    let handler;

    this.target.addEventListener("mousedown", (e) => {
      e.preventDefault();

      handler = callback(e);

      window.addEventListener("mousemove", handler);

      document.addEventListener("mouseleave", clearDraggingEvent);

      window.addEventListener("mouseup", clearDraggingEvent);

      function clearDraggingEvent() {
        window.removeEventListener("mousemove", handler);
        window.removeEventListener("mouseup", clearDraggingEvent);

        document.removeEventListener("mouseleave", clearDraggingEvent);

        handler(null);
      }
    });

    this.target.addEventListener("touchstart", (e) => {
      handler = callback(e);

      window.addEventListener("touchmove", handler);

      window.addEventListener("touchend", clearDraggingEvent);

      document.body.addEventListener("mouseleave", clearDraggingEvent);

      function clearDraggingEvent() {
        window.removeEventListener("touchmove", handler);
        window.removeEventListener("touchend", clearDraggingEvent);

        handler(null);
      }
    });
  }

  // Get the distance that the user has dragged
  getDistance(callback) {
    function distanceInit(e1) {
      let startingX, startingY;

      if ("touches" in e1) {
        startingX = e1.touches[0].clientX;
        startingY = e1.touches[0].clientY;
      } else {
        startingX = e1.clientX;
        startingY = e1.clientY;
      }

      return function (e2) {
        if (e2 === null) {
          return callback(null);
        } else {
          if ("touches" in e2) {
            return callback({
              x: e2.touches[0].clientX - startingX,
              y: e2.touches[0].clientY - startingY,
            });
          } else {
            return callback({
              x: e2.clientX - startingX,
              y: e2.clientY - startingY,
            });
          }
        }
      };
    }

    this.event(distanceInit);
  }
}

class CardCarousel extends DraggingEvent {
  constructor(container, controller = undefined) {
    super(container);

    // DOM elements
    this.container = container;
    this.controllerElement = controller;
    this.cards = container.querySelectorAll(".card");

    // Carousel data
    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
    this.xScale = {};

    // Resizing
    window.addEventListener("resize", this.updateCardWidth.bind(this));

    if (this.controllerElement) {
      this.controllerElement.addEventListener(
        "keydown",
        this.controller.bind(this)
      );
    }

    // Initializers
    this.build();

    // Bind dragging event
    super.getDistance(this.moveCards.bind(this));
  }

  updateCardWidth() {
    this.cardWidth =
      (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

    this.build();
  }

  build(fix = 0) {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex;
      const scale = this.calcScale(x);
      const scale2 = this.calcScale2(x);
      const zIndex = -Math.abs(i - this.centerIndex);

      const leftPos = this.calcPos(x, scale2);

      this.xScale[x] = this.cards[i];

      this.updateCards(this.cards[i], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  controller(e) {
    const temp = { ...this.xScale };

    if (e.keyCode === 39) {
      // Left arrow
      for (let x in this.xScale) {
        const newX =
          parseInt(x) - 1 < -this.centerIndex
            ? this.centerIndex
            : parseInt(x) - 1;

        temp[newX] = this.xScale[x];
      }
    }

    if (e.keyCode == 37) {
      // Right arrow
      for (let x in this.xScale) {
        const newX =
          parseInt(x) + 1 > this.centerIndex
            ? -this.centerIndex
            : parseInt(x) + 1;

        temp[newX] = this.xScale[x];
      }
    }

    this.xScale = temp;

    for (let x in temp) {
      const scale = this.calcScale(x),
        scale2 = this.calcScale2(x),
        leftPos = this.calcPos(x, scale2),
        zIndex = -Math.abs(x);

      this.updateCards(this.xScale[x], {
        x: x,
        scale: scale,
        leftPos: leftPos,
        zIndex: zIndex,
      });
    }
  }

  calcPos(x, scale) {
    let formula;

    if (x < 0) {
      formula = (scale * 100 - this.cardWidth) / 2;

      return formula;
    } else if (x > 0) {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    } else {
      formula = 100 - (scale * 100 + this.cardWidth) / 2;

      return formula;
    }
  }

  updateCards(card, data) {
    if (data.x || data.x == 0) {
      card.setAttribute("data-x", data.x);
    }

    if (data.scale || data.scale == 0) {
      card.style.transform = `scale(${data.scale})`;

      if (data.scale == 0) {
        card.style.opacity = data.scale;
      } else {
        card.style.opacity = 1;
      }
    }

    if (data.leftPos) {
      card.style.left = `${data.leftPos}%`;
    }

    if (data.zIndex || data.zIndex == 0) {
      if (data.zIndex == 0) {
        card.classList.add("highlight");
      } else {
        card.classList.remove("highlight");
      }

      card.style.zIndex = data.zIndex;
    }
  }

  calcScale2(x) {
    let formula;

    if (x <= 0) {
      formula = 1 - (-1 / 5) * x;

      return formula;
    } else if (x > 0) {
      formula = 1 - (1 / 5) * x;

      return formula;
    }
  }

  calcScale(x) {
    const formula = 1 - (1 / 5) * Math.pow(x, 2);

    if (formula <= 0) {
      return 0;
    } else {
      return formula;
    }
  }

  checkOrdering(card, x, xDist) {
    const original = parseInt(card.dataset.x);
    const rounded = Math.round(xDist);
    let newX = x;

    if (x !== x + rounded) {
      if (x + rounded > original) {
        if (x + rounded > this.centerIndex) {
          newX =
            x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
        }
      } else if (x + rounded < original) {
        if (x + rounded < -this.centerIndex) {
          newX =
            x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
        }
      }

      this.xScale[newX + rounded] = card;
    }

    const temp = -Math.abs(newX + rounded);

    this.updateCards(card, { zIndex: temp });

    return newX;
  }

  moveCards(data) {
    let xDist;

    if (data != null) {
      this.container.classList.remove("smooth-return");
      xDist = data.x / 250;
    } else {
      this.container.classList.add("smooth-return");
      xDist = 0;

      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x,
          zIndex: Math.abs(Math.abs(x) - this.centerIndex),
        });
      }
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(
          this.cards[i],
          parseInt(this.cards[i].dataset.x),
          xDist
        ),
        scale = this.calcScale(x + xDist),
        scale2 = this.calcScale2(x + xDist),
        leftPos = this.calcPos(x + xDist, scale2);

      this.updateCards(this.cards[i], {
        scale: scale,
        leftPos: leftPos,
      });
    }
  }
}

const carousel = new CardCarousel(cardsContainer);

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
