import { IRickAndMortyCharacterRepository } from "./../../../infrastructure/repositories/rickandmortyrepository/IRickAndMortyCharacterRepository";
import { IHandler } from "../IHandler";
import { CharacterListRequest } from "../../models/CharacterListRequest";

export class CharacterListHandler implements IHandler {
  constructor(private rickAndMortyCharacterRepository: IRickAndMortyCharacterRepository) {}
  async runAsync(characterRequest: CharacterListRequest): Promise<any> {
    const response = await this.rickAndMortyCharacterRepository.getCharactersAsync(characterRequest.pageNumber);

    if (characterRequest.simulatedDelayMs > 0) await this.wait(characterRequest.simulatedDelayMs);

    return response.results;
  }

  wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}
