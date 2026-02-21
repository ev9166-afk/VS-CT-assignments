const singleDogButton = document.getElementById("single-dog-button");
const singleDogContainer = document.getElementById("single-dog-container");

const wordButton = document.getElementById("wordSearchButton");
const wordInput = document.getElementById("wordInput");
const dictionaryContainer = document.getElementById("dictionary-container");

const weatherButton = document.getElementById("weatherButton");
const locationInput = document.getElementById("location");
const weatherContainer = document.getElementById("weather-container");

const currencyButton = document.getElementById("currencyButton");
const currencyContainer = document.getElementById("currency-container");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");

const artButton = document.getElementById("artButton");
const artContainer = document.getElementById("art-container");

const bookButton = document.getElementById("bookButton");
const bookContainer = document.getElementById("book-container");
const bookSearch = document.getElementById("bookSearch");

const gitButton = document.getElementById("gitButton");
const gitContainer = document.getElementById("git-container");
const gitUser = document.getElementById("gitUser");

const jokeButton = document.getElementById("jokeButton");
const jokeContainer = document.getElementById("joke-container");

async function getSingleDogImage() {
  //Fetch data from dog api
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();
  console.log(data);

  //Clear previous image if any
  singleDogContainer.innerHTML = "";
  //create an image element inside the single conatiner
  const img = document.createElement("img");
  img.src = data.message;
  //append the image to the container
  singleDogContainer.appendChild(img);
}

async function searchDictionary() {
  const word = wordInput.value.trim();
  if (!word) {
    dictionaryContainer.textContent = "Enter A word first.";
    return;
  }

  dictionaryContainer.textContent = "loading...";
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
    );

    if (!res.ok) {
      dictionaryContainer.textContent = "word not found.";
      return;
    }

    const data = await res.json();

    const entry = data[0];
    const phonetic = entry.phonetic || "";
    const meaning = entry.meanings?.[0];
    const partOfSpeech = meaning?.partOfSpeech || "";
    const definition =
      meaning?.definitions?.[0]?.definition || "No definitions found";
    const example = meaning?.definitions?.[0]?.example || "";

    dictionaryContainer.innerHTML = `
  <h3>${entry.word}</h3>
  <p><strong>Phonetic:</strong> ${phonetic}</p>
  <p><strong>Part of Speach:</strong> ${partOfSpeech} </p>
  <p><strong> Definition:</strong> ${definition}</p>
  ${example ? ` <p><strong> Example:</strong> ${example}</p>` : ""}
  `;
  } catch (err) {
    console.error(err);
    dictionaryContainer.textContent = "something went wronng. Try again";
  }
}

async function getWeather() {
  const location = locationInput.value.trim();
  if (!location) {
    weatherContainer.textContent = "Enter a City or Zip";
    return;
  }
  weatherContainer.textContent = "loading...";
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`,
    );
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      weatherContainer.textContent = "Location not found";
      return;
    }
    const place = geoData.results[0];
    const { latitude, longitude, name, country } = place;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&temperature_unit=fahrenheit`,
    );

    const weatherData = await weatherRes.json();
    const current = weatherData.current;
    const temp = current?.temperature_2m;
    const humidity = current?.relative_humidity_2m;
    const wind = current?.wind_speed_10m;

    weatherContainer.innerHTML = `
  <h3>${name}${country ? `, ${country}` : ""}</h3>
      <p><strong>Temp:</strong> ${temp}°</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind:</strong> ${wind}</p>
  `;
  } catch (err) {
    console.error(err);
    weatherContainer.textContent = "Something went wrong. Try again.";
  }
}

async function tellAJoke() {
  jokeContainer.textContent = "Loading...";

  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      jokeContainer.textContent = "Couldnt fetch a joke";
      return;
    }

    const data = await response.json();
    console.log(data);

    jokeContainer.textContent = data.joke;
  } catch (err) {
    console.error(err);
    jokeContainer.textContent = "Something went wrong. Try again.";
  }
}

