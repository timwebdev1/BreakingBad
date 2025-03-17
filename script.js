// Fetch & Display a Random Character Function
document
  .getElementById("randomCharacterBtn")
  .addEventListener("click", getRandomCharacter);

async function getRandomCharacter() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    const randomIndex = Math.floor(Math.random() * data.results.length);
    const character = data.results[randomIndex];

    document.getElementById("characterContainer").innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Location:</strong> ${character.location.name}</p>
    `;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

// Hardcoded Rick & Morty Quotes
const rickAndMortyQuotes = [
  { quote: "Wubba Lubba Dub Dub!", author: "Rick Sanchez" },
  { quote: "I'm Pickle Rick!", author: "Rick Sanchez" },
  { quote: "Get Schwifty!", author: "Rick Sanchez" },
  {
    quote: "Nothing matters, nobody exists on purpose.",
    author: "Morty Smith",
  },
  {
    quote: "Sometimes science is more art than science.",
    author: "Rick Sanchez",
  },
  {
    quote:
      "Nobody exists on purpose. Nobody belongs anywhere. We’re all going to die.",
    author: "Morty Smith",
  },
];

// Fetch and Display a Random Quote
document
  .getElementById("startGameBtn")
  .addEventListener("click", startGuessQuoteGame);

function startGuessQuoteGame() {
  const randomIndex = Math.floor(Math.random() * rickAndMortyQuotes.length);
  const selectedQuote = rickAndMortyQuotes[randomIndex];

  document.getElementById("quoteContainer").innerHTML = `
    <h2>"${selectedQuote.quote}"</h2>
  `;

  generateOptions(selectedQuote.author);
}

// Fetch ALL pages of characters to ensure full list is used
async function fetchAllCharacters() {
  let allCharacters = [];
  let nextUrl = "https://rickandmortyapi.com/api/character";

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    allCharacters = allCharacters.concat(data.results);
    nextUrl = data.info.next;  // Move to next page if available
  }
  return allCharacters;
}

// Multiple Choce Options Function
async function generateOptions(correctAnswer) {
  try {
    let allCharacters = await fetchAllCharacters(); // Fetch all characters

    let options = [correctAnswer];

    while (options.length < 4) {
      let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)].name;
      if (!options.includes(randomCharacter)) {
        options.push(randomCharacter);
      }
    }

    options = options.sort(() => Math.random() - 0.5); // Shuffle options

    document.getElementById("optionsContainer").innerHTML = "";
    for (let option of options) {
      let character = characters.results.find((c) => c.name === option);

      // If the character isn't found, skip
      if (!character) continue;

      let button = document.createElement("button");

      // Add character image
      let img = document.createElement("img");
      img.src = character.image;
      img.alt = option;
      img.style.width = "100px";
      img.style.borderRadius = "10px";
      img.style.display = "block";

      button.textContent = option;
      button.onclick = () => checkAnswer(option, correctAnswer);

      let div = document.createElement("div");
      div.appendChild(img);
      div.appendChild(button);
      document.getElementById("optionsContainer").appendChild(div);
    }
  } catch (error) {
    console.error("Error fetching options", error);
  }
}
// Error handling
function checkAnswer(selected, correct) {
  let resultContainer = document.getElementById("resultContainer");

  if (selected === correct) {
    resultContainer.innerHTML = `<p style="color: green; font-size: 20px;"> Correct! ${correct} said: ${
      document.getElementById("quoteContainer").textContent
    }:</p>`;
  } else {
    resultContainer.innerHTML = `<p style="color: red; font-size: 20px;"> Wrong! The correct answer was: ${correct}</p>`;
  }
}
