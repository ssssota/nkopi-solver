import { parseProblem } from "./nkopi";

const problem = parseProblem(`
んうまう　
んまここ　
こん　こ　
　ま　　　
　ちうまお
`);

console.log(problem.chars);
console.log(problem.root);
