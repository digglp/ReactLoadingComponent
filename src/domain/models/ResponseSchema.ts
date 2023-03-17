import { Character } from "./Character";

export class ResponseSchema {
  info: Info = new Info();
  results: Character[] = [];
}

export class Info {
  count: number = 0;
  pages: number = 0;
  next: string = "";
  prev: string = "";
}
