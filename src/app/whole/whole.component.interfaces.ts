import { SingleMethod } from "../services/methods-data.service.interfaces";

export const EmptyMethod: SingleMethod = {
  example: "",
  allTypings: "",
  rambdaSource: "",
  typing: "",
};
export type Category =
  | "all"
  | "string"
  | "async"
  | "lenses"
  | "object"
  | "list"
  | "function"
  | "logic";
export type Mode =
  | "repl"
  | "all.typings"
  | "tests"
  | "typings.tests";

export type SnippetMode =
  | "source"
  | "tests"
  | "all.typings"
  | "typings.tests";

export interface SingleMode {
  text: string;
  mode: Mode;
}
export const ALL_MODES: SingleMode[] = [
  { text: "REPL", mode: "repl" },
  {
    text: "Typescript definitions",
    mode: "all.typings",
  },
  { text: "Tests", mode: "tests" },
  {
    text:
      "Typescript definitions tests",
    mode: "typings.tests",
  },
];
export const ALL_CATEGORIES: Category[] = [
  "all",
  "async",
  "lenses",
  "function",
  "list",
  "logic",
  "object",
  "string",
];
