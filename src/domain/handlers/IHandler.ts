export interface IHandler {
  runAsync(request?: any): Promise<any>;
}
