import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { SoftLoginForm, StoreState } from "app/renderer/store"
import { bindActionCreators, Dispatch } from "redux"
import { IAction } from "app/renderer/actions/helpers"
import * as actionCreators from "app/renderer/actions/softLogin"
import { connect } from "react-redux"
import { SoftLogin } from "app/renderer/ui/pages/softLogin"

export interface StateProps {
  wallets: Wallets,
  loginForm: SoftLoginForm
}

export interface DispatchProps {
  actions: any
}

const mapStateToProps = (state: StoreState): StateProps => {
  return ({
    wallets: state.wallets,
    loginForm: state.forms.softLogin
  })
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>): DispatchProps => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect<StateProps, DispatchProps, {}, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(SoftLogin)
