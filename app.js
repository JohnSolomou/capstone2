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

// news feed

const searchForm = document.querySelector(".search");
const input = document.querySelector(".input");
const newsList = document.querySelector(".news-list");
input.value = "";
searchForm.addEventListener("submit", retrieve);

function retrieve(e) {
  // if (input.value == "") {
  //   alert("Input field is empty! Please add a topic to search for. Thank You.");
  //   return;
  // }

  newsList.innerHTML = "";

  e.preventDefault();

  const apiKey = "9051922ae5d94903aa4c1ad16d25086d";
  let topic = input.value;

  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${topic}&apiKey=${apiKey}&cuisine=&fillIngredients=false&addRecipeInformation=true&maxReadyTime=120&ignorePantry=flase&number=20&intolerances=gluten&sourceUrl=http://www.foodista.com`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.results.forEach((results) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let btn = document.createElement("button");
        // let br = document.createElement("br");

        // styling
        div.className = "newsdiv";
        img.className = "newsimg";
        btn.className = "btns";

        li.style.width = "300px";
        a.setAttribute("href", results.sourceUrl);
        a.setAttribute("target", "_blank");
        img.setAttribute("src", results.image);

        div.textContent = results.title;
        // btn.prepend(br);
        div.appendChild(a);
        div.prepend(img);
        li.prepend(div);
        btn.textContent = "Get Recipe";
        div.appendChild(btn);
        a.appendChild(btn);
        newsList.appendChild(li);
      });
      // .catch((error) => {
      //   console.log(error);
      // });
    });
  // jquery for autocomplete
}
$(function () {
  var availableTags = [
    " African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "PChinese",
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
// carousel javascript
let items = document.querySelectorAll(".carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

// end of carousel
// random quote generator
// let btn = document.getElementById("btn");
// let output = document.getElementById("output");
// let quotes = [
//   "“All our dreams can come true, if we have the courage to pursue them.” – Walt Disney",
//   "“The secret of getting ahead is getting started.” – Mark Twain",
//   "“I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life and that is why I succeed.” – Michael Jordan",
//   "“Don’t limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.” – Mary Kay Ash",

//   "“It’s hard to beat a person who never gives up.” – Babe Ruth",
//   "“I wake up every morning and think to myself, ‘how far can I push this company in the next 24 hours.’” – Leah Busque",
//   "“If people are doubting how far you can go, go so far that you can’t hear them anymore.” – Michele Ruiz",
//   "“We need to accept that we won’t always make the right decisions, that we’ll screw up royally sometimes – understanding that failure is not the opposite of success, it’s part of success.” – Arianna Huffington",
//   "“Write it. Shoot it. Publish it. Crochet it, sauté it, whatever. MAKE.” – Joss Whedon",

//   // motivational quotes of the day
//   "“You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth.” ― William W. Purkey",
//   "“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.”― Neil Gaiman",
//   "“Everything you can imagine is real.”― Pablo Picasso",
//   "“When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.” ― Helen Keller",
//   "“Do one thing every day that scares you.”― Eleanor Roosevelt",
//   " “It’s no use going back to yesterday, because I was a different person then.”― Lewis Carroll",
//   "“Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers.” – Socrates",
//   "“Do what you feel in your heart to be right – for you’ll be criticized anyway.”― Eleanor Roosevelt",
//   "“Happiness is not something ready made. It comes from your own actions.” ― Dalai Lama XIV",
//   "“Whatever you are, be a good one.” ― Abraham Lincoln",
//   // quote of th day
//   "“The same boiling water that softens the potato hardens the egg. It’s what you’re made of. Not the circumstances.” – Unknown",
//   "“If we have the attitude that it’s going to be a great day it usually is.” – Catherine Pulsifier",
//   "“You can either experience the pain of discipline or the pain of regret. The choice is yours.”  – Unknown",
//   "“Impossible is just an opinion.” – Paulo Coelho",
//   "“Your passion is waiting for your courage to catch up.” – Isabelle Lafleche",
//   "“Magic is believing in yourself. If you can make that happen, you can make anything happen.” – Johann Wolfgang Von Goethe",
//   "“If something is important enough, even if the odds are stacked against you, you should still do it.” – Elon Musk",
//   "“Hold the vision, trust the process.” – Unknown",
//   "“Don’t be afraid to give up the good to go for the great.” – John D. Rockefeller",
//   "“People who wonder if the glass is half empty or full miss the point. The glass is refillable.” – Unknown",

//   "“No one is to blame for your future situation but yourself. If you want to be successful, then become “Successful.”― Jaymin Shah",
//   "“Things may come to those who wait, but only the things left by those who hustle.”― Abraham Lincoln",
//   "“Everything comes to him who hustles while he waits.”― Thomas Edison",
//   "“Every successful person in the world is a hustler one way or another. We all hustle to get where we need to be. Only a fool would sit around and wait on another man to feed him.” ― K’wan",
//   "“Invest in your dreams. Grind now. Shine later.” – Unknown",
//   "“Hustlers don’t sleep, they nap.” – Unknown",
//   "“Greatness only comes before hustle in the dictionary.” – Ross Simmonds",
//   "“Without hustle, talent will only carry you so far.” – Gary Vaynerchuk",
//   "“Work like there is someone working twenty four hours a day to take it away from you.” – Mark Cuban",
//   "“Hustle in silence and let your success make the noise.” – Unknown",
//   // super motivational
//   "“The hard days are what make you stronger.” – Aly Raisman",
//   "“If you believe it’ll work out, you’ll see opportunities. If you don’t believe it’ll work out, you’ll see obstacles.” – Wayne Dyer",
//   "“Keep your eyes on the stars, and your feet on the ground.” – Theodore Roosevelt",
//   "“You can waste your lives drawing lines. Or you can live your life crossing them.” – Shonda Rhimes",
//   "“You’ve got to get up every morning with determination if you’re going to go to bed with satisfaction.” – George Lorimer",
//   "“I now tried a new hypothesis: It was possible that I was more in charge of my happiness than I was allowing myself to be.” – Michelle Obama",
//   "“In a gentle way, you can shake the world.” – Mahatma Gandhi",
//   "“If opportunity doesn’t knock, build a door.” – Kurt Cobain",
//   "“Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.” – Roy T. Bennett",
//   "“Work hard in silence, let your success be the noise.” – Frank Ocean",
//   // Motivational Quotes for Work
//   "“Don’t say you don’t have enough time. You have exactly the same number of hours per day that were given to Helen Keller, Pasteur, Michelangelo, Mother Teresa, Leonardo Da Vinci, Thomas Jefferson, and Albert Einstein.” – H. Jackson Brown Jr.",
//   "“Hard work beats talent when talent doesn’t work hard.” – Tim Notke",
//   "“If everything seems to be under control, you’re not going fast enough.” – Mario Andretti",
//   "“Opportunity is missed by most people because it is dressed in overalls and looks like work.” – Thomas Edison",
//   "“The only difference between ordinary and extraordinary is that little extra.” – Jimmy Johnson",
//   "“The best way to appreciate your job is to imagine yourself without one.” – Oscar Wilde",
//   "“Unsuccessful people make their decisions based on their current situations. Successful people make their decisions based on where they want to be.” – Benjamin Hardy",
//   "“Never stop doing your best just because someone doesn’t give you credit.” – Kamari aka Lyrikal",
//   "“Work hard for what you want because it won’t come to you without a fight. You have to be strong and courageous and know that you can do anything you put your mind to. If somebody puts you down or criticizes you, just keep on believing in yourself and turn it into something positive.” – Leah LaBelle",
//   "“Work hard, be kind, and amazing things will happen.” – Conan O’Brien",
//   // Quote of the Day for Work
//   "“The miracle is not that we do this work, but that we are happy to do it.” – Mother Teresa",
//   "“Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.” – Earl Nightingale",
//   "“If you work on something a little bit every day, you end up with something that is massive.” – Kenneth Goldsmith",
//   "“The big secret in life is that there is no secret. Whatever your goal, you can get there if you’re willing to work.” – Oprah Winfrey",
//   "“If you cannot do great things, do small things in a great way.” – Napoleon Hill",
//   "“Never allow a person to tell you no who doesn’t have the power to say yes.” – Eleanor Roosevelt",
//   "“At any given moment you have the power to say: this is not how the story is going to end.” – Unknown",
//   "“Amateus sit around and wait for inspiration. The rest of us just get up and go to work.” – Stephen King",
//   "“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it.” – Steve Jobs",
//   "“Nothing will work unless you do.” – Maya Angelou",
//   // Encouraging Quotes to Motivate You
//   "“Sometimes when you’re in a dark place you think you’ve been buried but you’ve actually been planted.” – Christine Caine",
//   "“Don’t limit your challenges. Challenge your limits.” – Unknown",
//   "“Whenever you find yourself doubting how far you can go, just remember how far you have come.” – Unknown",
//   "“Everyone has inside them a piece of good news. The good news is you don’t know how great you can be! How much you can love! What you can accomplish! And what your potential is.” – Anne Frank",
//   "“Some luck lies in not getting what you thought you wanted but getting what you have, which once you have got it you may be smart enough to see is what you would have wanted had you known.” – Garrison Keillor",
//   "“Don’t quit yet, the worst moments are usually followed by the most beautiful silver linings. You have to stay strong, remember to keep your head up and remain hopeful.” – Unknown",
//   "“When written in Chinese the word “crisis” is composed of two characters – one represents danger and the other represents opportunity.” – John F Kennedy",
//   "“Good. Better. Best. Never let it rest. ‘Til your good is better and your better is best.” – St. Jerome",
//   "“In the middle of every difficulty lies opportunity.” – Albert Einstein",
//   "“Start where you are. Use what you have. Do what you can.” – Arthur Ashe",
//   // Short Motivational Quotes
//   "“Dreams don’t work unless you do.” – John C. Maxwell",
//   "“Go the extra mile. It’s never crowded there.” – Dr. Wayne D. Dyer",
//   "“Keep your face always toward the sunshine – and shadows will fall behind you.” – Walt Whitman",
//   "“What defines us is how well we rise after falling.” – Lionel from Maid in Manhattan Movie",
//   "H.O.P.E. = Hold On. Pain Ends.",
//   "Make each day your masterpiece. – John Wooden",
//   "“Wherever you go, go with all your heart” – Confucius",
//   "“Turn your wounds into wisdom” – Oprah",
//   "“We can do anything we want to if we stick to it long enough.” – Helen Keller",
//   "“Begin anywhere.” – John Cage",
// ];

// btn.addEventListener("click", function () {
//   var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//   output.innerText = randomQuote;
// });

// meditation app

const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  // sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  // time display
  const timeDisplay = document.querySelector(".time-display");
  // get length of outline
  const outlineLength = outline.getTotalLength();
  // duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // function to stop and play songs and change icon
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
};

app();

// import axios from "axios";

// const options = {
//   method: "POST",
//   url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify",
//   params: { locale: "en_us" },
//   headers: {
//     "content-type": "application/json",
//     "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//   },
//   data: {
//     plu_code: "",
//     title: "Kroger Vitamin A & D Reduced Fat 2% Milk",
//     upc: "",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// fetch(
//   "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify?locale=en_us",
//   {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     },
//     body: {
//       plu_code: "",
//       title: "Kroger Vitamin A & D Reduced Fat 2% Milk",
//       upc: "",
//     },
//   }
// )
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// post request
// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   body: JSON.stringify({
//     kia: "telluride",
//     ford: "f-150",
//     porsche: "macan",
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// $(document).ready(function () {
//   $("button").click(function () {
//     $.post(
//       "demo_test_post.asp",
//       {
//         name: "John",
//         city: "philadelphia",
//       },
//       function (data, status) {
//         alert("Data: " + data + "\nStatus: " + status);
//       }
//     );
//   });
// });

// // Motivational Quotes for Success
// “Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.” – Pele
// “Would you like me to give you a formula for success? It’s quite simple, really: Double your rate of failure. You are thinking of failure as the enemy of success. But it isn’t at all. You can be discouraged by failure or you can learn from it, so go ahead and make mistakes. Make all you can. Because remember that’s where you will find success.” – Thomas J. Watson
// “Every champion was once a contender that didn’t give up.” – Gabby Douglas
// “To be a champion, I think you have to see the big picture. It’s not about winning and losing; it’s about every day hard work and about thriving on a challenge. It’s about embracing the pain that you’ll experience at the end of a race and not being afraid. I think people think too hard and get afraid of a certain challenge.” – Summer Sanders
// Don’t dream about success. Get out there and work for it.
// “The difference between successful people and very successful people is that very successful people say ‘no’ to almost everything.” – Warren Buffett
// You can cry, scream, and bang your head in frustration but keep pushing forward. It’s worth it.
// “I hated every minute of training, but I said, ‘Don’t quit. Suffer now and live the rest of your life as a champion.” – Muhammad Ali
// “Opportunities don’t happen. You create them.” – Chris Grosser
// “Success is liking yourself, liking what you do, and liking how you do it.” – Maya Angelou
// // Motivational Quotes for Life
// “If you obey all the rules, you miss all the fun.” – Katharine Hepburn
// “You were born to be a player. You were meant to be here. This moment is yours.” – Herb Brooks
// “Life is not what you alone make it. Life is the input of everyone who touched your life and every experience that entered it. We are all part of one another.” – Yuri Kochiyama
// “When you reach the end of your rope, tie a knot and hang out.” – Abraham Lincoln
// “Never regret anything that made you smile.” – Mark Twain
// “You must do the thing you think you cannot do.” – Eleanor Roosevelt
// “If you want to fly give up everything that weighs you down.” – Buddha
// “Doubt kills more dreams than failure ever will.” – Suzy Kassem
// “I never lose. Either I win or learn.” – Nelson Mandela
// “Today is your opportunity to build the tomorrow you want.” – Ken Poirot
// “Getting over a painful experience is much like crossing the monkey bars. You have to let go at some point in order to move forward.” – C.S. Lewis
// // Business Motivational Quotes
// “Focus on being productive instead of busy.” – Tim Ferriss
// “You don’t need to see the whole staircase, just take the first step.” – Martin Luther King Jr.
// “It’s not all sunshine and rainbows, but a good amount of it actually is.” – Unknown
// When someone says you can’t do it, do it twice and take pictures.
// “I didn’t get there by wishing for it, but by working for it.” – Estee Lauder
// “She remembered who she was and the game changed.” – Lalah Deliah
// “If you’re too comfortable, it’s time to move on. Terrified of what’s next? You’re on the right track.” – Susan Fales-Hill
// “Be happy with what you have while working for what you want.” – Helen Keller
// “Sunshine all the time makes a desert.” – Arabic Proverb
// “The big lesson in life is never be scared of anyone or anything.” – Frank Sinatra
// // Business Motivational Quotes
// // Motivational Quotes
// "You’re so much stronger than your excuses",
// Don’t compare yourself to others. Be like the sun and the moon and shine when it’s your time."
// "Don’t Quit",
// "Don’t tell everyone your plans, instead show them your results."
// “I choose to make the rest of my life, the best of my life.” – Louise Hay,
// “Nothing can dim the light that shines from within.” – Maya Angelou,
// “Be so good they can’t ignore you.” – Steve Martin,
// “Take criticism seriously, but not personally. If there is truth or merit in the criticism, try to learn from it. Otherwise, let it roll right off you.” – Hillary Clinton,
// “This is a reminder to you to create your own rule book, and live your life the way you want it.” – Reese Evans,
// “If you don’t get out of the box you’ve been raised in, you won’t understand how much bigger the world is.” – Angelina Jolie
// Motivational Quotes
// You Can Do It Quotes
// “Do the best you can. No one can do more than that.” – John Wooden
// “Do what you can, with what you have, where you are.” – Theodore Roosevelt
// ‘It’s never too late to be what you might’ve been.” – George Eliot
// “If you can dream it, you can do it.” – Walt Disney
// “Trust yourself that you can do it and get it.” – Baz Luhrmann
// “Don’t let what you can’t do interfere with what you can do.” – Unknown
// “You can do anything you set your mind to.” – Benjamin Franklin
// “All we can do is the best we can do.” – David Axelrod
// “You never know what you can do until you try.” – William Cobbett
// “Twenty years from now you’ll be more disappointed by the things you did not do than the ones you did.” – Mark Twain
// Inspirational Motivational Quotes
// “I am thankful for all of those who said NO to me. It’s because of them I’m doing it myself.” – Wayne W. Dyer
// It’s okay to outgrow people who don’t grow. Grow tall anyways.
// When you feel like giving up just remember that there are a lot of people you still have to prove wrong.
// “The world is full of nice people. If you can’t find one, be one.” – Nishan Panwar
// “Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got to keep going.” – Chantal Sutherland
// “A walk to a nearby park may give you more energy and inspiration in life than spending two hours in front of a screen.” – Tsang Lindsay
// “If you can’t do anything about it then let it go. Don’t be a prisoner to things you can’t change.” – Tony Gaskins
// “You can’t go back and change the beginning, but you can start where you are and change the ending.” – C.S. Lewis
// “Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.” – Rumi
// “I can and I will. Watch me.” – Carrie Green
// Inspirational Motivational Quotes
// Famous Motivational Quotes
// “Try not to become a man of success, but rather become a man of value.” – Albert Einstein
// “A winner is a dreamer who never gives up.” – Nelson Mandela
// “If you don’t have a competitive advantage, don’t compete.” – Jack Welch
// “The only thing standing in the way between you and your goal is the BS story you keep telling yourself as to why you can’t achieve it.” – Jordan Belfort
// “What is life without a little risk?” – J.K. Rowling
// “Only do what your heart tells you.” – Princess Diana
// “If it’s a good idea, go ahead and do it. It’s much easier to apologize than it is to get permission.” – Grace Hopper
// “I attribute my success to this: I never gave or took an excuse.” – Florence Nightingale
// “The question isn’t who is going to let me; it’s who is going to stop me.” – Ayn Rand
// “A surplus of effort could overcome a deficit of confidence.” – Sonia Sotomayer
// Motivational Quotes from Books
// “And, when you want something, all the universe conspires in helping you to achieve it.” ― Paulo Coelho, The Alchemist
// “Your playing small does not serve the world. There is nothing enlightened about shrinking so that other people won’t feel insecure around you. We are all meant to shine, as children do.” – Marianne Williamson, A Return to Love: Reflections on the Principles of “A Course in Miracles”
// “Don’t think or judge, just listen.”― Sarah Dessen, Just Listen
// “I can be changed by what happens to me. But I refuse to be reduced by it.” – Maya Angelou, Letter to My Daughter
// “Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.” ― Martin Luther King Jr., A Testament of Hope: The Essential Writings and Speeches
// “You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You’re on your own. And you know what you know. And YOU are the one who’ll decide where to go…” ― Dr. Seuss, Oh, the Places You’ll Go!
// “It’s the possibility of having a dream come true that makes life interesting.” ― Paulo Coelho, The Alchemist
// “There is some good in this world, and it’s worth fighting for.” – J.R.R. Tolkien, The Two Towers
// “Learn to light a candle in the darkest moments of someone’s life. Be the light that helps others see; it is what gives life its deepest significance.”― Roy T. Bennett, The Light in the Heart
// “Atticus, he was real nice.” “Most people are, Scout, when you finally see them.” ― Harper Lee, To Kill a Mockingbird
// Motivational Quotes from Movies
// “Oh yes, the past can hurt. But the way I see it, you can either run from it or learn from it.” – The Lion King
// “We’re on the brink of adventure, children. Don’t spoil it with questions.” – Mary Poppins
// “Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.”– Ferris Bueller
// “I just wanna let them know that they didn’t break me.” – Pretty in Pink
// “I’m going to make him an offer he can’t refuse.” – The Godfather
// “No one has ever made a difference by being like everyone else.” – The Greatest Showman
// “Spend a little more time trying to make something of yourself and a little less time trying to impress people.” – The Breakfast Club
// “The problem is not the problem. The problem is your attitude about the problem.” – Pirates of the Caribbean
// “Remember you’re the one who can fill the world with sunshine.” – Snow White
// “You’ll have bad times, but it’ll always wake you up to the good stuff you weren’t paying attention to.” – Good Will Hunting
// Motivational Quotes from Movies
// Motivational Song Lyrics
// “And when you get the choice to sit it out or dance… I hope you dance.” – I Hope You Dance, Lee Ann Womack
// “Just because it burns doesn’t mean you’re gonna die you’ve gotta get up and try.” – Try, P!nk
// “Life’s a game made for everyone and love is the prize” – Wake Me Up, Avicii
// “It’s a new dawn, it’s a new day, it’s a life for me and I’m feeling good.” – Feeling Good, Michael Buble
// “Today is where your book begins, the rest is still unwritten.” – Unwritten, Natasha Bedingfield
// “A million dreams for the world we’re gonna make’ – The Greatest Showman
// “It’s my life It’s now or never I ain’t gonna live forever I just want to live while I’m alive” – It’s My Life, Bon Jovi
// “I could build a castle out of all the bricks they threw at me” – New Romantics, Taylor Swift
// “Cause the grass is greener under me bright as technicolor, I can tell that you can see” – Sorry Not Sorry, Demi Lovato
// “Every day women and men become legends” – Glory, John Legend and Common
// Motivational Song Lyrics
// Motivational Quotes for Women
// “On my own I will just create and if it works, it works. And if it doesn’t, I’ll just create something else. I don’t have any limitations on what I think I could do or be.” – Oprah Winfrey
// “We realize the importance of our voices only when we are silenced.” – Malala Yousafzai
// “We need to accept that we won’t always make the right decisions, that we’ll screw up royally sometimes – understanding that failure is not the opposite of success, it’s part of success.” – Arianna Huffington
// “Don’t compromise yourself. You’re all you’ve got.” – Janis Joplin
// “When something I can’t control happens, I ask myself: Where is the hidden gift? Where is the positive in this?” – Sara Blakely
// “Doubt is a killer. You just have to know who you are and what you stand for. “ – Jennifer Lopez
// “Be a first rate version of yourself, not a second rate version of someone else.” – Judy Garland
// “Learn from the mistakes of others. You can’t live long enough to make them all yourself.” – Eleanor Roosevelt
// “I was smart enough to go through any door that opened.” – Joan Rivers
// “Done is better than perfect.” – Sheryl Sandberg
// Motivational Quotes for Men
// “If your dreams don’t scare you, they are too small.” – Richard Branson
// “Today is your opportunity to build the tomorrow you want.” – Ken Poirot
// “What hurts you blesses you.” – Rumi
// ‘Nothing is stronger than a broken man rebuilding himself.” – Unknown
// “I always thought it was me against the world and then one day I realized it’s just me against me.” – Kendrick Lamar
// “A man is not finished when he is defeated. He is finished when he quits.” – Richard Nixon
// “The world is changed by your example, not by your opinion.” – Paulo Coelho
// “If you don’t build your dream, someone else will hire you to help them build theirs.” – Dhirubhai Ambani
// “I’m not in this world to live up to your expectations and you’re not in this world to live up to mine.” – Bruce Lee
// “What’s right is what’s left if you do everything else wrong.” – Robin Williams
// Motivational Quotes for Kids
// “Be a fruitloop in a world of Cheerios.” – Unknown
// “Dream beautiful dreams, and then work to make those dreams come true.” – Spencer W. Kimball
// “Be the change you want to see in the world.” – Mahatma Gandhi
// “Believe you can and you will.” – Unknown
// “Do the right thing even when no one is looking.” – Unknown
// “Make today the day you learn something new.” –Unknown
// “Be silly, be honest, be kind.’ – Ralph Waldo Emerson
// “If you think someone could use a friend. Be one.” – Unknown
// “It’s not what happens to you but how you react to it that matters.” – Epictetus
// “You don’t have to be perfect to be amazing.” – Unknown
// Best Motivational Quotes
// “The best way to predict your future is to create it.” – Abraham Lincoln
// “Successful people are not gifted; they just work hard, then succeed on purpose.” – G.K. Nielson
// “Don’t watch the clock; do what it does. Keep going.” – Sam Levenson
// “Work until your rivals become idols.” – Drake
// “You can’t have a million dollar dream on a minimum wage work ethic.” – Unknown
// “You must do the kind of things you think you cannot do.” – Eleanor Roosevelt
// “It’s not what you do once in a while it’s what you do day in and day out that makes the difference.” – Jenny Craig
// “Falling down is how we grow. Staying down is how we die.” – Brian Vaszily
// “Wealth isn’t about having a lot of money it’s about having a lot of options.” – Chris Rock
// “There may be people that have more talent than you, but there’s no excuse for anyone to work harder than you.” – Derek Jeter
// Best Motivational Quotes
// Funny Motivational Quotes
// “Always be careful when you follow the masses. Sometimes the m is silent.” – Unknown
// Never let anyone treat you like you’re regular glue. You’re glitter glue.
// “If you fall – I’ll be there.” – Floor
// “When Plan “A” doesn’t work, don’t worry, you still have 25 more letters to go through.” – Unknown
// “If you think you’re too small to make a difference, try sleeping with a mosquito.” – Dalai Lama
// “If at first you don’t succeed, then skydiving isn’t for you.” – Steven Wright
// “A diamond is merely a lump of coal that did well under pressure.” – Unknown
// “I find television very educational. Every time someone turns it on, I go in the other room and read a book.’ – Groucho Marx
// “Opportunity does not knock, it presents itself when you beat down the door.” – Kyle Chandler
// “I have not failed. I’ve just found 10,000 ways that won’t work.” – Thomas A. Edison
// Funny Motivational Quotes
// Deep Motivational Quotes
// “You could rattle the stars,” she whispered. “You could do anything, if only you dared. And deep down, you know it, too. That’s what scares you most.” ― Sarah J. Maas
// “It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest. – Walter Anderson
// “The adventure of life is to learn. The purpose of life is to grow. The nature of life is to change. The challenge of life is to overcome. The essence of life is to care. The opportunity of like is to serve. The secret of life is to dare. The spice of life is to befriend. The beauty of life is to give.” – William Arthur Ward
// “When you know your worth, no one can make you feel worthless.” – Unknown
// “If you’ve never eaten while crying you don’t know what life tastes like.” – Johann Wolfgang von Goethe
// “If you judge people, you have no time to love them.” – Mother Teresa
// “Once you do know what the question actually is, you’ll know what the answer means.”– Douglas Adams
// “The two most important days in your life are the day you’re born and the day you find out why.” – Mark Twain
// “Nothing ever goes away until it teaches us what we need to know.” – Pema Chodron
// ‘We can see through others only when we can see through ourselves.” – Bruce Lee
// Positive Quotes for Work
// “You don’t get paid for the hour. You get paid for the value you bring to the hour.” – JIm Rohn
// “Be an Encourager: When you encourage others, you boost their self-esteem, enhance their self-confidence, make them work harder, lift their spirits and make them successful in their endeavors. Encouragement goes straight to the heart and is always available. Be an encourager. Always.” ― Roy T. Bennett
// “Remember, you have been criticizing yourself for years and it hasn’t worked. Try approving of yourself and see what happens.” –Louise L Hay
// “Work hard and don’t give up hope. Be open to criticism and keep learning. Surround yourself with happy, warm and genuine people.” – Tena Desae
// “Stay true to yourself, yet always be open to learn. Work hard, and never give up on your dreams, even when nobody else believes they can come true but you. These are not cliches but real tools you need no matter what you do in life to stay focused on your path.” – Phillip Sweet
// “You can control two things: your work ethic and your attitude about anything.” – Ali Krieger
// “Success isn’t always about greatness. It’s about consistency. Consistent hard work leads to success. Greatness will come.” – Dwayne Johnson
// “One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don’t throw it away.” ― Stephen Hawking
// “Some women choose to follow men, and some women choose to follow their dreams. If you’re wondering which way to go, remember that your career will never wake up and tell you that it doesn’t love you anymore.” ― Lady Gaga
// “Read, read, read. Read everything — trash, classics, good and bad, and see how they do it. Just like a carpenter who works as an apprentice and studies the master. Read! You’ll absorb it. Then write. If it’s good, you’ll find out. If it’s not, throw it out of the window.”― William Faulkner
// Motivational Quotes for Students
// “I really appreciate people who correct me, because without them, I might have been repeating mistakes for a long time.” – Mufti Menk
// “Motivation comes from working on things we care about.” – Sheryl Sandberg
// “If today you are a little bit better than you were yesterday, then that’s enough.” – David A. Bednar
// “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela
// “If you can’t make a mistake you can’t make anything.” – Marva Collin
// “Practice makes progress not perfect.” – Unknown
// “You may be disappointed if you fail, but you’ll be doomed if you don’t try.” – Beverly Sills
// “Failure is the tuition you pay for success.” – Walter Brunell
// “If we wait until we’re ready, we’ll be waiting for the rest of our lives.” – Lemony Snicket
// “Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.” – William Arthur Ward
// Motivational Quotes for Students
// Short Success Quotes
// “The best revenge is massive success.” – Frank Sinatra
// “What’s on the other side of fear? Nothing.” – Jamie Foxx
// “Quitters never win. Winners never quit!” Dr. Irene C. Kassorla
// “It’s not your salary that makes you rich, it’s your spending habits.” – Charles A. Jaffe
// “If there is no wind, row.” – Latin Proverb
// “It’s never too late for a new beginning in your life.” – Joyce Meyers
// “If opportunity doesn’t knock build a door.” – Milton Berle
// “Action is the foundational key to all success.” – Pablo Picasso
// “I never dreamt of success. I worked for it.” – Estee Lauder
// “A goal is a dream with a deadline.” – Napoleon Hill
// Short Success Quotes
// Motivational Quotes About Change
// “Be the change that you wish to see in the world.”― Mahatma Gandhi
// “Never doubt that a small group of thoughtful, committed, citizens can change the world. Indeed, it is the only thing that ever has.” ― Margaret Mead
// “Change is painful, but nothing is as painful as staying stuck somewhere you don’t belong.” – Mandy Hale
// “Those who cannot change their minds cannot change anything.” – George Bernard Shaw
// “Everyone thinks of changing the world, but no one thinks of changing himself.”
// ― Leo Tolstoy
// “Change is the law of life. And those who look only to the past or present are certain to miss the future.” – John F. Kennedy
// “We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.”― Maya Angelou
// “Dreams are the seeds of change. Nothing ever grows without a seed, and nothing ever changes without a dream.” – Debby Boone
// “Here’s to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They’re not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can’t do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.”― Rob Siltanen
// Motivational Quotes About Money
// “It’s not your salary that makes you rich, it’s your spending habits.” – Charles A. Jaffe
// “Don’t stay in bed unless you can make money in bed.” – George Burns
// “You must gain control over your money or the lack of it will forever control you.” – Dave Ramsey
// “Only buy something that you’d be perfectly happy to hold if the market shuts down for ten years.”– Warren Buffett
// “That man is richest whose pleasures are cheapest.”– Henry David Thoreau
// “Money can’t buy happiness, but it can make you awfully comfortable while you’re being miserable.” ― Clare Boothe Luce
// “Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.” ― Jen Sincero
// “You’re already a financial trader. You might not think of it in just this way, but if you work for a living, you’re trading your time for money. Frankly, it’s just about the worst trade you can make. Why? You can always get more money, but you can’t get more time.” – Tony Robbins
// “You can only become truly accomplished at something you love. Don’t make money your goal. Instead pursue the things you love doing and then do them so well that people can’t take their eyes off of you.”― Maya Angelou
// “Formal education will make you a living; self-education will make you a fortune.” –Jim Rohn
// Motivational Quotes About Success
// “Don’t give up, don’t take anything personally, and don’t take no for an answer.” – Sophia Amoruso
// “Don’t be upset when people reject you. Nice things are rejected all the time by people who can’t afford them.” – Unknown
// “The secret of change is to focus all your energy, not on fighting the old, but on building the new.” – Socrates
// “There are two rules for success. 1: Never reveal everything you know.” – Roger H. Lincoln
// “Your positive action combined with positive thinking results in success.” – Shiv Khera
// “Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do”  ― Pele
// “If you talk about it, it’s a dream. If you envision it, it’s possible. If you schedule it, it’s real.” – Tony Robbins
// “Forget your excuses. You either want it bad or don’t want it at all.” – Unknown
// “The key to success is to start before you are ready.” – Marie Forleo
// “I want to be remembered as the one who tried.” – Dr. Dorothy Height
// Motivational Quotes About Success
// Motivational Quotes About Time
// “How to stop time: kiss. How to travel in time: read. How to escape time: music. How to feel time: write. How to release time: breathe.” ― Matt Haig
// “Time is what we want most and what we use worst.” – William Penn
// “It’s not about having enough time, it’s about making enough time.”― Rachael Bermingham
// “Time is money.” – Benjamin Franklin
// “Better three hours too soon than a minute too late.” – William Shakespeare
// “The trouble is, you think you have time.” –Buddha
// “The greatest gift you could give someone is your time. Because when you give your time, you are giving a portion of your life you can’t get back.” – Unknown
// “Punctuality is not just limited to arriving at a place at right time, it is also about taking actions at right time.” ― Amit Kalantri
// “Time always exposes what you mean to someone.” – Unknown
// “After all this time? Always.” – J.K. Rowling
// Motivational Quotes About Failure
// “You can’t let your failures define you. You have to let your failures teach you.” – Barack Obama
// “Success is a lousy teacher. It seduces smart people into thinking they can’t lose.” – Bill Gates
// “Stop being afraid of what could go wrong, and start being excited about what could go right.” – Tony Robbins
// “Think like a Queen. A Queen is not afraid to fail. Failure is another stepping stone to greatness.” – Oprah
// “Defeat is a state of mind; no one is ever defeated until defeat is accepted as a reality.” – Bruce Lee
// “Our greatest glory is not in never falling, but in rising every time we fall.” – Confucius
// “It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all – in which case, you fail by default.” – J.K. Rowling
// “Success is going from failure to failure without losing your enthusiasm” – Winston Churchill
// “Why do we grieve failures longer than we celebrate wins?” – Komal Kapoor
// “Failure isn’t the end of the road. It’s a big red flag saying to you ‘Wrong way. Turn around.’” – Oprah Winfrey
// Whenever you feel like a failure, just remember that even Coca Cola only sold 25 bottles their first year
// Motivational Quotes About Failure
// Motivational Quotes About Life
// “No matter what people tell you, words and ideas can change the world.” – Robin Williams
// “Life is like riding a bicycle. To keep your balance, you must keep moving.” – Albert Einstein
// “You’re off to Great Places! Today is your day! Your mountain is waiting, so… get on your way!” – Dr. Seuss
// “When thinking about life, remember this: no amount of guilt can change the past and no amount of anxiety can change the future.” – Unknown
// “A negative mind will never give you a positive life.” – Unknown
// “Everything is hard before it is easy.” – Goethe
// “At the end of the day we can endure much more than we think we can.” – Frida Kahlo
// “Whatever you do never run back to what broke you.” – Frank Ocean
// “Take the risk or lose the chance.” – Unknown
// “I didn’t learn to be quiet when I had an opinion. The reason they knew who I was is because I told them.” – Ursula Burns
// Motivational Quotes About Life
// Motivational Quotes of the Day
// “Never regret a day in your life. Good days bring you happiness and bad days give you experience.” – Unknown
// “Either you run the day, or the day runs you.” – Jim Rohn
// “Only I can change my life. No one can do it for me.” – Carol Burnett
// “Life is 10% what happens to you and 90% how you react to it.” – Charles R. Swindoll
// “Act as if what you do makes a difference. It does.” – William James
// When the pain of an obstacle is too great, challenge yourself to be stronger.
// “Even if you’re on the right track, you’ll get run over if you just sit there.” – Will Rogers
// “Very little is needed to make a happy life; it is all within yourself, in your way of thinking.” – Marcus Aurelius
// “Life is either a daring adventure or nothing at all.” Helen Keller
// “The woman who follows the crowd will usually go no further than the crowd. The woman who walks alone is likely to find herself in places no one has been before.’ – Albert Einstein
// “Life’s like a movie, write your own ending. Keep believing, keep pretending.” – Jim Hensen
// Motivational Quotes of the Day
// Motivational Quotes About Learning
// “A reader lives a thousand lives before he dies. The man who never reads lives only one.” ― George R.R. Martin
// “I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.”― Groucho Marx
// “Never stop learning because life never stops teaching.” –Unknown
// “If you’re the smartest person in the room, you’re in the wrong room.” – Unknown
// “The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.”– Brian Herbert
// “The man who does not read has no advantage over the man who cannot read.”― Mark Twain
// “To learn a language is to have one more window from which to look at the world.” – Chinese Proverb
// “I’m still learning.” – Michelangelo
// “Live as if you were to die tomorrow. Learn as if you were to live forever.” – Mahatma Gandhi
// “Education is the most powerful weapon you can use to change the world.” – Nelson Mandela
// Motivational Quotes About Learning
// Motivational Quotes About Strength
// “Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.” – Arnold Schwarzenegger
// “If it doesn’t challenge you, it doesn’t change you.” – Fred DeVito
// “A dream doesn’t become reality through magic; it takes sweat, determination and hard work.” – Colin Powell
// “Every night her thoughts weighed heavily on her soul but every morning she would get up and fight another day, every night she survived.” – R.H. Sin
// “Still, I rise.” – Maya Angelou
// “The best thing you can do is MASTER the chaos in you. You are not thrown into the fire, you ARE the fire.” – Mama Indigo
// “Flowers grow back even after the harshest winters. You will too.” – Jennae Cecilia
// “Life has many ways of testing a person’s will, either by having nothing happen at all or by having everything happen all at once.” – Paulo Coelho
// “Be strong enough to let go and wise enough to wait for what you deserve.” – Author Unknown
// “It’s okay to be a glowstick: Sometimes we have to break before we shine.” – Jadah Sellner
// Motivational Quotes About Strength
// Positive Motivational Quotes
// “What is coming is better than what is gone.” – Unknown
// “Attitude is a choice. Happiness is a choice. Optimism is a choice. Kindness is a choice. Giving is a choice. Respect is a choice. Whatever choice you make makes you. Choose wisely.”― Roy T. Bennett
// “Dwell on the beauty of life. Watch the stars, and see yourself running with them.”― Marcus Aurelius
// “Do something today that your future self will thank you for.” –Unknown
// “The greatest weapon against stress is the ability to choose one thought over another.” – William James
// “It takes nothing to join the crowd. It takes everything to stand alone.” – Hans F. Hansen
// “Your mind is powerful. When you fill it with positive thoughts your whole world will change.” – Unknown
// “Your only limit is your mind.” – Unknown
// “Stop being afraid of what can go wrong and start being positive about what can go right.” – Unknown
// “The difference between who you are and who you want to be is what you do.” – Unknown
// positive motivational quotes
// Motivational Quotes About Winning
// “You were born to win, but to be a winner, you must plan to win, prepare to win, and expect to win.” – Zig Ziglar
// “One thing’s for sure, if you don’t play, you don’t win.” – Kylie Francis
// “Winning means you’re willing to go longer, work harder, and give more than anyone else.” – Vince Lombardi
// “Talent wins games, but teamwork wins championships.” – Michael Jordan
// “When I win and when I lose, I take ownership of it, because I really am in charge of what I do.” – Nicki Minaj
// “A champion is afraid of losing. Everyone else is afraid of winning.” – Billie Jean King
// ‘Competing at the highest level is not about winning. It’s about preparation, courage, understanding, nurturing your people, and heart. Winning is the result.” – Joe Torre
// “A winner is a dreamer who never gives up.” – Nelson Mandela
// “The secret of your future is hidden in your daily routine.” – Mike Murdock
// “Losers quit when they fail. Winners fail until they succeed.” –Robert T. Kiyosaki
// Motivational Quotes About Winning
// Motivator Quotes
// “It is never too late to be what you might have been.” – George Eliot
// “Words can inspire, thoughts can provoke, but only action truly brings you closer to your dreams.” – Brad Sugars
// “Don’t stop when you are tired. Stop when you are done.” – Unknown
// “Don’t tell people about your dreams. Show them your dreams.” – Unknown
// “Revenge is a powerful motivator.” – Marcus Luttrell
// “Motivation may be what starts you off, but it’s habit that keeps you going back for more.”  – Miya Yamanouchi
// “I will not erase all my hard work this week because it’s the weekend.” – Unknown
// “It might not be easy but it’ll be worth it.” – Unknown
// “Make your fear of losing your greatest motivator.” – Unknown
// “You will never always be motivated, so you must learn to be disciplined.” –Unknown
// “I’m not a product of my circumstances. I am a product of my decisions.” – Stephen Covey
