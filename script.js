let flashcards = [];
let currentIndex = 0;
let showAnswer = false;

// Load the CSV file
fetch("flashcards.csv")
    .then(response => response.text())
    .then(data => {
        flashcards = data.trim().split("\n").slice(1).map(line => {
            let [filename, answer] = line.split(",");
            return { image: `images/${filename}`, answer: answer.trim() };
        });
        updateFlashcard();
    });

// Update the flashcard display
function updateFlashcard() {
    let cardImage = document.getElementById("cardImage");
    let cardText = document.getElementById("cardText");

    if (showAnswer) {
        cardImage.classList.add("hidden");
        cardText.classList.remove("hidden");
        cardText.innerText = flashcards[currentIndex].answer;
    } else {
        cardImage.classList.remove("hidden");
        cardText.classList.add("hidden");
        cardImage.src = flashcards[currentIndex].image;
    }
}

// Flip the card on click
document.getElementById("flashcard").addEventListener("click", () => {
    showAnswer = !showAnswer;
    updateFlashcard();
});

// Navigate to the next card
function nextCard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    showAnswer = false;
    updateFlashcard();
}

// Navigate to the previous card
function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    showAnswer = false;
    updateFlashcard();
}