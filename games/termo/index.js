const term = new Map();
const words = ["imagem", "gaveta", "condutor", "parafuso", "teoria", "luzes", "norte", "amanhecer", "sentidos", "baterias"];

function createTerm (first, authorId) {
  if (term.get(authorId)) return false;
  let word = words[Math.floor(Math.random()*words.length)];
  term.set(authorId, { word: word, attempts: [] });
  return addWord(first, authorId);
}

function stopTerm (authorId) {
  if (!term.get(authorId)) return false;
  return term.delete(authorId);
}

function addWord (newWord, authorId) {
  let map = term.get(authorId);
  if (!map) return false;
  let word = map.word.split("");
  let answer = newWord.split("");
  let arr = [];

  answer.forEach(x => {
    if (word.indexOf(x) === answer.indexOf(x)) {
      arr.push("🟩");
    } else if (word.includes(x)) {
      arr.push("🟨");
    } else {
      arr.push("🟥");
    }
  });
  let correct = arr.filter(x => x === "🟩").length;
  map.attempts.push(newWord);
  term.set(authorId, { word: map.word, attempts: map.attempts });
  return { word: map.word, attempts: map.attempts, correct: correct, emojisArr: arr, win: correct === word.length };
}

let functions = {
  create: createTerm,
  stop: stopTerm,
  add: addWord
}

module.exports = {...functions}
