import * as React from "react"
import { Store } from "redux"
import { Switch, Route, Redirect } from "react-router"

import * as urls from "app/renderer/constants/urls"
import { StoreState } from "app/renderer/store"
import App from "app/renderer/ui/containers/App"
import FormsContainer from "./ui/containers/Forms"
import MainContainer from "./ui/containers/Main"
import { PropsRoute } from "app/renderer/utils/propsRoute"
import { Services } from "app/renderer/services"

export type RoutesProps = {
  store: Store<StoreState>,
  services: Services
}

export default (props: RoutesProps) => {
  return (
    <App>
      <Switch>
        <PropsRoute
          path={urls.MAIN}
          ownProps={props}
          component={MainContainer}
        />
        <PropsRoute
          path={urls.FORMS}
          ownProps={props}
          component={FormsContainer}
        />
        <Route
          exact={true}
          path="/"
          render={redirectToForms}
        />
      </Switch>
    </App>
  )
}

// Function to redirect to forms container
const redirectToForms = () => <Redirect to={urls.FORMS}/>