/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-28 22:28:09
 * @Editors: lgldlk
 * @LastEditTime: 2021-05-29 14:36:33
 */
import Request from './Request';
import { BaseUrl } from '/@/config/Url';

let request = new Request();
request.init({
  baseUrl: BaseUrl,
  response: (res: response) => {
    // 请求后置拦截器
    if (res.data.code == '200') {
      let data: responseData = res.data;
      return Promise.resolve(data);
    } else if (res.data.code == '400') {
      return Promise.reject(res.data.message);
    } else if (res.data.code == '500') {
      return Promise.reject(res.data.message);
    } else {
      console.log(res);
      return Promise.reject(res.data.message);
    }
  },
});

export default request;
