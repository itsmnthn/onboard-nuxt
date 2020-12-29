const uiconfig = JSON.parse(process.env.uiconfig)

const app = {
  vuexStore: null,
  uiconfig,
  async init(store) {
    // store vuex store in this app
    this.vuexStore = store
    // initialize web3 to use in app
    await store.dispatch('client/initweb3')
  },
}

// Export
export default app
