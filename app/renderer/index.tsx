import { asRuntimeType, Contexts } from "app/common/runtimeTypes"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { Client } from "app/renderer/api"
import * as React from "react"
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import Root from "./containers/Root"
import "./ui/app.global.scss"

const client = new Client()

new Promise(async () => {
  // Query and parse wallets from main process
  const _wallets = await client.request("getWallets")
  const wallets = asRuntimeType(_wallets, Wallets, Contexts.IPC)

  // Configure and initialize Redux store
  const { configureStore, history } = require("./store/configureStore")
  const store = configureStore({ wallets })

  // Root component rendering
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById("root")
  )

  // Hot-reload functionality
  if ((module as any).hot) {
    (module as any).hot.accept("./containers/Root", () => {
      const NextRoot = require("./containers/Root").default
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
