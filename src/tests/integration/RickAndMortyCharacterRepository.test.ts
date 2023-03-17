import { RepositoryConfigs } from "../../infrastructure/repositories/RepositoryConfigs";
import { CharacterListHandler } from "../../domain/handlers/RickAndMortyHandlers/CharacterListHandler";
import { RickAndMortyCharacterRepository } from "../../infrastructure/repositories/rickandmortyrepository/RickAndMortyCharacterRepository";
import axios from "axios";
import {
  setupTestEnvironment,
  restoreEnvironment,
  mockResolvedValue,
  Verb,
  testEnvironment,
  getAxiosHeaders,
  mockRejectedValue,
} from "./TestBase";
import { CharacterListRequest } from "../../domain/models/CharacterListRequest";

jest.mock("axios");

describe("Character List API Test Suite", () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    restoreEnvironment();
  });

  it("should return character data", async () => {
    mockResolvedValue(getValidCharacterDataResponse(), Verb.GET);

    const rickAndMortyCharacterRepository = new RickAndMortyCharacterRepository(testEnvironment);
    const characterListHandler = new CharacterListHandler(rickAndMortyCharacterRepository);

    const characterList = await characterListHandler.runAsync(new CharacterListRequest(0, 0));

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(RepositoryConfigs.getCharacterUrl(testEnvironment)),
      getAxiosHeaders()
    );
    expect(characterList).toEqual(getValidCharacterDataResponse().data.results);
  });
  it("should throw error when network fails", async () => {
    mockRejectedValue(new Error("Test axios error"), Verb.GET);
    const rickAndMortyCharacterRepository = new RickAndMortyCharacterRepository(testEnvironment);
    const characterListHandler = new CharacterListHandler(rickAndMortyCharacterRepository);

    await expect(characterListHandler.runAsync(new CharacterListRequest(0, 0))).rejects.toThrow(
      "Error getting character data"
    );
  });
});

const getValidCharacterDataResponse = () => {
  return {
    data: {
      info: {
        count: 671,
        pages: 34,
        next: "https://rickandmortyapi.com/api/character/?page=2",
        prev: "",
      },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
        },
        {
          id: 2,
          name: "Morty Smith",
          status: "Alive",
          species: "Human",
          type: "",
        },
      ],
    },
  };
};
