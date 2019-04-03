import { ApiClient, ApiMethod, MethodArgs } from "./"
import { LockWalletParams, GenericAPIError, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function lockWallet(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: LockWalletParams): Promise<JsonRT> {
  return client.request("lockWallet", params)
    .then(handleLockWalletResponse)
    .catch(handleLockWalletError)
}

function handleLockWalletResponse(params: boolean): false {
  return false
}

function handleLockWalletError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
