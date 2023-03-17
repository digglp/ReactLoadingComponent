export class RepositoryConfigs {
  static configuration = {
    development: {
      characterUrl: "https://rickandmortyapi.com/api/character",
    },
    beta: {
      characterUrl: "https://rickandmortyapi.com/api/character",
    },
    production: {
      characterUrl: "https://rickandmortyapi.com/api/character",
    },
  } as any;

  static getCharacterUrl(environment: string) {
    return this.getUrl(environment, "characterUrl");
  }

  private static getUrl(environment: string, url: string) {
    if (environment) return RepositoryConfigs.configuration[environment][url];
    else throw new Error("No environment found");
  }
}
