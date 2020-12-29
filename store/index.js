import Vuex from 'vuex'

import client from './client'

// create store
const createStore = () =>
  new Vuex.Store({
    // modules
    modules: {
      client,
    },
  })

export default createStore
