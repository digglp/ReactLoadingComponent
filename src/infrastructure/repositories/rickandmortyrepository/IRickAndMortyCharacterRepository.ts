import { Character } from "../../../domain/models/Character";
import { ResponseSchema } from "../../../domain/models/ResponseSchema";

export interface IRickAndMortyCharacterRepository {
  getCharactersAsync(pageNumber: number): Promise<ResponseSchema>;
}