async function exchangeCurrency() {
  const from = fromCurrency.value.trim().toUpperCase();
  const to = toCurrency.value.trim().toUpperCase();

  const amountRaw = amountInput.value.trim();
  const amount = parseFloat(amountRaw);

  if (!from || !to || !amountRaw) {
    currencyContainer.textContent = "Enter from, to, and amount.";
    return;
  }

  if (Number.isNaN(amount) || amount <= 0) {
    currencyContainer.textContent = "Amount must be a positive number.";
    return;
  }

  currencyContainer.textContent = "Loading...";

  try {
    const res = await fetch(
      `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`,
    );

    if (!res.ok) {
      currencyContainer.textContent = "Could not fetch exchange rates.";
      return;
    }

    const data = await res.json();

    const rate = data?.rates?.[to];
    if (!rate) {
      currencyContainer.textContent =
        "Invalid currency code. Use USD, JPY, EUR, etc.";
      console.log("API response:", data);
      return;
    }

    const result = amount * rate;

    currencyContainer.innerHTML = `
      <p><strong>${amount} ${from}</strong> =
      <strong>${result.toFixed(2)} ${to}</strong></p>
      <p>Rate: 1 ${from} = ${rate} ${to}</p>
    `;
  } catch (err) {
    console.error(err);
    currencyContainer.textContent = "Something went wrong...";
  }
}

async function getArtImage() {
  artContainer.textContent = "loading...";
  try {
    //Fetch data from dog api
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id&limit=50",
    );
    if (!response.ok) {
      artContainer.textContent = "Could not fetch artwork.";
      return;
    }

    const data = await response.json();
    console.log(data);

    const artworksWithImages = data.data.filter((artwork) => artwork.image_id);
    if (artworksWithImages.length === 0) {
      artContainer.textContent = "No artwork images available.";
      return;
    }

    const randomArt =
      artworksWithImages[Math.floor(Math.random() * artworksWithImages.length)];

    const imageUrl = `https://www.artic.edu/iiif/2/${randomArt.image_id}/full/500,/0/default.jpg`;

    artContainer.innerHTML = `
  <h3>${randomArt.title}</h3>
  <img src="${imageUrl}" alt="${randomArt.title}" />`;
  } catch (err) {
    console.error(err);
    artContainer.textContent = "Something Went Wrong.";
  }
}

async function getBookInfo() {
  const query = bookSearch.value.trim();

  if (!query) {
    bookContainer.textContent = "Please enter book title.";
    return;
  }
  bookContainer.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      bookContainer.textContent = "error fetching data.";
      return;
    }
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      bookContainer.textContent = "No books with that title.";
      return;
    }

    const book = data.docs[0];

    bookContainer.innerHTML = `
<h3>${book.title}</h3>
<p><strong> Author:</strong> ${book.author_name ? book.author_name[0] : "unknown"}</p>
<p><strong> First Published: </strong> ${book.first_publish_year || "n/a"}</p>`;
  } catch (err) {
    bookContainer.textContent = "Something went wrong.";
    console.error(err);
  }
}

async function getUserinfo() {
  const query = gitUser.value.trim();

  if (!query) {
    gitContainer.textContent = "Enter a username.";
    return;
  }

  gitContainer.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      gitContainer.textContent = "User not found.";
      return;
    }

    const git = await response.json();

    gitContainer.innerHTML = `
      <h3>${git.login}</h3>
      <img src="${git.avatar_url}" width="120"/>
      <p><strong>Followers:</strong> ${git.followers}</p>
      <p><strong>Public Repos:</strong> ${git.public_repos}</p>
      <p>
        <a href="${git.html_url}" target="_blank">
          View on GitHub
        </a>
      </p>
    `;
  } catch (err) {
    gitContainer.textContent = "Something went wrong.";
    console.error(err);
  }
}
gitButton.addEventListener("click", getUserinfo);
bookButton.addEventListener("click", getBookInfo);
artButton.addEventListener("click", getArtImage);
currencyButton.addEventListener("click", exchangeCurrency);
jokeButton.addEventListener("click", tellAJoke);
weatherButton.addEventListener("click", getWeather);
wordButton.addEventListener("click", searchDictionary);
singleDogButton.addEventListener("click", getSingleDogImage);
