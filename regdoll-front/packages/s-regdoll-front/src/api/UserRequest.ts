/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-19 07:45:04
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 07:59:54
 */
import mainAxios from '/@/request/MainAxios';

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