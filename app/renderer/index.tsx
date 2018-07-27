import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import * as api from "app/renderer/api"
import * as React from "react"
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import Root from "./ui/containers/Root"
import "./ui/app.global.scss"

const apiClient = new api.Client()

new Promise(async () => {
  // Query and parse wallets from main process
  const wallets: Wallets = await api.getWallets(apiClient)

  // This object holds resources that are shared among different parts of the app and unifies
  // dependency injection.
  const services = {
    apiClient
  }

  // Configure and initialize Redux store
  const { configureStore, history } = require("./store/configureStore")
  const store = configureStore({ wallets, wallet: false, forms: { softLogin: {} } }, services)

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
