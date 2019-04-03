import { ApiClient, ApiMethod, MethodArgs } from "./"
import { CreateWalletParams, GenericAPIError, Wallet } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function createWallet(client: ApiClient<ApiMethod, MethodArgs>, params: CreateWalletParams): Promise<any> {
  return client
    .request("createWallet", params)
    .then(handleCreateWallet)
    .catch(handleCreateWalletError)
}

function handleCreateWallet(response: { wallet: Wallet }): Wallet {
  return asRuntimeType(response.wallet, Wallet)
}

function handleCreateWalletError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
