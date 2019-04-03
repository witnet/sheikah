import { ApiClient, ApiMethod, MethodArgs } from "./"
import { CreateWalletParams, GenericAPIError, Wallet, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function createWallet(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: CreateWalletParams): Promise<JsonRT> {
  return client
    .request("createWallet", params)
    .then(handleCreateWallet)
    .catch(handleCreateWalletError)
}

function handleCreateWallet(response: { wallet: Wallet }): Wallet {
  return asRuntimeType(response.wallet, Wallet)
}

function handleCreateWalletError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
