import { GetterTree } from 'vuex'
import { UserState } from './state'
import { RootState } from '../index'

const getters: GetterTree<UserState, RootState> = {
  user(state) { }
}

export default getters
