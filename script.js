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

const ENCRYPT = "encrypt";
const DECRYPT = "decrypt";

let encryptMode = ENCRYPT;

window.onload = function () {
  const textElement = document.getElementById("text");
  textElement.addEventListener("keyup", onTextChange);

  const encryptRadio = document.getElementById("encryptRadio");
  encryptRadio.checked = true;
  encryptRadio.addEventListener("click", changeMode);

  const decryptRadio = document.getElementById("decryptRadio");
  decryptRadio.addEventListener("click", changeMode);

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clear);

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", copy);
};

function onTextChange() {  
  if (encryptMode === ENCRYPT) {
    encrypt();
  } else {
    decrypt();
  }
}

function changeMode() {
  const encryptRadio = document.getElementById("encryptRadio");  
  encryptMode = encryptRadio.checked ? ENCRYPT : DECRYPT;
  if (encryptMode === ENCRYPT) {
    encrypt();
  } else {
    decrypt();
  }
}

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
      (((index + offset * 2) % arr.length) + arr.length) % arr.length;
    const newSymbol = arr[newIndex];
    return symbol === symbol.toUpperCase()
      ? newSymbol.toUpperCase()
      : newSymbol;
  }
}
