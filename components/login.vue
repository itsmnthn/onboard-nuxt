<template>
  <div>
    <button v-if="!loggedIn">
      <a title="Connect to Wallet" @click="onLogin()">
        <span>Connect to wallet</span>
      </a>
    </button>
    <div v-if="loggedIn" :title="address">
      <a @click="showProfile = true">
        <span>{{ address }}</span>
      </a>
    </div>
    <button v-if="loggedIn">
      <a title="Logout" @click="logout()">
        <span>Logout</span>
      </a>
    </button>
    <button v-if="loggedIn" @click="showStatus()">Show Status</button>
    <div v-if="status">
      {{ status }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { mapGetters } from 'vuex'
import Web3 from 'web3'
import OnBoard from 'bnc-onboard'

import app from '~/plugins/app'

export default
@Component({
  props: {},
  components: {},
  computed: {
    ...mapGetters('client', [
      'address',
      'loggedIn',
      'loggedInWith',
      'web3Client',
    ]),
  },
})
class Login extends Vue {
  showLoginWith = false
  onboard = null
  wallet = null
  web3 = null
  status = null

  async mounted() {
    const previouslySelectedWallet = localStorage.getItem('loggedInWith')
    if (previouslySelectedWallet != null) await this.onLogin()
  }

  showStatus() {
    this.status = this.onboard.getState()
    // console.log(this.status)
  }

  async onLogin() {
    try {
      this.onboard = await this.getOnboardjs()
    } catch (error) {
      this.onboard = await this.getOnboardjs()
    }

    const previouslySelectedWallet = localStorage.getItem('loggedInWith')

    // call wallet select with that value if it exists
    if (
      previouslySelectedWallet != null
        ? await this.onboard.walletSelect(previouslySelectedWallet)
        : await this.onboard.walletSelect()
    ) {
      await this.onboard.walletCheck()
    }
  }

  async doLogin() {
    const accounts = await this.web3.eth.getAccounts()
    if (accounts && accounts.length > 0) {
      this.$store.dispatch('client/doLogin', {
        address: accounts[0],
        loggedInWith: this.wallet.name,
        web3: this.web3,
      })
    }
  }

  logout() {
    try {
      localStorage.removeItem('address')
      localStorage.removeItem('loggedInWith')
      this.$store.dispatch('client/logout')
      this.onboard.walletReset()
    } catch (e) {
      // console.log('error', e)
    }
  }

  async getOnboardjs() {
    const onboardConfig = {}
    if (app.uiconfig.onboard_id) onboardConfig.dappId = app.uiconfig.onboard_id

    return await OnBoard({
      networkId: parseInt(app.uiconfig.chainId),
      subscriptions: {
        wallet: async (wallet) => {
          await this.onboard.walletCheck()
          this.web3 = new Web3(wallet.provider)
          this.wallet = wallet
          this.doLogin()
        },
      },
      walletSelect: {
        wallets: [
          { walletName: 'metamask', preferred: true },
          {
            walletName: 'ledger',
            rpcUrl: app.uiconfig.rpc_url,
            preferred: true,
          },
          {
            walletName: 'trezor',
            appUrl: 'https://app.dusd.finance',
            email: app.uiconfig.email,
            rpcUrl: app.uiconfig.rpc_url,
            preferred: true,
          },
          { walletName: 'dapper', preferred: true },
          {
            walletName: 'walletConnect',
            infuraKey: app.uiconfig.infura_id,
          },
          { walletName: 'coinbase' },
          {
            walletName: 'walletLink',
            rpcUrl: app.uiconfig.rpc_url,
            appName: 'DefiDollar',
          },
          {
            walletName: 'fortmatic',
            apiKey: app.uiconfig.fortmatic_id,
          },
          {
            walletName: 'portis',
            apiKey: app.uiconfig.portis_id,
          },
          {
            walletName: 'trust',
            rpcUrl: app.uiconfig.rpc_url,
            preferred: true,
          },
          {
            walletName: 'lattice',
            rpcUrl: app.uiconfig.rpc_url,
            appName: 'DefiDollar',
          },
          {
            walletName: 'torus',
            buildEnv: 'production',
          },
          { walletName: 'squarelink', apiKey: app.uiconfig.squarelink_id },
          { walletName: 'opera' },
          { walletName: 'operaTouch' },
          { walletName: 'status' },
          { walletName: 'imToken', rpcUrl: app.uiconfig.rpc_url },
          { walletName: 'meetone' },
          { walletName: 'mykey', rpcUrl: app.uiconfig.rpc_url },
          { walletName: 'huobiwallet', rpcUrl: app.uiconfig.rpc_url },
          { walletName: 'hyperpay' },
          { walletName: 'wallet.io', rpcUrl: app.uiconfig.rpc_url },
        ],
      },
      walletCheck: [
        { checkName: 'derivationPath' },
        { checkName: 'accounts' },
        { checkName: 'connect' },
        { checkName: 'network' },
      ],
    })
  }
}
</script>

<style lang="scss" scoped></style>
