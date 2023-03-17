import axios from "axios";

export const mockedAxios = axios as jest.Mocked<typeof axios>;

export const testApiKey = "1234567890";
export const testEnvironment = "development";
let OLD_ENV = process.env;

export const setupTestEnvironment = () => {
  OLD_ENV = process.env;

  process.env = {
    ...OLD_ENV,
    REACT_APP_ENVVIRONMENT: "development",
  };
};

export const restoreEnvironment = () => {
  process.env = OLD_ENV;
};

export const getAxiosHeaders = () => {
  return {
    headers: {},
    timeout: 10000,
  };
};

export enum Verb {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}
export const mockResolvedValue = (value: any, verb: Verb) => {
  if (verb === Verb.GET) {
    mockedAxios.get.mockResolvedValue(value);
  }
  if (verb === Verb.POST) {
    mockedAxios.post.mockResolvedValue(value);
  }
  if (verb === Verb.PUT) {
    mockedAxios.put.mockResolvedValue(value);
  }
  if (verb === Verb.DELETE) {
    mockedAxios.delete.mockResolvedValue(value);
  }
};

export const mockRejectedValue = (value: any, verb: Verb) => {
  if (verb === Verb.GET) {
    mockedAxios.get.mockRejectedValue(value);
  }
  if (verb === Verb.POST) {
    mockedAxios.post.mockRejectedValue(value);
  }
  if (verb === Verb.PUT) {
    mockedAxios.put.mockRejectedValue(value);
  }
  if (verb === Verb.DELETE) {
    mockedAxios.delete.mockRejectedValue(value);
  }
};
