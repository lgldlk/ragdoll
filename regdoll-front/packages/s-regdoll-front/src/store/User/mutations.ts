import { SET_USER } from './mutation-types'
import { UserState } from './state'

import { MutationTree } from 'vuex'

const mutations: MutationTree<UserState> = {
  [SET_USER](state, payload: UserState) {
    if ((payload as any).password) {
      delete (payload as any).password
    }
    state.account = payload.account.toString()
    state.authority = payload.authority
    state.createdAt = payload.createdAt
    state.imgUrl = payload.imgUrl
    state.isAdmin = payload.isAdmin
    state.signature = payload.signature
    state.trueName = payload.trueName

  }
}

export default mutations
