import { GetterTree } from 'vuex'
import { UserState } from './state'
import { RootState } from '../index'

const getters: GetterTree<UserState, RootState> = {
  user(state) { },
  hasUser(state) {
    return state.account.trim() != ""
  }
}

export default getters
