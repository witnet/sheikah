import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Wallet from './components/Wallet.vue'
import DataRequest from './components/DataRequest.vue'
import Community from './components/Community.vue'
import Transaction from './components/Transaction.vue'
import Send from './components/Send.vue'
import Receive from './components/Receive.vue'
import WalletForm from './views/WalletForm.vue'
import Marketplace from './components/Marketplace.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Home,
      redirect: 'wallet',
      children: [
        {
          path: 'wallet',
          component: Wallet,
          children: [
            {
              path: 'transaction',
              component: Transaction,
            },
            {
              path: 'receive',
              component: Receive,
            },
            {
              path: 'send',
              component: Send,
            },
          ],
        },
        {
          path: 'request',
          component: DataRequest,
        },
        {
          path: 'community',
          component: Community,
        },
        {
          path: 'marketplace',
          component: Marketplace,
        },
      ],
    },
    {
      path: '/wallet-form',
      component: WalletForm,
      name: 'wallet-form',
    },
  ],
})
