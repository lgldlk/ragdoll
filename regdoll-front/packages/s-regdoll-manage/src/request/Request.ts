/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-25 21:48:37
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 17:42:56
 */

import axios, { AxiosResponse } from "axios";
import { toLowerCase } from "../util";
import LocalStorage from "/@/util/LocalStorage";
class Request {
  private baseUrl?: String = "";
  private headers: any = {
    "Content-Type": "application/json",
  };
  private response: Function | undefined = undefined;

  init(props: Init) {
    this.baseUrl = props.baseUrl;
    this.response = props.response || undefined;
  }

  request(data: RequestParams) {
    return this._request(data)
      .then(
        (res: any): responseData => {
          if (this.response !== undefined) {
            return this.response({
              ...res,
              url: `${data.url}`,
              requestData: data.data || data.params || "",
            });
          } else {
            return res;
          }
        },
      )
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }
  private _request(data: RequestParams) {
    return new Promise((resolve, reject) => {
      let baseData = {
        url: `${this.baseUrl != undefined ? this.baseUrl : ""}${data.url}`,
        header: data.headers !== undefined ? { ...this.headers, ...data.headers } : this.headers,
        method: data.method || "GET",
        data: data.data || "",
        params: data.params || {}
      };
      axios
        .request({
          ...baseData,
        })
        .then((res: AxiosResponse<responseData>) => {
          // 请求成功
          let header: any = toLowerCase(res.headers);

          // 保存持续化session
          if (header.session) {
            LocalStorage.setLocalStore("session", header.session);
          }
          resolve(res);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default Request;
