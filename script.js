// ===== RANDOM CHARACTER GENERATOR =====
document.getElementById("randomCharacterBtn").addEventListener("click", getRandomCharacter);

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
    console.error("Error fetching random character:", error);
  }
}

// ===== HARD-CODED QUOTES FOR THE GAME =====
const rickAndMortyQuotes = [
  { quote: "Wubba Lubba Dub Dub!", author: "Rick Sanchez" },
  { quote: "I'm Pickle Rick!", author: "Rick Sanchez" },
  { quote: "Get Schwifty!", author: "Rick Sanchez" },
  { quote: "Nothing matters, nobody exists on purpose.", author: "Morty Smith" },
  { quote: "Sometimes science is more art than science.", author: "Rick Sanchez" },
  { quote: "Nobody exists on purpose. Nobody belongs anywhere. We’re all going to die.", author: "Morty Smith" }
];

// ===== FETCH ALL CHARACTERS FOR THE GAME =====
async function fetchAllCharacters() {
  let allCharacters = [];
  let nextUrl = "https://rickandmortyapi.com/api/character";

  while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      allCharacters = allCharacters.concat(data.results);
      nextUrl = data.info.next; // Move to next page if available
  }

  return allCharacters;
}

// ===== GUESS THE QUOTE GAME START =====
document.getElementById("startGameBtn").addEventListener("click", startGuessQuoteGame);

async function startGuessQuoteGame() {
  try {
    const allCharacters = await fetchAllCharacters();  // fetch characters once here and pass along
    const randomIndex = Math.floor(Math.random() * rickAndMortyQuotes.length);
    const selectedQuote = rickAndMortyQuotes[randomIndex];

    document.getElementById("quoteContainer").innerHTML = `
      <h2>"${selectedQuote.quote}"</h2>
    `;

    generateOptions(selectedQuote.author, allCharacters);
  } catch (error) {
    console.error("Error starting the quote game:", error);
  }
}

// ===== GENERATE MULTIPLE-CHOICE OPTIONS WITH IMAGES =====
function generateOptions(correctAnswer, allCharacters) {
  let options = [correctAnswer];

  // Generate 3 random, non-duplicate options
  while (options.length < 4) {
    let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)].name;
    if (!options.includes(randomCharacter)) {
      options.push(randomCharacter);
    }
  }

  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";  // Clear old options

  options.forEach(option => {
    const characterData = allCharacters.find(c => c.name === option);

    if (!characterData) return; // If character not found, skip

    // Create container div for each choice
    const choiceDiv = document.createElement("div");
    choiceDiv.style.margin = "15px";
    choiceDiv.style.display = "inline-block";
    choiceDiv.style.textAlign = "center";

    // Character image
    const img = document.createElement("img");
    img.src = characterData.image;
    img.alt = option;
    img.style.width = "100px";
    img.style.borderRadius = "10px";
    img.style.display = "block";
    img.style.marginBottom = "5px";

    // Character name button
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, correctAnswer);

    choiceDiv.appendChild(img);
    choiceDiv.appendChild(button);

    optionsContainer.appendChild(choiceDiv);
  });
}

// ===== CHECK ANSWER & DISPLAY RESULT ON PAGE =====
function checkAnswer(selected, correct) {
  const resultContainer = document.getElementById("resultContainer");

  if (selected === correct) {
    resultContainer.innerHTML = `
      <p style="color: green; font-size: 20px;">✅ Correct! ${correct} said: "${document.getElementById("quoteContainer").textContent}"</p>
    `;
  } else {
    resultContainer.innerHTML = `
      <p style="color: red; font-size: 20px;">❌ Wrong! The correct answer was: ${correct}</p>
    `;
  }
}