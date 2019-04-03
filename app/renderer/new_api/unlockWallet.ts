import { ApiClient, ApiMethod, MethodArgs } from "./"
import { UnlockWalletParams, Wallet, GenericAPIError, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function unlockWallet(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: UnlockWalletParams): Promise<JsonRT> {
  return client
    .request("unlockWallet", params)
    .then(handleUnlockWalletResponse)
    .catch(handleUnlockWalletError)
}

function handleUnlockWalletResponse(response: { wallet: Wallet }): Wallet {
  return asRuntimeType(response, Wallet)
}

function handleUnlockWalletError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
