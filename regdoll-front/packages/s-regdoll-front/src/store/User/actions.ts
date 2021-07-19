/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 08:01:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 08:04:44
 */
import { } from './mutation-types'
import { ActionTree } from 'vuex'
import { UserState } from './state'
import { RootState } from '../index'

const actions: ActionTree<UserState, RootState> = {
  async register({ commit }, payload) { },
  async login({ commit }, payload) { }
}

export default actions
