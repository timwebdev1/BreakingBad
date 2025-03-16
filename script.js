// Fetch & Display a Random Character Function
document.getElementById("randomCharacterBtn").addEventListener("click", getRandomCharacter);

async function getRandomCharacter() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
  
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const character = data.results[randomIndex];
  
    document.getElementById("characterContainer").innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.img}" alt="${character.name}">
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Locatioin:</strong> ${character.location.name}</p>
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
  { quote: "Nothing matters, nobody exists on purpose.", author: "Morty Smith" },
  { quote: "Sometimes science is more art than science.", author: "Rick Sanchez" },
  { quote: "Nobody exists on purpose. Nobody belongs anywhere. We’re all going to die.", author: "Morty Smith" }
];

// Fetch and Display a Random Quote
document.getElementById("startGameBtn").addEventListener("click", startGuessQuoteGame);

function startGuessQuoteGame() {
  const randomIndex = Math.floor(Math.random() * rickAndMortyQuotes.length);
  const selectedQuote = rickAndMortyQuotes[randomIndex];

  document.getElementById("quoteContainer").innerHTML =   `
    <h2>"${selectedQuote.quote}"</h2>
  `;

  generateOptions(selectedQuote);
}

// Multiple Choce Options Function
async function generateOptions(correctAnswer) {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const characters = await response.json();

  let options = [correctAnswer];

  while (options.length < 4) {
    let randomCharacter = characters.results[Math.floor(Math.random() * characters.results.length)].name;
    if (!options.includes(randomCharacter)){
      options.push(randomCharacter);
    }
  }

  options = options.sort(() => Math.random() - 0.5); // Shuffle options

document.getElementById("optionsContainer").innerHTML = "";
options.forEach(option => {
  let button = document.createElement("button");
  button.textContent = option;
  button.onclick = () => checkAnswer(option, correctAnswer);
  document.getElementById("optionsContainer").appendChild(button);
});
}

// Error handling
function checkAnswer(selected, correct) {
    if (selected === correct) {
      alert("Correct!");
    } else {
      alert(`Wrong! The correct answer was: ${correct}`);
    }
}
