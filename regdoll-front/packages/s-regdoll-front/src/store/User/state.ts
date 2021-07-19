/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 08:01:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 09:04:15
 */
export interface UserState {
  account: string,
  trueName: string
  imgUrl: string,
  signature: string,
  isAdmin: boolean,
  authority: number,
  createdAt: string
}

const userState: UserState = {
  account: "",
  trueName: "",
  imgUrl: "",
  signature: "",
  isAdmin: false,
  authority: 0,
  createdAt: ""
}

export default userState
