import { ApiClient, ApiMethod, MethodArgs } from "./"
import { ImportSeedParams, GenericAPIError, Wallet, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function importSeed(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: ImportSeedParams): Promise<JsonRT> {
  return client
    .request("importSeed", params)
    .then(handleImportSeedResponse)
    .catch(handleImportSeedError)
}

function handleImportSeedResponse(response: { wallet: Wallet }): Wallet {
  return asRuntimeType(response, Wallet)
}

function handleImportSeedError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
