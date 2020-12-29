<template>
  <nav>
    <button v-if="!loggedIn">
      <a title="Connect to Wallet" @click="onLogin()">
        <span>Connect to wallet</span>
      </a>
    </button>
    <div v-if="loggedIn" :title="address">
      <a @click="showProfile = true">
        <span>{{ formattedUserAddress }}</span>
      </a>
    </div>
    <button v-if="loggedIn">
      <a title="Logout" @click="logout()">
        <span>Logout</span>
      </a>
    </button>
  </nav>
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
class Navbar extends Vue {
  showLoginWith = false
  onboard = null
  wallet = null
  web3 = null

  async mounted() {
    const previouslySelectedWallet = localStorage.getItem('loggedInWith')
    if (previouslySelectedWallet != null) await this.onLogin()
    // this.logout()
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
      // await this.onboard.walletSelect()
      await this.onboard.walletCheck()
    }
  }

  async doLogin() {
    const accounts = await this.web3.eth.getAccounts()
    if (accounts && accounts.length > 0) {
      this.$store.commit('client/web3Client', { web3Client: this.web3 })
      this.$store.dispatch('client/doLogin', {
        address: accounts[0],
        loggedInWith: this.wallet.name,
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

  get formattedUserAddress() {
    if (this.loggedIn && this.address) {
      const start = this.address.slice(0, 6)
      const length = this.address.length
      const end = this.address.slice(length - 6)
      return start + '...' + end
    }
    return ''
  }

  async getOnboardjs() {
    const onboardConfig = {}
    if (app.uiconfig.onboard_id) onboardConfig.dappId = app.uiconfig.onboard_id

    return await OnBoard({
      // dappId: app.uiconfig.onboard_id,
      networkId: parseInt(app.uiconfig.chainId),

      subscriptions: {
        wallet: async (wallet) => {
          await this.onboard.walletCheck()
          this.web3 = new Web3(wallet.provider)
          this.wallet = wallet
          window.web3Client = this.web3
          this.doLogin()
        },
      },
      walletSelect: {
        wallets: [
          { walletName: 'metamask', preferred: true },
          {
            walletName: 'fortmatic',
            apiKey: app.uiconfig.fortmatic_id,
            preferred: true,
          },
          {
            walletName: 'portis',
            apiKey: app.uiconfig.portis_id,
            preferred: true,
          },
          {
            walletName: 'trust',
            rpcUrl: app.uiconfig.rpc_url,
            preferred: true,
          },
          {
            walletName: 'walletConnect',
            infuraKey: app.uiconfig.infura_id,
            rpcUrl: app.uiconfig.rpc_url,
            preferred: true,
          },
          { walletName: 'coinbase' },
          {
            walletName: 'walletLink',
            rpcUrl: app.uiconfig.rpc_url,
            appName: 'DefiDollar',
          },
          { walletName: 'squarelink', apiKey: app.uiconfig.squarelink_id },
          { walletName: 'opera' },
          { walletName: 'operaTouch' },
        ],
      },
    })
  }
}
</script>

<style lang="scss" scoped></style>
