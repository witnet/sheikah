import { WALLET_EVENTS } from '@/constants'
import i18n from '@/plugins/i18n'

export default class NetworkStatus {
  constructor() {
    this.currentState = null
    this.isNodeSynced = true
    this.isNodeDisconnected = false
    this.isWalletSynced = false
    this.syncError = false
    this.progress = 0
    this.timestamp = 0
    this.event = null
    this.eventType = null
    this.balance = null
  }

  getCurrentStatus() {
    if (this.isNodeDisconnected) {
      return i18n.t('node_disconnected', { locale: i18n.locale })
    } else if (this.syncError) {
      return i18n.t('sync_error', { locale: i18n.locale })
    } else if (this.isWalletSynced && this.isNodeSynced) {
      return i18n.t('synced', { locale: i18n.locale })
    } else if (this.isNodeSynced && !this.isWalletSynced) {
      return i18n.t('syncing', { locale: i18n.locale })
    } else if (!this.isNodeSynced) {
      return i18n.t('waiting_for_node_to_sync', { locale: i18n.locale })
    }
  }

  setStatus(status) {
    this.lastBlock = status
      ? status.node.last_beacon.checkpoint
      : this.lastBlock
    this.lastSync = status ? status.wallet.last_sync.checkpoint : this.lastSync
    this.lastBlockTimestamp = status
      ? status.timestamp
      : this.lastBlockTimestamp
    this.address = status ? status.node.address : this.address
  }

  processNotification(status) {
    this.setStatus(status)

    return {
      currentState: this.currentState,
      progress: this.progress,
      lastBlock: this.lastBlock,
      lastSync: this.lastSync,
      lastBlockTimestamp: this.timestamp,
      address: this.address,
      isNodeSynced: this.isNodeSynced,
      event: this.event,
      eventType: this.eventType,
      balance: status.account.balance,
      network: getNetworkName(status),
    }
  }

  processEvent(rawEvent) {
    const eventType =
      typeof rawEvent.event === 'string'
        ? rawEvent.event
        : Object.keys(rawEvent.event)[0]
    const event = rawEvent.event[eventType]
    const status = rawEvent.status
    this.eventType = eventType
    this.event = event

    if (eventType === WALLET_EVENTS.BLOCK) {
      this.timestamp = Date.now()
    }
    if (eventType === WALLET_EVENTS.SYNC_FINISH) {
      this.syncError = false
      this.isWalletSynced = true
      this.isNodeDisconnected = false
      this.isNodeSynced = true
    } else if (eventType === WALLET_EVENTS.SYNC_PROGRESS) {
      this.syncError = false
      this.isWalletSynced = false
      this.isNodeSynced = true
      this.isNodeDisconnected = false
      // eslint-disable-next-line
      const [_start, current, finish] = event
      this.progress = (current / finish) * 100 || 0
    } else if (eventType === WALLET_EVENTS.SYNC_START) {
      this.syncError = false
      this.isWalletSynced = false
      this.isNodeDisconnected = false
      this.isNodeSynced = true
      this.progress = 0
    }
    if (eventType === WALLET_EVENTS.NODE_STATUS_CHANGED) {
      if (event === 'Synced') {
        this.syncError = false
        this.isNodeDisconnected = false
        this.isNodeSynced = true
        this.isWalletSynced = false
      } else {
        this.syncError = false
        this.isNodeSynced = false
        this.isWalletSynced = false
        this.isNodeDisconnected = false
      }
    } else if (eventType === WALLET_EVENTS.NODE_SYNC_ERROR) {
      this.syncError = true
      this.isWalletSynced = false
    } else if (eventType === WALLET_EVENTS.NODE_DISCONNECTED) {
      this.isNodeDisconnected = true
      this.isNodeSynced = false
      this.isWalletSynced = false
    }

    this.currentState = this.getCurrentStatus()
    this.setStatus(status)

    return {
      currentState: this.currentState,
      progress: this.progress,
      lastBlock: this.lastBlock,
      lastSync: this.lastSync,
      lastBlockTimestamp: this.timestamp,
      address: this.address,
      isNodeSynced: this.isNodeSynced,
      event: this.event,
      eventType: this.eventType,
      balance: status.account.balance,
      network: getNetworkName(status),
    }
  }
}

function getNetworkName(status) {
  return status.node.network.toLowerCase()
}
