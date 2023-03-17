export class CharacterListRequest {
  constructor(public simulatedDelayMs: number = 1, public pageNumber: number) {
    this.simulatedDelayMs = simulatedDelayMs;
    this.pageNumber = pageNumber;
  }
}
