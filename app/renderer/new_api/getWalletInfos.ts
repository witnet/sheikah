import { ApiClient, ApiMethod, MethodArgs } from "./"
import { GenericAPIError, WalletInfo, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function getWalletInfos(
  client: ApiClient<ApiMethod, MethodArgs>): Promise<JsonRT> {
  return client
    .request("getWalletInfos")
    .then(handleGetWalletInfosResponse)
    .catch(handleGetWalletInfosError)
}

function handleGetWalletInfosResponse(response: { walletInfos: WalletInfo }): WalletInfo {
  return asRuntimeType(response.walletInfos, WalletInfo)
}

function handleGetWalletInfosError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
