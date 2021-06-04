import { NkopiChar } from "./types.ts";

export const nkopiCharFromChar = (char: string): NkopiChar | null => {
  switch (char) {
    case "お":
    case "う":
    case "ち":
    case "ま":
    case "ん":
    case "こ":
      return char;
    default:
      return null;
  }
};
