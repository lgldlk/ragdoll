/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 07:45:04
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 10:38:42
 */
import { ElMessage } from 'element-plus';
import Request from '/@/request/Request';
import mainAxios from '/@/request/MainAxios';
import otherReq from '/@/request/OtherReq'
export namespace UserRequest {
  const addUserPrefix = (val: string) => {
    return "user/" + val;
  }
  export function login(account: string, password: string) {
    return mainAxios.request({
      url: addUserPrefix("login"),
      params: {
        account,
        password
      },
      method: "POST"
    })
  }

}


export const toRobot = (word: string) =>
  otherReq.request(
    {
      url: 'http://121.36.37.117:3001/aiui',
      params: {
        word
      },
      method: 'POST'
    })