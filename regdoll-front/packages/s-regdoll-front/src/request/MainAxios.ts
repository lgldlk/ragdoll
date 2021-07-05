/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-05-28 22:28:09
 * @Editors: lgldlk
 * @LastEditTime: 2021-06-02 22:05:45
 */
import Request from "./Request";
import { BaseUrl, reqErrorMsg } from "../config/RequestConfig";
import { ElMessage } from "element-plus";
const request = new Request();
request.init({
  baseUrl: BaseUrl,
  response: (res: response): Promise<responseData> => {
    // 请求后置拦截器
    if (res.data.code == "200") {
      let data: responseData = res.data;
      return Promise.resolve(data);
    } else if (res.data.code == "400") {
      ElMessage.error(res.data.message || reqErrorMsg);
      return Promise.reject(res.data.message);
    } else if (res.data.code == "500") {
      ElMessage.error(res.data.message || reqErrorMsg);
      return Promise.reject(res.data.message);
    } else {
      ElMessage.error(res.data.message || reqErrorMsg);
      console.log(res);
      return Promise.reject(res.data.message);
    }
  },
});

export default request;
