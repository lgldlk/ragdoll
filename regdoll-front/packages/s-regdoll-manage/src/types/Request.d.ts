/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-25 21:49:19
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-20 20:43:21
 */
declare interface RequestParams {
  url: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  data?: any;
  params?: object;
  headers?: object;
}
declare interface Init {
  baseUrl?: string;
  response?: Function | undefined;
}
declare interface response {
  data: responseData;
  headers: object;
  url?: string;
  requestData?: object;
}
declare interface responseData {
  data: any;
  message: string;
  code: string;
  [propName: string]: any;
}
