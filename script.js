document.getElementById("randomCharacterBtn").addEventListener("click", getRandomCharacter);

async function getRandomCharacter() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
  
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const character = data.results[randomIndex];
  
    document.getElementById("characterContainer").innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <div class="character-info">
      <h2>${character.name}</h2>
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Location:</strong> ${character.location.name}</p>
    </div>
  `;
  } catch (error) {
    console.error("Error fetching random character:", error);
  }
}

const rickAndMortyQuotes = [
  { quote: "Wubba Lubba Dub Dub!", author: "Rick Sanchez" },
  { quote: "I'm Pickle Rick!", author: "Rick Sanchez" },
  { quote: "Get Schwifty!", author: "Rick Sanchez" },
  { quote: "Nothing matters, nobody exists on purpose.", author: "Morty Smith" },
  { quote: "Sometimes science is more art than science.", author: "Rick Sanchez" },
  { quote: "Nobody exists on purpose. Nobody belongs anywhere. We’re all going to die.", author: "Morty Smith" },
  { quote: "What, so everyone’s supposed to sleep every single night now?", author: "Rick Sanchez" },
  { quote: "Existence is pain to a Meeseeks.", author: "Mr. Meeseeks" },
  { quote: "I'm sorry, but your opinion means very little to me.", author: "Rick Sanchez" },
  { quote: "You pass butter.", author: "Butter Robot" },
  { quote: "Don’t hate the player, hate the game, son.", author: "Rick Sanchez" },
  { quote: "Nobody’s special. Get used to it.", author: "Morty Smith" },
  { quote: "Rikki-Tikki-Tavi, b*tch!", author: "Rick Sanchez" },
  { quote: "I turned myself into a pickle, Morty! I'm Pickle Rick!", author: "Rick Sanchez" },
  { quote: "To live is to risk it all; otherwise, you're just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.", author: "Rick Sanchez" },
  { quote: "Listen, Morty, I hate to break it to you, but what people call 'love' is just a chemical reaction that compels animals to breed.", author: "Rick Sanchez" },
  { quote: "I'm not arguing, I'm explaining why I'm right.", author: "Rick Sanchez" },
  { quote: "You gotta do it for Grandpa, Morty. You gotta put these seeds inside your butt.", author: "Rick Sanchez" },
  { quote: "I can't believe we're getting away with this.", author: "Jerry Smith" },
  { quote: "Unity, I'm sorry. I didn't know freedom meant people doing stuff that sucks.", author: "Rick Sanchez" },
  { quote: "Get schwifty? What the hell is that?", author: "Principal Vagina" },
  { quote: "That's the difference between you and me, Morty. I never go back to the carpet store.", author: "Rick Sanchez" },
  { quote: "When you're wearing these babies, you can basically just walk on any surface you want.", author: "Rick Sanchez" },
  { quote: "Summer, he's not a hot girl. You can't just lock him in a room and hope he falls in love with you.", author: "Beth Smith" },
  { quote: "Your parents are gonna do it. Go to your room!", author: "Rick Sanchez" },
  { quote: "Life is effort and I'll stop when I die!", author: "Jerry Smith" },
  { quote: "Oh, I'm sorry, Morty. Are you the scientist or are you the kid who wanted to get laid?", author: "Rick Sanchez" },
  { quote: "Sometimes I think I'm more harp than girl. Then I remember I don't know how to play the harp.", author: "Summer Smith" },
  { quote: "If you think my Rick's dead, he's alive, and if you think you're safe, he's coming for you!", author: "Morty Smith" },
  { quote: "Morty, where's your collar? I'll fix it.", author: "Rick Sanchez" },
  { quote: "This is the part of the story that's really fun for me!", author: "Mr. Poopybutthole" },
  { quote: "I'm Mr. Meeseeks! Look at me!", author: "Mr. Meeseeks" },
  { quote: "You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable.", author: "Rick Sanchez" },
  { quote: "What about the reality where Hitler cured cancer, Morty? The answer is: Don't think about it.", author: "Rick Sanchez" },
  { quote: "Weddings are just funerals with cake.", author: "Rick Sanchez" },
  { quote: "I don't do magic, Morty, I do science. One takes brains, the other takes dark eyeliner.", author: "Rick Sanchez" },
  { quote: "Morty, a man capable of sustaining a platonic friendship with an attractive female is theoretically possible, but I've never seen it happen.", author: "Rick Sanchez" },
  { quote: "I know that's not a popular opinion, but that's my two cents on the issue.", author: "Jerry Smith" },
  { quote: "There's a lesson here and I'm not going to be the one to figure it out.", author: "Rick Sanchez" },
  { quote: "Being nice is something stupid people do to hedge their bets.", author: "Rick Sanchez" },
  { quote: "I'm sorry, but I'd rather have a father than a lover.", author: "Beth Smith" },
  { quote: "God is not a lie, but he's a bit of an asshole.", author: "Birdperson" },
  { quote: "Love is just a chemical reaction that compels animals to breed.", author: "Rick Sanchez" },
  { quote: "You're not supposed to be here. You're like a turd that rolled out of the toilet.", author: "Jerry Smith" },
  { quote: "Yeah! I've got about a thousand memories of your dumb little ass and about six of them are pleasant.", author: "Rick Sanchez" },
  { quote: "When I don't like something about the world, I change it.", author: "Rick Sanchez" },
  { quote: "I don't care. I ain't rinsing.", author: "Rick Sanchez" }
];

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

document.getElementById("startGameBtn").addEventListener("click", startGuessQuoteGame);

async function startGuessQuoteGame() {
  try {
    document.getElementById("resultContainer").innerHTML = "";
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

function generateOptions(correctAnswer, allCharacters) {
  let options = [correctAnswer];

  // Generate 3 random, non-duplicate options
  while (options.length < 4) {
    let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)].name;
    if (!options.includes(randomCharacter)) {
      options.push(randomCharacter);
    }
  }

  options = options.sort(() => Math.random() - 0.5);

  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";  // Clear old options

  options.forEach(option => {
    const characterData = allCharacters.find(c => c.name === option);

    if (!characterData) return; // If character not found, skip

    const choiceDiv = document.createElement("div");
    choiceDiv.style.margin = "15px";
    choiceDiv.style.display = "inline-block";
    choiceDiv.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = characterData.image;
    img.alt = option;
    img.style.width = "100px";
    img.style.borderRadius = "10px";
    img.style.display = "block";
    img.style.marginBottom = "5px";

    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, correctAnswer);

    choiceDiv.appendChild(img);
    choiceDiv.appendChild(button);

    optionsContainer.appendChild(choiceDiv);
  });
}

function checkAnswer(selected, correct) {
  const optionButtons = document.querySelectorAll("#optionsContainer button");

  optionButtons.forEach(btn => {
    btn.disabled = true; // Disables buttons after selection
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "green";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "red";
    }
  });

  const resultMessage = selected === correct     
  ? `✅ Correct! The answer was: ${correct}`
  : `❌ Wrong! The correct answer was: ${correct}`;

  document.getElementById("resultContainer").innerHTML = `
  <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${resultMessage}</p>
  `;
}

const randomCharacterBtn = document.getElementById("randomCharacterBtn");
const startGameBtn = document.getElementById("startGameBtn");
const characterSection = document.getElementById("characterSection");
const gameSection = document.getElementById("gameSection");

characterSection.style.display = "none";
gameSection.style.display = "none";

randomCharacterBtn.addEventListener("click", () => {
  characterSection.style.display = "block";
  gameSection.style.display = "none";
  getRandomCharacter();
});

startGameBtn.addEventListener("click", () => {
  characterSection.style.display = "none";
  gameSection.style.display = "block";
  startGuessQuoteGame();
});