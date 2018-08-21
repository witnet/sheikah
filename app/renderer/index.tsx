import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import * as api from "app/renderer/api"
import * as React from "react"
import { message } from "antd"
import { render } from "react-dom"
import Root from "app/renderer/ui/containers/Root"
import "./ui/app.global.scss"
import { UnimplementedMessage } from "app/renderer/ui/components/unimplementedMessage"
const apiClient = new api.Client()

/**
 * Call antd message to show Toast component
 *
 * @returns
 */
function showUnimplementedMessage() {
  return message.info(<UnimplementedMessage />)
}

// Related to issue 390
document.location.hash = "#/"

new Promise(async () => {
  // Query and parse wallets from main process
  const wallets: Wallets = await api.getWallets(apiClient)

  // This object holds resources that are shared among different parts of the app and unifies
  // dependency injection.
  const services = {
    apiClient,
    showUnimplementedMessage
  }

  // Configure and initialize Redux store
  const { configureStore, history } = require("./store/configureStore")
  const store = configureStore({ wallets, wallet: false })

  // Root component rendering
  render(
    <Root services={services} store={store} history={history} />,
    document.getElementById("root")
  )

}).catch((error) => {
  console.error("Unhandled renderer process boot up error", error)
})
