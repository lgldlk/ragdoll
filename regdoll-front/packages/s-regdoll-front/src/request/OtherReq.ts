/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 10:37:47
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 10:38:29
 */


import Request from './Request';

const otherReq = new Request();
otherReq.init({
  baseUrl: "",
  response: (res: response): Promise<responseData> => {
    return Promise.resolve(res.data);
  },
});
export default otherReq