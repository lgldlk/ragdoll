import { SET_USER } from './mutation-types'
import { UserState } from './state'

import { MutationTree } from 'vuex'

const mutations: MutationTree<UserState> = {
  [SET_USER](state, payload: UserState) {
    if ((payload as any).password) {
      delete (payload as any).password
    }
    state = payload
  }
}

export default mutations
