import { asRuntimeType, Contexts } from "app/common/runtimeTypes"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { Client } from "app/renderer/api"
import * as React from "react"
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import Root from "./ui/containers/Root"
import "./ui/app.global.scss"

const apiClient = new Client()

new Promise(async () => {
  // Query and parse wallets from main process
  // TODO: replace these two lines with with `const wallets = await api.getWallets(apiClient)`
  const _wallets = await apiClient.request("getWallets")
  const wallets = asRuntimeType(_wallets, Wallets, Contexts.IPC)

  // This object holds resources that are shared among different parts of the app and unifies
  // dependency injection.
  const services = {
    apiClient
  }

  // Configure and initialize Redux store
  const { configureStore, history } = require("./store/configureStore")
  const store = configureStore({ wallets }, services)

  // Root component rendering
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById("root")
  )

  // Hot-reload functionality
  if ((module as any).hot) {
    (module as any).hot.accept("./ui/containers/Root", () => {
      const NextRoot = require("./ui/containers/Root").default
      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>,
        document.getElementById("root")
      )
    })
  }
}).catch((error) => {
  console.error("Unhandled renderer process boot up error", error)
})
