
import * as React from "react"
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import Root from "./ui/containers/Root"
import "./ui/app.global.scss"
import { configureStore, history } from "./store"

const store = configureStore({})

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("root")
)

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