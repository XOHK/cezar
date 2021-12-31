const ENG_CON = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "z",
];
const ENG_VOI = ["a", "e", "i", "o", "u", "y"];

const RUS_CON = [
  "б",
  "в",
  "г",
  "д",
  "ж",
  "з",
  "й",
  "к",
  "л",
  "м",
  "н",
  "п",
  "р",
  "с",
  "т",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
];
const RUS_VOI = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

window.onload = function () {
  const encryptButton = document.getElementById("encryptButton");
  encryptButton.addEventListener("click", encrypt);

  const decryptButton = document.getElementById("decryptButton");
  decryptButton.addEventListener("click", decrypt);

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clear);

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", copy);
};

function encrypt() {
  const textElement = document.getElementById("text");
  const text = textElement.value;

  const decryptedText = document.getElementById("decryptedText");
  decryptedText.value = cezar(text);
}

function decrypt() {
  const textElement = document.getElementById("text");
  const text = textElement.value;

  const decryptedText = document.getElementById("decryptedText");
  decryptedText.value = cezar(text, false);
}

function clear() {
  const textElement = document.getElementById("text");
  textElement.value = "";
  const decryptedText = document.getElementById("decryptedText");
  decryptedText.value = "";
}

function copy() {
  const decryptedText = document.getElementById("decryptedText");
  // decryptedText.select();
  navigator.clipboard.writeText(decryptedText.value);
}

function cezar(text, isEncript = true) {
  const newWords = [];
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let newWord = "";
    const wordLength = word.length;
    for (let j = 0; j < wordLength; j++) {
      const symbol = word[j];
      const newSymbol = getNewSymbol(
        symbol,
        wordLength * (isEncript ? 1 : -1),
        [ENG_CON, ENG_VOI, RUS_CON, RUS_VOI, DIGITS]
      );
      newWord += newSymbol;
    }
    newWords.push(newWord);
  }
  return newWords.join(" ");

  function getNewSymbol(symbol, offset, charsList) {
    let newSymbol = symbol;
    const lowerSymbol = symbol.toLowerCase();

    for (let i = 0; i < charsList.length; i++) {
      const chars = charsList[i];
      if (chars.indexOf(lowerSymbol) !== -1) {
        newSymbol = checkSymbol(symbol, offset, chars);
        break;
      }
    }
    return newSymbol;
  }

  function checkSymbol(symbol, offset, arr) {
    const index = arr.indexOf(symbol.toLowerCase());
    const newIndex =
      (((index + offset) % arr.length) + arr.length) % arr.length;
    const newSymbol = arr[newIndex];
    return symbol === symbol.toUpperCase()
      ? newSymbol.toUpperCase()
      : newSymbol;
  }
}
