const uiconfig = JSON.parse(process.env.uiconfig)
console.log(uiconfig)

const app = {
  vuexStore: null,
  uiconfig,
  async init(store) {
    // store vuex store in this app
    this.vuexStore = store
    // initialize web3 to use in app
    await store.dispatch('client/checkLogin')
  },
}

// Export
export default app
