import { ApiClient, ApiMethod, MethodArgs } from "./"
import { RunDataRequestParams, GenericAPIError, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function runDataRequest(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: RunDataRequestParams): Promise<JsonRT> {
  return client
    .request("runDataRequest", params)
    .then(handleRunDataRequestResponse)
    .catch(handleRunDataRequestError)
}
// TODO: Change JsonRT type to RadonValue
function handleRunDataRequestResponse(response: { runDataRequest: JsonRT }): JsonRT {
  return response
}

function handleRunDataRequestError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
