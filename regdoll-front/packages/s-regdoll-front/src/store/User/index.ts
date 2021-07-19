/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-19 08:01:56
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-19 08:03:57
 */
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state, { UserState } from './state'
import { Module } from 'vuex'
import { RootState } from '../index'

const app: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default app
