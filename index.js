// @ts-check
const { getIncludedChars, chars, isValid } = require("./validator");

const target = `
　　お
　こま
　んこ
ちちう
こお　
んんん
ま　　
ち　　`;

const includedChars = getIncludedChars(target);
const replaceable = target
  .split('\n')
  .filter((l) => l !== '')
  .map(
    (l) => l
      .split('')
      .map((c) => chars.includes(c) ? '？' : '　')
      .join('')
  )
  .join('\n');

/**
 * @param {string} target
 * @param {string[]} chars
 * @returns {boolean}
 */
const recursive = (target, chars) => {
  const questionIndex = target.indexOf('？');
  if (chars.length === 0) {
    if (isValid(target)) {
      console.log(target);
      return true;
    }
  }
  for (let i = 0; i < chars.length; i++) {
    const clonedChars = [...chars];
    const targetChar = clonedChars.splice(i, 1)[0];
    const newTarget = [...target];
    newTarget.splice(questionIndex, 1, targetChar);

    const result = recursive(newTarget.join(''), clonedChars);
    if (result) return true;
  }
  return false;
};

recursive(replaceable, includedChars);
