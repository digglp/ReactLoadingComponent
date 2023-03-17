export interface IReadRepository<T> {
  getDataFromUrlAsync(url: string): Promise<T>;
}
