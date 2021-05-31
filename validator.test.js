const {
  isValid,
  isValidWord,
  parse,
  transpose,
  validationLine,
  validationWord,
} = require('./validator');

describe('isValid', () => {
  it('ちんこはvalid', () => {
    expect(isValid('ちんこ')).toBe(true);
  });
  it('縦ちんこはvalid', () => {
    expect(isValid('ち\nん\nこ')).toBe(true);
  });
  it('交差ちんこはvalid', () => {
    const target = `
　ち　
ちんこ
　こ　
`
    expect(isValid(target)).toBe(true);
  });
  it('交差ちんこはvalid2', () => {
    const target = `
　　ち　
　　ん　
ちんこ　
`
    expect(isValid(target)).toBe(true);
  });
  it('うんこ×ちんこはvalid', () => {
    const target = `
　　ち
　　ん
うんこ
`
    expect(isValid(target)).toBe(true);
  });
  it('うんち×ちんちはinvalid', () => {
    const target = `
　　ち
　　ん
うんち
`
    expect(isValid(target)).toBe(false);
  });
});
describe('isValidWord', () => {
  it('ちんこはvalidなのでtrueを返す', () => {
    expect(isValidWord('ちんこ')).toBe(true);
  });
  it('うんこはvalidなのでtrueを返す', () => {
    expect(isValidWord('うんこ')).toBe(true);
  });
  it('うんちはvalidなのでtrueを返す', () => {
    expect(isValidWord('うんち')).toBe(true);
  });
  it('おちんちんはvalidなのでtrueを返す', () => {
    expect(isValidWord('おちんちん')).toBe(true);
  });
  it('まんこはvalidなのでtrueを返す', () => {
    expect(isValidWord('まんこ')).toBe(true);
  });
  it('おまんこはvalidなのでtrueを返す', () => {
    expect(isValidWord('おまんこ')).toBe(true);
  });
  it('ちんちんはvalidなのでtrueを返す', () => {
    expect(isValidWord('ちんちん')).toBe(true);
  });
  it('ちこうはvalidなのでtrueを返す', () => {
    expect(isValidWord('ちこう')).toBe(true);
  });
  it('こおまんはvalidなのでtrueを返す', () => {
    expect(isValidWord('こおまん')).toBe(true);
  });
  it('こうまんはvalidなのでtrueを返す', () => {
    expect(isValidWord('こうまん')).toBe(true);
  });
  it('おちんこはinvalidなのでfalseを返す', () => {
    expect(isValidWord('おちんこ')).toBe(false);
  });
  it('まんまんはinvalidなのでfalseを返す', () => {
    expect(isValidWord('まんまん')).toBe(false);
  });
});
describe('parse', () => {
  it('ワンライン', () => {
    expect(parse('ちんこ')).toStrictEqual([[
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
    ]]);
  });
  it('ワンライン2', () => {
    expect(parse('ち\nん\nこ')).toStrictEqual([
      [{ char: 'ち', valid: false }],
      [{ char: 'ん', valid: false }],
      [{ char: 'こ', valid: false }],
    ]);
  });
  it('交差', () => {
    const target = `
　ち　
ちんこ
　こ　`;
    expect(parse(target)).toStrictEqual([
      [null, { char: 'ち', valid: false }, null],
      [
        { char: 'ち', valid: false },
        { char: 'ん', valid: false },
        { char: 'こ', valid: false },
      ],
      [null, { char: 'こ', valid: false }, null],
    ]);
  });
});
describe('transpose', () => {
  it('ワンライン', () => {
    expect(transpose(parse('ちんこ'))).toStrictEqual([
      [{ char: 'ち', valid: false }],
      [{ char: 'ん', valid: false }],
      [{ char: 'こ', valid: false }],
    ]);
  });
  it('ワンライン2', () => {
    expect(transpose(parse('ち\nん\nこ'))).toStrictEqual([[
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
    ]]);
  });
  it('交差', () => {
    const target = [
      [null, { char: 'ち', valid: false }, null],
      [
        { char: 'ち', valid: false },
        { char: 'ん', valid: false },
        { char: 'こ', valid: false },
      ],
      [null, { char: 'こ', valid: false }, null],
    ];
    expect(transpose(target)).toStrictEqual(target);
  });
  it('交差2', () => {
    const target = [
      [null, { char: 'ち', valid: true }, null],
      [
        { char: 'ち', valid: false },
        { char: 'ん', valid: false },
        { char: 'こ', valid: false },
      ],
      [null, { char: 'こ', valid: false }, null],
    ];
    const expected = [
      [null, { char: 'ち', valid: false }, null],
      [
        { char: 'ち', valid: true },
        { char: 'ん', valid: false },
        { char: 'こ', valid: false },
      ],
      [null, { char: 'こ', valid: false }, null],
    ];
    expect(transpose(target)).toStrictEqual(expected);
  });
});
describe('validationLine', () => {
  it('ちんこはvalidなのですべてvalid:trueに', () => {
    expect(validationLine([
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
    ])).toStrictEqual([
      { char: 'ち', valid: true },
      { char: 'ん', valid: true },
      { char: 'こ', valid: true },
    ]);
  });
  it('ちんこはvalidなのですべてvalid:trueに2', () => {
    expect(validationLine([
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
      null,
    ])).toStrictEqual([
      { char: 'ち', valid: true },
      { char: 'ん', valid: true },
      { char: 'こ', valid: true },
      null,
    ]);
  });
  it('ちんこはvalidなのですべてvalid:trueに3', () => {
    expect(validationLine([
      null,
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
    ])).toStrictEqual([
      null,
      { char: 'ち', valid: true },
      { char: 'ん', valid: true },
      { char: 'こ', valid: true },
    ]);
  });
  it('ちんこはvalidなのでちんこだけvalid:trueに', () => {
    expect(validationLine([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      { char: 'う', valid: false },
      null,
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
    ])).toStrictEqual([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      { char: 'う', valid: false },
      null,
      { char: 'ち', valid: true },
      { char: 'ん', valid: true },
      { char: 'こ', valid: true },
    ]);
  });
  it('うんうはinvalidなのでかわらない', () => {
    expect(validationLine([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      { char: 'う', valid: false },
    ])).toStrictEqual([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      { char: 'う', valid: false },
    ]);
  });
  it('空配列はそのまま', () => {
    expect(validationLine([])).toStrictEqual([]);
  });
});
describe('validationWord', () => {
  it('ちんこはvalidなのですべてvalid:trueに', () => {
    expect(validationWord([
      { char: 'ち', valid: false },
      { char: 'ん', valid: false },
      { char: 'こ', valid: false },
    ])).toStrictEqual([
      { char: 'ち', valid: true },
      { char: 'ん', valid: true },
      { char: 'こ', valid: true },
    ]);
  });
  it('うんうはinvalidなのでかわらない', () => {
    expect(validationWord([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      { char: 'う', valid: false },
    ])).toStrictEqual([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      { char: 'う', valid: false },
    ]);
  });
  it('空配列はそのまま', () => {
    expect(validationWord([])).toStrictEqual([]);
  });
  it('nullはthrow', () => {
    expect(() => validationWord([
      { char: 'う', valid: false },
      { char: 'ん', valid: false },
      null,
      { char: 'う', valid: false },
    ])).toThrow();
  });
});
