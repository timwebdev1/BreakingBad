
// Fetch & Display a Random Character Function
document.getElementById("randomCharacterBtn").addEventListener("click", getRandomCharacter);

async function getRandomCharacter() {
  const response = await fetch("https://www.breakingbadapp.com/api/characters");
  const characters = await response.json();

  const randomIndex = Math.floor(Math.random() * characters.length);
  const character = characters[randomIndex];

  document.getElementById("characterContainer").innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.img}" alt="${character.name}">
    <p><strong>Occupation:</strong> ${character.occupation.join(", ")}</p>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Portrayed by:</strong> ${character.portrayed}</p>
  `;
}

// Fetch & Display Random Quote Function
document.getElementById("startGameBtn").addEventListener("click", startGuessQuoteGame);

async function startGuessQuoteGame() {
  const response = await fetch("https://www.breakingbadapi.com/api/quote/random");
  const quoteData = await response.json();
  const quote = quoteData[0];

  document.getElementById("quoteContainer").innerHTML =  `
    <h2>"${quote.quote}"</h2>
  `;

  generateOptions(quote.author);
}

// Multiple Choce Options Function
async function generateOptions(correctAnswer) {
  const response = await fetch("https://www.breakingbadapi.com/api/characters");
  const characters = await response.json();

  let options = [correctAnswer];

  while (options.length < 4) {
    let randomCharacter = characters[Math.floor(Math.random() * characters.length)].name;
    if (!options.push(randomCharacter)){
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
