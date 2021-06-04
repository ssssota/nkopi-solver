import { nkopiCharFromChar } from "./char.ts";
import { NkopiChar, NkopiNode, NkopiProblem } from "./types.ts";

export const parseProblem = (input: string): NkopiProblem => {
  const chars: NkopiChar[] = [];
  const nodes: NkopiNode[][] = input
    .split("\n")
    .filter((line) => !line.match(/^\s*$/))
    .map((line) =>
      line.split("").map((char: string) => {
        const parsedChar = nkopiCharFromChar(char);
        if (parsedChar !== null) chars.push(parsedChar);
        return {
          parents: [undefined, undefined],
          children: [undefined, undefined],
          char: (parsedChar === null) ? null : undefined,
        };
      })
    );

  const height = nodes.length;
  const width = nodes[0]?.length;

  if (
    height === 0 || width === 0 || nodes.some((line) => line.length !== width)
  ) {
    throw new Error("Invalid input.");
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const current = nodes[y][x];

      if (x > 0) {
        const left = nodes[y][x - 1];
        current.parents[0] = left;
        left.children[1] = current;
      }
      if (y > 0) {
        const top = nodes[y - 1][x];
        current.parents[1] = top;
        top.children[0] = current;
      }
    }
  }

  return { chars, root: nodes[0][0] };
};
