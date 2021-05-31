// @ts-check

const chars = 'おうちまんこ'.split('');
const validWords = [
  'うんこ',
  'うんち',
  'ちんこ',
  'ちんちん',
  'おちんちん',
  'ちこう',
  'まんこ',
  'おまんこ',
  'こおまん',
  'こうまん',
];
/** @typedef {{ char: string, valid: boolean} | null} Block */

/**
 * @param {string} target
 * @returns {string[]}
 */
const getIncludedChars = (target) => target
  .split('')
  .filter((c) => chars.includes(c));

/**
 * @argument {string} target
 */
const isValid = (target) => {
  const rows = parse(target);
  const cols = transpose(rows);
  rows.forEach((row) => validationLine(row));
  cols.forEach((col) => validationLine(col));
  return rows.every(
    (row) => row.filter((b) => b != null).every((b) => b.valid === true)
  );
};

/**
 * @argument {string} target
 * @returns {Block[][]}
 */
const parse = (target) => target
  .split('\n')
  .filter((l) => !l.match(/^\s*$/))
  .map((l) => l.split('').map((char) => chars.includes(char)
    ? { char, valid: false }
    : null
  ));

/**
 * @argument {Block[][]} target
 * @returns {Block[][]}
 */
const transpose = (target) => target[0].map((_, i) => target.map(row => row[i]));

/**
 * @param {Block[]} line
 */
const validationLine = (line) => {
  for (let i = 0; i < line.length; i++) {
    for (let j = i; j <= line.length; j++) {
      const word = line.slice(i, j);
      if (word.findIndex((b) => b === null) !== -1) continue;
      validationWord(word);
    }
  }
  return line;
};

/**
 * @param {Block[]} word
 * @returns {Block[]}
 */
const validationWord = (word) => {
  if (word.some((b) => b == null)) throw new Error('Word must not have null');
  const wordString = word
    .map(({ char }) => char)
    .join('');
  if (!isValidWord(wordString)) return word;
  word.forEach((v) => { v.valid = true; });
  return word;
};

/**
 * @param {string} word
 * @returns {boolean}
 */
const isValidWord = (word) => validWords.includes(word);

module.exports = {
  chars,
  validWords,
  getIncludedChars,
  isValid,
  parse,
  transpose,
  validationLine,
  validationWord,
  isValidWord,
};
