import { WalletInfos } from "app/common/runtimeTypes/storage/wallets"
import * as api from "app/renderer/api"
import * as apiNew from "app/renderer/new_api"
import * as React from "react"
import { message } from "antd"
import { render } from "react-dom"
import Root from "app/renderer/ui/containers/Root"
import "./ui/app.global.scss"
import { Services } from "app/renderer/services"
import { UnimplementedMessage } from "app/renderer/ui/components/unimplementedMessage"
import GenericMessage from "app/renderer/ui/components/genericMessage"
import { CreateWalletParams } from "app/common/runtimeTypes/wallet"

const apiClient = new api.Client()
const newApi = new apiNew.Client()

/**
 * Call antd message to show Toast component
 *
 * @returns
 */
function showUnimplementedMessage() {
  return message.info(<UnimplementedMessage />)
}

/**
 * Call antd success message to show component configurable by text
 *
 * @returns
 */
function showSuccess(msg: string) {
  return message.success(<GenericMessage className="success" msg={msg} />)
}

// Related to issue 390
document.location.hash = "#/"

new Promise(async () => {
  // This object holds resources that are shared among different parts of the app and unifies
  // dependency injection.
  const services: Services = {
    apiClient,
    showUnimplementedMessage,
    showSuccess,
  }

  // Query and parse wallets from main process
  const walletInfos: WalletInfos = await api.getWalletInfos(apiClient)
  // Configure and initialize Redux store
  const { configureStore, history } = require("./store/configureStore")
  // Initial store state
  const persistedStore = {
    walletInfos,
    wallet: false,
    transactions: [],
  }

  const store = configureStore(persistedStore)

  // Root component rendering
  render(
    <Root services={services} store={store} history={history} />,
    document.getElementById("root")
  )
}).catch((error) => {
  console.error("Unhandled renderer process boot up error", error)
})

newApi.open(async () => {
  const args: CreateWalletParams = { name: "Sara", password: "holi" }

  const wallet = await apiNew.createWallet(newApi, args)
  console.log("WIP: ", wallet)
})
