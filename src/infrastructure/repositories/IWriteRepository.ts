export interface IWriteRepository {
  postDataToUrlAsync(url: string, data: any): Promise<{}>;
}
