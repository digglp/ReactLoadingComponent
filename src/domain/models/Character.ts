import { Location } from "./Location";

export class Character {
  id: number = 0;
  name: string = "";
  status: string = "";
  species: string = "";
  type: string = "";
  location: Location = new Location();
}
