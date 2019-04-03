import { ApiClient, ApiMethod, MethodArgs } from "./"
import { ImportSeedParams, GenericAPIError, Wallet } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function importSeed(client: ApiClient<ApiMethod, MethodArgs>, params: ImportSeedParams): Promise<any> {
  return client
    .request("importSeed", params)
    .then(handleImportSeedResponse)
    .catch(handleImportSeedError)
}

function handleImportSeedResponse(response: { wallet: Wallet }): Wallet {
  return asRuntimeType(response, Wallet)
}

function handleImportSeedError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
