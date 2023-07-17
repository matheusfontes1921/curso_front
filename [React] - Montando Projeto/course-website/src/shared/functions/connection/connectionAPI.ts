import { MethodsEnum } from "../../enums/methods.enum";
import axios, {AxiosRequestConfig} from "axios";
import { ERROR_ACCESS_DENIED, ERROR_CONNECTION } from "../../constants/errorStatus";
import {getAuthorizationToken} from "./auth";
export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'
export default class ConnectionAPI {
  static async call<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: getAuthorizationToken(),
        "Content-Type": "application/json",
      },
    };
    switch (method) {
      case MethodsEnum.GET:
      case MethodsEnum.DELETE:
      default:
        return (await axios[method]<T>(url, config)).data;
      case MethodsEnum.POST:
      case MethodsEnum.PATCH:
      case MethodsEnum.PUT:
        return (await axios[method]<T>(url, body, config)).data;

    }
  }
  /*static = quando cria a função, ela nunca muda
   * deixa o código mais leve */
  static async connect<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    return ConnectionAPI.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401 || 403:
            throw new Error(ERROR_ACCESS_DENIED);
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }
      throw new Error(ERROR_CONNECTION);
    });
  }
}
export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.GET);
};
export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.DELETE);
};
export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.POST, body);
};
export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.PATCH, body);
};
export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.PUT, body);
};