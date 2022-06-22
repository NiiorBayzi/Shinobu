const term = new Map();
const words = ["imagem", "gaveta", "condutor", "parafuso", "teoria", "luzes", "norte", "amanhecer", "sentidos", "baterias"];

function createTerm (first, authorId) {
  if (!term.get(authorId)) return false;
  let word = words[Math.floor(Math.random()*words.length)];
  term.set(authorId, { word: word, attempts: [first] });
  return { word: word };
}

function stopTerm (authorId) {
  if (!term.get(authorId)) return false;
  return term.delete(authorId);
}

function addWord (word, authorId) {
  let map = term.get(authorId);
  if (!map) return false;
  let word = map.word.split("");
  let answer = word.split("");
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

  term.set({ word: map.word, attempts: map.attempts.push(word), correct: correct, emojisArr: arr, win: correct === word.length });
  return term.get(authorId);
}

let functions = {
  create: createTerm,
  stop: stopTerm,
  add: addWord
}

module.exports = {...functions}
