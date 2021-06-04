export const nkopiChars = ["お", "ま", "ん", "こ", "う", "ち"] as const;
export type NkopiChar = typeof nkopiChars[number];

export type NkopiNode = {
  parents: [NkopiNode | undefined, NkopiNode | undefined];
  children: [NkopiNode | undefined, NkopiNode | undefined];
  /** If null, this node must be blank. If undefined, this node is pending. */
  char: NkopiChar | undefined | null;
};

export type NkopiProblem = {
  chars: NkopiChar[];
  root: NkopiNode;
};
