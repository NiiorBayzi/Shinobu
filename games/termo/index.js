const term = new Map();
const words = require("./words.json");

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
  word2 = word.slice();
  answer2 = answer.slice();
  let arr = [];

  answer.forEach(x => {
    if (word2[0] === answer2[0]) {
      arr.push(emoji.green_square);
      word2.shift();
      answer2.shift();
    } else if (word.includes(x)) {
      arr.push(emoji.yellow_square);
    } else {
      arr.push(emoji.black_square);
    }
  });

  let correct = arr.filter(x => x === emoji.green_square).length;
  map.attempts.push(`${arr.join(" ")} - ${answer.join("")}`);
  term.set(authorId, { word: map.word, attempts: map.attempts });
  return { word: map.word, attempts: map.attempts.slice(1, map.attempts.length), correct: correct, win: correct === word.length };
}

function infoTerm (authorId) {
  let map = term.get(authorId);
  if (!map) return false;

  return map;
}

let functions = {
  create: createTerm,
  stop: stopTerm,
  add: addWord,
  info: infoTerm
}

module.exports = {...functions}
