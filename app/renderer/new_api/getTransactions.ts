import { ApiClient, ApiMethod, MethodArgs } from "./"
import { GetTransactionsParams, GenericAPIError } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes/"

export function getTransactions(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: GetTransactionsParams): Promise<any> {
  return client
    .request("getTransactions", params)
    .then(handleGetTransactionsResponse)
    .catch(handleGetTransactionsError)
}
// TODO: Implement getTransactions method
function handleGetTransactionsResponse(params: GetTransactionsParams): GetTransactionsParams {
  return asRuntimeType(params, GetTransactionsParams)
}

function handleGetTransactionsError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
