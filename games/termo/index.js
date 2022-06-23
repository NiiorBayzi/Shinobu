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
  let answer = newWord.split("").slice(0, word.length);
  let arr = [];

  answer.forEach(x => {
    if (word.indexOf(x) === answer.indexOf(x)) {
      arr.push(emoji.green_square);
    } else if (word.includes(x)) {
      arr.push(emoji.yellow_square);
    } else {
      arr.push(emoji.black_square);
    }
  });
  String(` ${emoji.red_square}`).repeat(word.length - answer.length).trim().split(" ").forEach(x => arr.push(x));

  let correct = arr.filter(x => x === emoji.green_square).length;
  map.attempts.push(`${arr.join(" ")} - ${newWord}`);
  term.set(authorId, { word: map.word, attempts: map.attempts });
  return { word: map.word, attempts: map.attempts, correct: correct, win: correct === word.length };
}

let functions = {
  create: createTerm,
  stop: stopTerm,
  add: addWord
}

module.exports = {...functions}
