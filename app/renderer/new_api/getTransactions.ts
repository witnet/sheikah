import { ApiClient, ApiMethod, MethodArgs } from "./"
import { GetTransactionsParams, JsonRT, GenericAPIError, GetTransactionsResponse } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/asRuntimeType"

export function getTransactions(client: ApiClient<ApiMethod, MethodArgs>, params: GetTransactionsParams): Promise<any> {
  return client
    .request("getTransactions", params)
    .then(handleGetTransactionsResponse)
    .catch(handleGetTransactionsError)
}
// TODO: Implement getTransactions method
function handleGetTransactionsResponse(params: any): GetTransactionsResponse {
  return asRuntimeType(params, GetTransactionsResponse)
}

function handleGetTransactionsError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
