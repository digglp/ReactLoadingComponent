import axios, { AxiosRequestConfig } from "axios";

import { IReadRepository } from "./IReadRepository";

export class BaseReadRepository<T> implements IReadRepository<T> {
  async getDataFromUrlAsync(url: string): Promise<T> {
    const requestConfig = {
      headers: {},
      timeout: 10000,
    } as AxiosRequestConfig;

    const response = await axios.get(url, requestConfig);
    const data = response.data;

    return data;
  }
}
