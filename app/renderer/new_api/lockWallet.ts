import { ApiClient, ApiMethod, MethodArgs } from "./"
import { LockWalletParams, GenericAPIError } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function lockWallet(client: ApiClient<ApiMethod, MethodArgs>, params: LockWalletParams): Promise<any> {
  return client.request("lockWallet", params)
    .then(handleLockWalletResponse)
    .catch(handleLockWalletError)
}

function handleLockWalletResponse(params: boolean): false {
  return false
}

function handleLockWalletError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
