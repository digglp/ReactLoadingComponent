import { IRickAndMortyCharacterRepository } from "./IRickAndMortyCharacterRepository";
import { RepositoryConfigs } from "./../RepositoryConfigs";
import { BaseReadRepository } from "../BaseReadRepository";
import { ResponseSchema } from "../../../domain/models/ResponseSchema";

export class RickAndMortyCharacterRepository
  extends BaseReadRepository<ResponseSchema>
  implements IRickAndMortyCharacterRepository
{
  url;

  constructor(environment: string) {
    super();
    this.url = RepositoryConfigs.getCharacterUrl(environment);
  }

  async getCharactersAsync(pageNumber: number): Promise<ResponseSchema> {
    const url = `${this.url}?page=${pageNumber}`;
    const characters = await this.getDataFromUrlAsync(url);

    return characters;
  }
}
